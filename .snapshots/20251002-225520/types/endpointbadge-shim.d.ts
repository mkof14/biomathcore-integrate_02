// ⚠️ НЕ объявляем "@/components/EndpointBadge", чтобы не конфликтовать с реальным файлом.
// Оставляем только "/ui/EndpointBadge" на случай, если где-то используется альтернативный путь.

import * as React from "react";

declare module "@/components/ui/EndpointBadge" {
  export type Props = { path: string; className?: string; showLabel?: boolean };
  const EndpointBadge: React.FC<Props>;
  export default EndpointBadge;
}
