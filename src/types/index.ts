export interface Activity {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export interface Placement {
  company: string;
  position: string;
  type: "은행" | "증권" | "보험" | "공기업" | "정부";
}

export interface Award {
  title: string;
  result: string;
}

export interface HistoryEntry {
  year: number;
  generation: number;
  president: string;
  milestones: string[];
  isCurrent?: boolean;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Generation {
  gen: number;
  count: number;
  year: string;
  president: string | null;
}

export interface MentoringPartner {
  name: string;
  type: string;
}

export interface RecruitmentSettings {
  is_open: boolean;
  generation: number;
  start_date: string;
  end_date: string;
  end_time: string;
  document_result_date: string;
  interview_date: string;
  final_result_date: string;
}

export interface Applicant {
  id: string;
  name: string;
  student_id: string;
  email: string;
  phone: string;
  file_url: string;
  file_name: string;
  generation: number;
  status: "pending" | "reviewed" | "interview" | "accepted" | "rejected";
  applied_at: string;
  notes?: string;
}

export interface Stat {
  number: string;
  suffix: string;
  label: string;
}
