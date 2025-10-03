import * as React from "react";
declare module "@/components/forms/FormRenderer" {
  export type QSchema = any;
  const FormRenderer: React.FC<{
    schema: any;
    questionnaireKey: string;
    visibility: string;
    themeName?: string;
  }>;
  export default FormRenderer;
}
