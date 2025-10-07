"use client";
export default function BackClient() {
  return (
    <button
      onClick={() => history.back()}
      className="btn-nasa"
    >
      ← Back
    </button>
  );
}
