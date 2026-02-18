import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { getResendClient, buildAdminEmail } from "@/lib/resend";
import { validationRules, fileRules } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const studentId = formData.get("studentId") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const file = formData.get("file") as File;

    // Server-side validation
    if (!name || !validationRules.name.pattern.test(name)) {
      return NextResponse.json({ error: "올바른 이름을 입력해주세요" }, { status: 400 });
    }
    if (!studentId || !validationRules.studentId.pattern.test(studentId)) {
      return NextResponse.json({ error: "올바른 학번을 입력해주세요" }, { status: 400 });
    }
    if (!email || !validationRules.email.pattern.test(email)) {
      return NextResponse.json({ error: "올바른 이메일을 입력해주세요" }, { status: 400 });
    }
    if (!phone || !validationRules.phone.pattern.test(phone)) {
      return NextResponse.json({ error: "올바른 전화번호를 입력해주세요" }, { status: 400 });
    }
    if (!file) {
      return NextResponse.json({ error: "파일을 첨부해주세요" }, { status: 400 });
    }

    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!fileRules.allowedExtensions.includes(ext)) {
      return NextResponse.json({ error: fileRules.message }, { status: 400 });
    }
    if (file.size > fileRules.maxSize) {
      return NextResponse.json({ error: "파일 크기는 10MB 이하여야 합니다" }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const supabase = createServerClient();
    const generation = 9;
    const timestamp = Date.now();
    const filePath = `${generation}/${studentId}_${name}_${timestamp}${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("applications")
      .upload(filePath, fileBuffer, {
        contentType: file.type || "application/octet-stream",
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json(
        {
          error:
            "파일 업로드에 실패했습니다. Supabase Storage 버킷(applications)과 권한 설정을 확인해주세요.",
        },
        { status: 500 }
      );
    }

    const { data: urlData } = supabase.storage
      .from("applications")
      .getPublicUrl(filePath);
    const fileUrl = urlData.publicUrl;

    const { error: insertError } = await supabase.from("applicants").insert({
      name,
      student_id: studentId,
      email,
      phone,
      file_url: fileUrl,
      file_name: file.name,
      generation,
      status: "pending",
    });

    if (insertError) {
      console.error("DB insert error:", insertError);
      return NextResponse.json(
        { error: "지원자 DB 저장에 실패했습니다. 테이블 및 RLS 정책을 확인해주세요." },
        { status: 500 }
      );
    }

    // Send emails — always attempt; attach file to admin email if not stored in Supabase
    try {
      const resend = getResendClient();
      const adminEmail = buildAdminEmail({ name, studentId, email, phone });

      const adminEmails = process.env.ADMIN_EMAILS?.split(",").map((e) =>
        e.trim()
      ) || ["cni351237@naver.com"];

      await resend.emails.send({
        from: "금은동 시스템 <onboarding@resend.dev>",
        to: adminEmails,
        subject: adminEmail.subject,
        text: adminEmail.text + `\n\n파일: ${fileUrl}`,
      });
    } catch (emailError) {
      console.error("Email send error:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
