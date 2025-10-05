import React from "react";

type Category = {
  id?: string;
  title?: string;
  description?: string;
};

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="border rounded p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{category.title ?? "Untitled"}</h3>
      <p className="text-sm text-gray-600">{category.description ?? "—"}</p>
    </div>
  );
}
