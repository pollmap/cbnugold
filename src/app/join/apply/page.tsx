"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  validateField,
  validateFile,
  formatPhone,
} from "@/lib/validations";
import { Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

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

export default function ApplyPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    studentId: "",
    email: "",
    phone: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(field: keyof FormData, value: string) {
    const newValue = field === "phone" ? formatPhone(value) : value;
    setFormData((prev) => ({ ...prev, [field]: newValue }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) {
      const err = validateFile(selected);
      if (err) {
        setErrors((prev) => ({ ...prev, file: err }));
        setFile(null);
      } else {
        setFile(selected);
        setErrors((prev) => ({ ...prev, file: undefined }));
      }
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

    if (!file) {
      newErrors.file = "지원서 파일을 선택해주세요";
    }

    if (!consent) {
      newErrors.consent = "개인정보 수집 및 이용에 동의해주세요";
    }

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

      const res = await fetch("/api/apply", {
        method: "POST",
        body: formPayload,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "지원서 제출에 실패했습니다");
      }

      setSubmitState("success");
    } catch (err) {
      setSubmitState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitState === "success") {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto px-6 text-center"
        >
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-slate-50 mb-3">
            지원이 완료되었습니다
          </h1>
          <p className="text-slate-400 mb-2">
            {formData.name}님, 금은동 9기에 지원해주셔서 감사합니다.
          </p>
          <p className="text-sm text-slate-500 mb-8">
            입력하신 이메일로 확인 메일이 발송됩니다.
          </p>
          <a href="/" className="text-gold text-sm hover:underline">
            홈으로 돌아가기
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <section className="py-24 md:py-32">
        <div className="max-w-lg mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel label="Apply" className="mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-50 text-center mb-4">
              온라인 지원서 제출
            </h1>
            <p className="text-slate-400 text-center mb-12">
              아래 양식을 작성하고 지원서 파일을 첨부해주세요
            </p>
          </motion.div>

          {submitState === "error" && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="name"
              label="이름"
              placeholder="홍길동"
              required
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={errors.name}
            />

            <Input
              id="studentId"
              label="학번"
              placeholder="20211234"
              required
              value={formData.studentId}
              onChange={(e) => handleChange("studentId", e.target.value)}
              error={errors.studentId}
            />

            <Input
              id="email"
              label="이메일"
              type="email"
              placeholder="example@cbnu.ac.kr"
              required
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
            />

            <Input
              id="phone"
              label="전화번호"
              placeholder="010-1234-5678"
              required
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              error={errors.phone}
            />

            {/* File Upload */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">
                지원서 파일 <span className="text-gold">*</span>
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  errors.file
                    ? "border-red-400/40 bg-red-500/5"
                    : file
                      ? "border-gold/30 bg-gold/5"
                      : "border-gold/10 hover:border-gold/30 bg-navy-600"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".hwp,.docx,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Upload className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                {file ? (
                  <p className="text-sm text-gold">{file.name}</p>
                ) : (
                  <>
                    <p className="text-sm text-slate-400">
                      클릭하여 파일을 선택하세요
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      .hwp, .docx, .pdf (최대 10MB)
                    </p>
                  </>
                )}
              </div>
              {errors.file && (
                <p className="text-red-400 text-xs mt-1">{errors.file}</p>
              )}
            </div>

            {/* Consent */}
            <div className="space-y-1.5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (errors.consent) {
                      setErrors((prev) => ({ ...prev, consent: undefined }));
                    }
                  }}
                  className="mt-1 w-4 h-4 rounded border-gold/30 bg-navy-600 text-gold focus:ring-gold/30 accent-[#C9A84C]"
                />
                <span className="text-sm text-slate-300">
                  개인정보 수집 및 이용에 동의합니다
                </span>
              </label>
              {errors.consent && (
                <p className="text-red-400 text-xs">{errors.consent}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  제출 중...
                </span>
              ) : (
                "제출하기"
              )}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
