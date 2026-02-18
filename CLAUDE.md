# 금은동 웹사이트 프로젝트

## 스택
- Next.js 15+ (App Router, TypeScript)
- Tailwind CSS 4 + Framer Motion
- Supabase (PostgreSQL + Auth + Storage)
- Resend (이메일)
- Vercel 배포

## 코딩 규칙
- 컴포넌트: 함수형 + TypeScript
- 스타일: Tailwind 유틸리티 우선, 인라인 스타일 금지
- 한국어 콘텐츠는 src/data/ 파일로 관리
- API: Route Handlers 사용 (src/app/api/)
- 에러 처리: try-catch + 사용자 친화적 한글 메시지

## 디자인
- 다크 테마 베이스 (navy-900: #0A1628)
- Gold 액센트 (#C9A84C)
- Pretendard 한글, Inter 영문, JetBrains Mono 숫자
- 모바일 퍼스트

## 주의사항
- 개인정보(전화번호) 프론트에 직접 노출 금지
- 파일 업로드 10MB 제한
- 이메일 발송 실패 시에도 DB에는 저장되도록
- Supabase 환경 변수 없이도 프론트 페이지는 정상 렌더링

## 명령어
- `npm run dev` — 개발 서버
- `npm run build` — 빌드
- `npm run lint` — ESLint
