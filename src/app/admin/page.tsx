"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import type { Applicant } from "@/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  LogOut,
  Download,
  Loader2,
  Users,
  Filter,
} from "lucide-react";

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "대기", color: "bg-yellow-500/10 text-yellow-400" },
  reviewed: { label: "검토완료", color: "bg-blue-500/10 text-blue-400" },
  interview: { label: "면접", color: "bg-purple-500/10 text-purple-400" },
  accepted: { label: "합격", color: "bg-emerald-500/10 text-emerald-400" },
  rejected: { label: "불합격", color: "bg-red-500/10 text-red-400" },
};

export default function AdminPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const supabaseRef = useRef<SupabaseClient | null>(null);

  function getSupabase() {
    if (!supabaseRef.current) {
      supabaseRef.current = createClient();
    }
    return supabaseRef.current;
  }

  useEffect(() => {
    const supabase = getSupabase();

    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
        return;
      }
      setAuthenticated(true);

      const { data, error } = await supabase
        .from("applicants")
        .select("*")
        .order("applied_at", { ascending: false });

      if (error) {
        console.error("Fetch error:", error);
      } else {
        setApplicants((data as Applicant[]) || []);
      }
      setLoading(false);
    }

    init();
  }, [router]);

  async function handleLogout() {
    await getSupabase().auth.signOut();
    router.push("/admin/login");
  }

  async function updateStatus(id: string, newStatus: string) {
    const { error } = await getSupabase()
      .from("applicants")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setApplicants((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: newStatus as Applicant["status"] } : a
        )
      );
    }
  }

  function downloadCSV() {
    const headers = ["이름", "학번", "이메일", "전화번호", "상태", "접수일"];
    const rows = filteredApplicants.map((a) => [
      a.name,
      a.student_id,
      a.email,
      a.phone,
      statusLabels[a.status]?.label || a.status,
      new Date(a.applied_at).toLocaleDateString("ko-KR"),
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const bom = "\uFEFF";
    const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `금은동_지원자_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const filteredApplicants =
    filter === "all"
      ? applicants
      : applicants.filter((a) => a.status === filter);

  if (!authenticated) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-50">
              관리자 대시보드
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              지원자 {applicants.length}명
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={downloadCSV}>
              <Download className="w-4 h-4 mr-2" />
              CSV
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              로그아웃
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { key: "all", label: "전체", count: applicants.length },
            ...Object.entries(statusLabels).map(([key, val]) => ({
              key,
              label: val.label,
              count: applicants.filter((a) => a.status === key).length,
            })),
          ].map((stat) => (
            <button
              key={stat.key}
              onClick={() => setFilter(stat.key)}
              className={`p-4 rounded-xl border text-left transition-colors ${
                filter === stat.key
                  ? "bg-gold/5 border-gold/30"
                  : "bg-navy-800 border-gold/10 hover:border-gold/20"
              }`}
            >
              <p className="text-2xl font-bold font-mono text-slate-100">
                {stat.count}
              </p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </button>
          ))}
        </div>

        {/* Filter label */}
        {filter !== "all" && (
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-gold" />
            <span className="text-sm text-slate-300">
              {statusLabels[filter]?.label} 필터 적용됨
            </span>
            <button
              onClick={() => setFilter("all")}
              className="text-xs text-gold hover:underline ml-2"
            >
              초기화
            </button>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-gold animate-spin" />
          </div>
        ) : filteredApplicants.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">지원자가 없습니다</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/10">
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">
                    이름
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">
                    학번
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase hidden md:table-cell">
                    이메일
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase hidden md:table-cell">
                    전화번호
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">
                    상태
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase hidden sm:table-cell">
                    접수일
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">
                    파일
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.map((applicant) => (
                  <tr
                    key={applicant.id}
                    className="border-b border-gold/5 hover:bg-navy-800/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-slate-200">
                      {applicant.name}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono">
                      {applicant.student_id}
                    </td>
                    <td className="py-3 px-4 text-slate-400 hidden md:table-cell">
                      {applicant.email}
                    </td>
                    <td className="py-3 px-4 text-slate-400 hidden md:table-cell">
                      {applicant.phone}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={applicant.status}
                        onChange={(e) =>
                          updateStatus(applicant.id, e.target.value)
                        }
                        className={`text-xs px-2 py-1 rounded-full border-0 cursor-pointer ${
                          statusLabels[applicant.status]?.color ||
                          "bg-navy-700 text-slate-300"
                        }`}
                      >
                        {Object.entries(statusLabels).map(([key, val]) => (
                          <option key={key} value={key}>
                            {val.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-xs hidden sm:table-cell">
                      {new Date(applicant.applied_at).toLocaleDateString(
                        "ko-KR"
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={applicant.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold text-xs hover:underline"
                      >
                        다운로드
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
