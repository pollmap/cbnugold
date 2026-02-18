import { Resend } from "resend";

let resendClient: Resend | null = null;

export function getResendClient() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export function buildAdminEmail(data: {
  name: string;
  studentId: string;
  email: string;
  phone: string;
}) {
  return {
    subject: `[금은동] 새로운 지원서 접수 — ${data.name} (${data.studentId})`,
    text: `새로운 지원서가 접수되었습니다.

이름: ${data.name}
학번: ${data.studentId}
이메일: ${data.email}
전화번호: ${data.phone}
접수 시간: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}

관리자 대시보드에서 확인하세요:
https://cbnugold.com/admin`,
  };
}
