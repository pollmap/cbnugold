import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { getResendClient, buildApplicantEmail, buildAdminEmail } from "@/lib/resend";
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
    let fileUrl: string | null = null;
    let supabaseOk = false;

    // Try Supabase (optional — skip gracefully if env vars missing or upload fails)
    try {
      const supabase = createServerClient();
      const timestamp = Date.now();
      const filePath = `9/${studentId}_${name}_${timestamp}${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("applications")
        .upload(filePath, fileBuffer, {
          contentType: file.type || "application/octet-stream",
        });

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from("applications")
          .getPublicUrl(filePath);
        fileUrl = urlData.publicUrl;
      } else {
        console.error("Storage upload error:", uploadError);
      }

      // Insert DB record (proceed even if storage failed — file_url may be null)
      const { error: insertError } = await supabase.from("applicants").insert({
        name,
        student_id: studentId,
        email,
        phone,
        file_url: fileUrl,
        file_name: file.name,
        generation: 9,
        status: "pending",
      });

      if (insertError) {
        console.error("DB insert error:", insertError);
      } else {
        supabaseOk = true;
      }
    } catch (supabaseError) {
      console.error("Supabase unavailable:", supabaseError);
    }

    // Send emails — always attempt; attach file to admin email if not stored in Supabase
    try {
      const resend = getResendClient();
      const applicantEmail = buildApplicantEmail(name);
      const adminEmail = buildAdminEmail({ name, studentId, email, phone });

      const adminEmails = process.env.ADMIN_EMAILS?.split(",").map((e) =>
        e.trim()
      ) || ["cni351237@naver.com"];

      // Attach file when not stored in Supabase Storage
      const adminAttachments = !fileUrl
        ? [{ filename: file.name, content: fileBuffer }]
        : [];

      await Promise.allSettled([
        resend.emails.send({
          from: "금은동 <onboarding@resend.dev>",
          to: email,
          subject: applicantEmail.subject,
          text: applicantEmail.text,
        }),
        resend.emails.send({
          from: "금은동 시스템 <onboarding@resend.dev>",
          to: adminEmails,
          subject: adminEmail.subject,
          text: adminEmail.text + (fileUrl ? `\n\n파일: ${fileUrl}` : ""),
          attachments: adminAttachments,
        }),
      ]);
    } catch (emailError) {
      console.error("Email send error:", emailError);
      // If neither Supabase nor email worked, report failure
      if (!supabaseOk) {
        return NextResponse.json(
          { error: "지원서 제출에 실패했습니다. 잠시 후 다시 시도해주세요." },
          { status: 500 }
        );
      }
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
