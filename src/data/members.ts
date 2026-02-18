import type { Generation } from "@/types";

export const generations: Generation[] = [
  { gen: 1, count: 8, year: "2021", president: "김정훈" },
  { gen: 2, count: 3, year: "2022", president: "조아상" },
  { gen: 3, count: 11, year: "2022", president: "김민중" },
  { gen: 4, count: 4, year: "2023", president: null },
  { gen: 5, count: 7, year: "2023", president: null },
  { gen: 6, count: 7, year: "2024", president: "이승현" },
  { gen: 7, count: 8, year: "2024", president: null },
  { gen: 8, count: 8, year: "2025", president: null },
];

export const currentOfficers = [
  { name: "이승현", role: "회장", generation: 6 },
  { name: "전윤철", role: "부회장", generation: 3 },
];

export const totalMembers = generations.reduce((sum, g) => sum + g.count, 0);
