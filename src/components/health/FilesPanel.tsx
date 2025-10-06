"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type FileRow = { id: string; name: string; sizeBytes: number; url?: string };

export default function FilesPanel({ userId = "U1001" }: { userId?: string }) {
  const [rows, setRows] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOver, setIsOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `/api/hbx/files?userId=${encodeURIComponent(userId)}`,
          { cache: "no-store" },
        );
        const data = await res.json();
        setRows(Array.isArray(data?.files) ? data.files : []);
      } catch (e: any) {
        setError(e?.message || "Failed to load files");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  const formatSize = (b: number) => {
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
    if (b < 1024 * 1024 * 1024) return `${(b / 1024 / 1024).toFixed(2)} MB`;
    return `${(b / 1024 / 1024 / 1024).toFixed(2)} GB`;
  };

  const handleShare = async (row: FileRow) => {
    const link = row.url || `${location.origin}/api/hbx/file/${row.id}`;
    try {
      await navigator.clipboard.writeText(link);
      alert("Share link copied to clipboard");
    } catch {
      alert(link);
    }
  };

  const handlePrint = (row: FileRow) => {
    const link = row.url || `${location.origin}/api/hbx/file/${row.id}`;
    const w = window.open(link, "_blank");
    if (w) w.addEventListener("load", () => w.print());
  };

  const handleDownload = (row: FileRow) => {
    const a = document.createElement("a");
    a.href = row.url || `${location.origin}/api/hbx/file/${row.id}`;
    a.download = row.name;
    a.rel = "noopener";
    a.click();
  };

  const uploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const next: FileRow[] = [];

    for (const file of Array.from(files)) {
      const previewUrl = URL.createObjectURL(file);
      next.push({
        id: `temp-${Date.now()}-${file.name}`,
        name: file.name,
        sizeBytes: file.size,
        url: previewUrl,
      });

      const form = new FormData();
      form.append("file", file);
      try {
        const res = await fetch("/api/hbx/upload", {
          method: "POST",
          body: form,
        });
        await res.json();
      } catch {}
    }

    setRows((r) => [...next, ...r]);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadFiles(e.target.files);
    e.currentTarget.value = "";
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(false);
    uploadFiles(e.dataTransfer.files);
  }, []);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
  };
  const onDragLeave = () => setIsOver(false);

  return (
    <section id="files" className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">Files</h3>
          <p className="text-xs text-slate-400">
            Preview • Send/Share • Print • Download
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            multiple
            onChange={onInputChange}
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-sm font-medium text-slate-100"
          >
            Upload
          </button>
        </div>
      </div>

      {/* Drag & Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`rounded-xl border p-4 text-center text-sm transition-colors ${
          isOver
            ? "border-cyan-500/60 bg-cyan-500/10 text-cyan-200"
            : "border-slate-700 bg-slate-900/60 text-slate-200"
        }`}
      >
        Drag & drop files here, or use the Upload button.
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">
        {loading && <div className="text-sm text-slate-300">Loading…</div>}
        {error && <div className="text-sm text-amber-300">{error}</div>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-300 border-b border-slate-700">
                  <th className="py-2 pr-3">Name</th>
                  <th className="py-2 pr-3">Size</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-slate-400">
                      No files yet
                    </td>
                  </tr>
                )}
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-slate-800 hover:bg-slate-800/40"
                  >
                    <td className="py-2 pr-3 text-slate-100">
                      {row.url ? (
                        <a
                          href={row.url}
                          target="_blank"
                          className="underline underline-offset-2"
                        >
                          {row.name}
                        </a>
                      ) : (
                        row.name
                      )}
                    </td>
                    <td className="py-2 pr-3 text-slate-200">
                      {formatSize(row.sizeBytes)}
                    </td>
                    <td className="py-2">
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={row.url || "#"}
                          target={row.url ? "_blank" : "_self"}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs text-slate-100"
                        >
                          Preview
                        </a>
                        <button
                          onClick={() => handleShare(row)}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs text-slate-100"
                        >
                          Send link
                        </button>
                        <button
                          onClick={() => handleShare(row)}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs text-slate-100"
                        >
                          Share
                        </button>
                        <button
                          onClick={() => handlePrint(row)}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs text-slate-100"
                        >
                          Print
                        </button>
                        <button
                          onClick={() => handleDownload(row)}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs text-slate-100"
                        >
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
