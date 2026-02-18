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

export function buildApplicantEmail(name: string) {
  return {
    subject: "[금은동] 9기 지원서가 접수되었습니다",
    text: `안녕하세요, ${name}님.

금은동 9기에 지원해주셔서 감사합니다.
지원서가 정상적으로 접수되었습니다.

■ 서류 결과 발표: 3월 3일(화) 17:00~20:00 (문자 발송)
■ 면접 일정: 3월 6일(금) (합격자 개별 안내)

문의사항은 cbnu.gold@gmail.com으로 연락주세요.

감사합니다.
금은동 드림`,
  };
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
