import { makeBlackboxMemoryRepo } from "./blackboxRepo.memory";

let _mem: ReturnType<typeof makeBlackboxMemoryRepo> | null = null;

export function getBlackboxRepo() {
  // на будущее: переключение на prisma по env
  if (!_mem) _mem = makeBlackboxMemoryRepo();
  return _mem;
}
