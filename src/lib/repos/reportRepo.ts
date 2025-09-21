import { makeMemoryReportRepo } from "./reportRepo.memory";
const g = globalThis as any;
export function getReportRepo() {
  g.__report_repo_singleton ??= makeMemoryReportRepo();
  return g.__report_repo_singleton;
}
