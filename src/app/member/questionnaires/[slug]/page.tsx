import { getSchema } from "../engine";
import RenderForm from "../RenderForm";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const schema = getSchema(slug);
  if (!schema) return <div className="p-6">Not found</div>;
  const title = slug === "patient" ? "Patient Questionnaire"
              : slug === "lifestyle" ? "Lifestyle Questionnaire"
              : slug === "medical-history" ? "Medical History Questionnaire"
              : slug === "sexual-health-general" ? "Sexual Health (General)"
              : slug === "sexual-health-male" ? "Sexual Health (Male)"
              : slug === "sexual-health-female" ? "Sexual Health (Female)"
              : "Questionnaire";
  return <RenderForm title={title} slug={slug} questions={schema} />;
}
