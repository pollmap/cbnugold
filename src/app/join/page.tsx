"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AccordionItem } from "@/components/ui/Accordion";
import { Input } from "@/components/ui/Input";
import { faqs } from "@/data/faqs";
import {
  validateField,
  validateFile,
  formatPhone,
} from "@/lib/validations";
import {
  Download,
  FileText,
  CheckCircle,
  Upload,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const processSteps = [
  { step: "01", title: "서류 접수", date: "2.19(목) ~ 3.1(일)", status: "active" as const },
  { step: "02", title: "서류 심사", date: "3.3(화) 결과 발표", status: "upcoming" as const },
  { step: "03", title: "면접", date: "3.6(금)", status: "upcoming" as const },
  { step: "04", title: "최종 합격", date: "3.7(토)", status: "upcoming" as const },
];

const requirements = [
  "충북대학교 재학생",
  "매주 화요일 19:00 정기모임 참석 가능",
  "연속 2학기(1년) 이상 활동 가능",
  "3월 10일(화) 19:00 OT 참석 가능",
];

interface FormData {
  name: string;
  studentId: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  studentId?: string;
  email?: string;
  phone?: string;
  file?: string;
  consent?: string;
}

export default function JoinPage() {
  // Form state
  const [formData, setFormData] = useState<FormData>({ name: "", studentId: "", email: "", phone: "" });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [consent, setConsent] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  function handleChange(field: keyof FormData, value: string) {
    const newValue = field === "phone" ? formatPhone(value) : value;
    setFormData((prev) => ({ ...prev, [field]: newValue }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    const err = validateFile(selected);
    if (err) {
      setErrors((prev) => ({ ...prev, file: err }));
      setFile(null);
    } else {
      setFile(selected);
      setErrors((prev) => ({ ...prev, file: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    const nameErr = validateField("name", formData.name);
    if (nameErr) newErrors.name = nameErr;
    const studentIdErr = validateField("studentId", formData.studentId);
    if (studentIdErr) newErrors.studentId = studentIdErr;
    const emailErr = validateField("email", formData.email);
    if (emailErr) newErrors.email = emailErr;
    const phoneErr = validateField("phone", formData.phone.replace(/-/g, ""));
    if (phoneErr) newErrors.phone = phoneErr;
    if (!file) newErrors.file = "지원서 파일을 선택해주세요";
    if (!consent) newErrors.consent = "개인정보 수집·이용에 동의해주세요";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("studentId", formData.studentId);
      formPayload.append("email", formData.email);
      formPayload.append("phone", formData.phone.replace(/-/g, ""));
      if (file) formPayload.append("file", file);
      const res = await fetch("/api/apply", { method: "POST", body: formPayload });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "지원서 제출에 실패했습니다");
      }
      setSubmitState("success");
    } catch (err) {
      setSubmitState("error");
      setErrorMessage(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="pt-24">
      {/* ── 헤더 ── */}
      <section className="py-24 md:py-32 bg-white marble-texture">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="open" className="mb-6 text-sm px-4 py-1.5">모집중</Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">금은동 9기 신입부원 모집</h1>
            <p className="text-lg text-gray-500">서류 접수: 2.19(목) ~ 3.1(일) 18:00</p>
          </motion.div>
        </div>
      </section>

      {/* ── 채용 프로세스 ── */}
      <section className="py-16 bg-marble-light">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-lg font-semibold text-gray-700 mb-8">채용 프로세스</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {processSteps.map((step, i) => (
                <div
                  key={step.step}
                  className={`relative rounded-xl p-5 border transition-colors ${
                    step.status === "active" ? "bg-gold/5 border-gold/30" : "bg-white border-gray-200"
                  }`}
                >
                  <span className={`text-xs font-mono font-bold ${step.status === "active" ? "text-gold" : "text-gray-400"}`}>
                    {step.step}
                  </span>
                  <h3 className="font-semibold text-gray-800 mt-2 mb-1">{step.title}</h3>
                  <p className="text-xs text-gray-500">{step.date}</p>
                  {i < processSteps.length - 1 && (
                    <span className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-gold/30 text-lg">→</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 지원 자격 ── */}
      <section className="py-16 bg-white marble-texture">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-lg font-semibold text-gray-700 mb-6">지원 자격</h2>
            <div className="space-y-3">
              {requirements.map((req) => (
                <div key={req} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-gray-600">{req}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-marble-light rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="text-gold font-medium">회비:</span> 학기 10,000원 (조건 충족 시 환급)
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 지원서 다운로드 ── */}
      <section className="py-16 bg-marble-light">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-lg font-semibold text-gray-700 mb-6">지원서 다운로드</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-3">
              <a
                href="/files/9기_금은동지원서_워드파일.docx"
                download
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:border-gold/30 transition-colors group shadow-sm"
              >
                <FileText className="w-10 h-10 text-gold/60 group-hover:text-gold transition-colors" />
                <div className="flex-1">
                  <p className="font-medium text-gray-700">워드 파일</p>
                  <p className="text-xs text-gray-400">.docx</p>
                </div>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-gold transition-colors" />
              </a>
              <a
                href="/files/9기_금은동지원서_한글파일.hwp"
                download
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:border-gold/30 transition-colors group shadow-sm"
              >
                <FileText className="w-10 h-10 text-gold/60 group-hover:text-gold transition-colors" />
                <div className="flex-1">
                  <p className="font-medium text-gray-700">한글 파일</p>
                  <p className="text-xs text-gray-400">.hwp</p>
                </div>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-gold transition-colors" />
              </a>
            </div>
            <p className="text-xs text-gray-400">파일명 양식: 이름_전화번호뒷4자리_[9기_금은동_지원서]</p>
          </motion.div>
        </div>
      </section>

      {/* ── 지원서 제출 폼 ── */}
      <section id="apply" className="py-20 md:py-28 bg-white marble-texture">
        <div className="max-w-lg mx-auto px-6" ref={formRef}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionLabel label="Apply" className="mb-6" />
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-3">온라인 지원서 제출</h2>
            <p className="text-gray-500 text-center mb-10">지원서를 다운로드 후 작성하여 아래 폼으로 제출해주세요</p>
          </motion.div>

          {submitState === "success" ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">지원이 완료되었습니다</h3>
              <p className="text-gray-500 mb-2">{formData.name}님, 금은동 9기에 지원해주셔서 감사합니다.</p>
              <p className="text-sm text-gray-400">입력하신 이메일로 확인 메일이 발송됩니다.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {submitState === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{errorMessage}</p>
                </div>
              )}

              <Input id="name" label="이름" placeholder="홍길동" required value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)} error={errors.name} />
              <Input id="studentId" label="학번" placeholder="20211234" required value={formData.studentId}
                onChange={(e) => handleChange("studentId", e.target.value)} error={errors.studentId} />
              <Input id="email" label="이메일" type="email" placeholder="example@cbnu.ac.kr" required value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)} error={errors.email} />
              <Input id="phone" label="전화번호" placeholder="010-1234-5678" required value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)} error={errors.phone} />

              {/* 파일 업로드 */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  지원서 파일 <span className="text-gold">*</span>
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    errors.file ? "border-red-400/40 bg-red-500/5" : file ? "border-gold/30 bg-gold/5" : "border-gray-300 hover:border-gold/30 bg-marble-light"
                  }`}
                >
                  <input ref={fileInputRef} type="file" accept=".hwp,.docx,.pdf" onChange={handleFileChange} className="hidden" />
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  {file ? (
                    <p className="text-sm text-gold font-medium">{file.name}</p>
                  ) : (
                    <>
                      <p className="text-sm text-gray-500">클릭하여 파일을 선택하세요</p>
                      <p className="text-xs text-gray-400 mt-1">.hwp, .docx, .pdf (최대 10MB)</p>
                    </>
                  )}
                </div>
                {errors.file && <p className="text-red-500 text-xs">{errors.file}</p>}
              </div>

              {/* 개인정보 동의 */}
              <div className="space-y-2">
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* 상단 헤더 */}
                  <button
                    type="button"
                    onClick={() => setPrivacyOpen((o) => !o)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-marble-light hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      개인정보 수집·이용 동의 <span className="text-gold text-xs">(필수)</span>
                    </span>
                    {privacyOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </button>

                  {/* 상세 내용 */}
                  <div className={`overflow-hidden transition-all duration-300 ${privacyOpen ? "max-h-96" : "max-h-0"}`}>
                    <div className="px-4 py-4 text-xs text-gray-600 space-y-2 border-t border-gray-100">
                      <div className="grid grid-cols-[6rem_1fr] gap-x-2 gap-y-1.5">
                        <span className="font-semibold text-gray-700">수집 항목</span>
                        <span>성명, 학번, 이메일, 전화번호, 지원서 파일</span>
                        <span className="font-semibold text-gray-700">수집 목적</span>
                        <span>금은동 입부 지원서 검토 및 합격 여부 안내</span>
                        <span className="font-semibold text-gray-700">보유 기간</span>
                        <span>지원 결과 발표일로부터 6개월 후 파기</span>
                        <span className="font-semibold text-gray-700">거부 권리</span>
                        <span>동의를 거부할 권리가 있으며, 거부 시 지원이 제한될 수 있습니다.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 체크박스 동의 */}
                <label className="flex items-start gap-3 cursor-pointer px-1 pt-1">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 bg-white accent-[#C9A84C]"
                  />
                  <span className="text-sm text-gray-600">
                    개인정보 수집·이용 목적, 항목, 보유 기간을 확인하였으며 이에 동의합니다.
                  </span>
                </label>
                {errors.consent && <p className="text-red-500 text-xs px-1">{errors.consent}</p>}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    제출 중...
                  </span>
                ) : (
                  "지원서 제출하기"
                )}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28 bg-marble-light">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <SectionLabel label="FAQ" className="mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-12">자주 묻는 질문</h2>
            <div className="max-w-2xl mx-auto">
              {faqs.map((faq) => (
                <AccordionItem key={faq.q} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
