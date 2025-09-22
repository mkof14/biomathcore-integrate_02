"use client";
import { useEffect, useState } from "react";
type Item = { id:string; filename:string; size:number; mime:string; createdAt:string; tags:string[]; };

export default function HealthBlackBoxPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [tags, setTags] = useState<string>("");

  async function reload() {
    const r = await fetch("/api/hbx/files?userId=U1001");
    const j = await r.json();
    setItems(j?.items ?? []);
  }
  useEffect(()=>{ reload(); },[]);

  async function onUpload() {
    if (!files || files.length === 0) return;
    setBusy(true);
    try {
      const fd = new FormData();
      Array.from(files).forEach(f=>fd.append("file", f));
      tags.split(",").map(s=>s.trim()).filter(Boolean).forEach(t=>fd.append("tags", t));
      const r = await fetch("/api/hbx/files?userId=U1001", { method:"POST", body: fd });
      if (!r.ok) {
        const txt = await r.text();
        alert("Upload failed: " + txt);
      } else {
        setFiles(null); setTags(""); await reload();
      }
    } finally { setBusy(false); }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Health Black Box</h1>
      <div className="p-4 rounded-2xl border border-gray-200">
        <div className="flex items-center gap-4">
          <input type="file" multiple onChange={e=>setFiles(e.target.files)} className="block" />
          <input type="text" placeholder="tags (comma separated)" value={tags}
                 onChange={e=>setTags(e.target.value)} className="border rounded px-2 py-1" />
          <button onClick={onUpload} disabled={busy || !files || files.length===0}
                  className="px-3 py-2 rounded-xl bg-black text-white disabled:opacity-50">
            {busy ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      <div className="border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">File</th>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Size</th>
              <th className="text-left p-3">Tags</th>
              <th className="text-left p-3">Created</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(it=>(
              <tr key={it.id} className="border-t">
                <td className="p-3">{it.filename}</td>
                <td className="p-3">{it.mime}</td>
                <td className="p-3">{Intl.NumberFormat().format(it.size)} B</td>
                <td className="p-3">{it.tags?.join(", ")}</td>
                <td className="p-3">{new Date(it.createdAt).toLocaleString()}</td>
                <td className="p-3">
                  <a className="underline" href={`/api/hbx/files/${it.id}/download`}>download</a>
                </td>
              </tr>
            ))}
            {items.length===0 && (
              <tr><td className="p-6 text-gray-500" colSpan={6}>No files yet. Upload above.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
