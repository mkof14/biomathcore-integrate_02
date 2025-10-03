import * as React from "react";
declare module "@/components/ActionBar" {
  const ActionBar: React.FC<{
    title?: string;
    className?: string;
    right?: React.ReactNode;   // как в одних местах
    extra?: React.ReactNode;   // как в других местах
    children?: React.ReactNode;
  }>;
  export default ActionBar;
}
