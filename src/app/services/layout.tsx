import CategoriesNav from "./CategoriesNav";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-6 py-8 max-w-7xl mx-auto flex gap-6">
      <CategoriesNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}
