"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Check, Image as ImageIcon, Upload, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";
import { adminSavePortfolioFn, adminDeletePortfolioFn, adminUploadMediaFn, adminSavePortfolioSettingsFn } from "@/api/admin";
import { ConfirmModal } from "@/components/admin/ConfirmModal";

interface PortfolioTabProps {
  portfolio: any[];
  setPortfolio: React.Dispatch<React.SetStateAction<any[]>>;
  initialSettings?: { seo: { title: string; description: string; ogImage?: string } };
  onNotice: (text: string, type?: "success" | "error") => void;
}

export function PortfolioTab({ portfolio, setPortfolio, initialSettings, onNotice }: PortfolioTabProps) {
  const [editingPortfolio, setEditingPortfolio] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [seoSettings, setSeoSettings] = useState(
    initialSettings?.seo || {
      title: "Our Work | brandit.",
      description: "Explore brandit. work across industries.",
      ogImage: "",
    },
  );

  const handleSave = async () => {
    if (!editingPortfolio) return;
    if (!editingPortfolio.slug?.trim() || !editingPortfolio.title?.trim() || !editingPortfolio.outcomeLine?.trim()) {
      onNotice("Slug, title, and outcome line are required.", "error");
      return;
    }
    if (editingPortfolio.isPublished && editingPortfolio.mediaUrl && !editingPortfolio.altText?.trim()) {
      onNotice("Alt text is required before publishing an item with media.", "error");
      return;
    }
    setIsSaving(true);
    try {
      const res = await adminSavePortfolioFn({ data: editingPortfolio });
      if (!editingPortfolio._id) {
        setPortfolio((prev) => [...prev, { ...editingPortfolio, _id: res.id }]);
      } else {
        setPortfolio((prev) =>
          prev.map((p) => (p._id === editingPortfolio._id ? editingPortfolio : p)),
        );
      }
      setEditingPortfolio(null);
      onNotice("Portfolio project saved successfully.");
    } catch (err: any) {
      onNotice(err?.message || "Failed to save portfolio project", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpload = async (file: File) => {
    if (!editingPortfolio) return;
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("altText", editingPortfolio.altText || "");
      const res = await adminUploadMediaFn(form);
      if (!res.success) throw new Error(res.error || "Upload failed");
      setEditingPortfolio({
        ...editingPortfolio,
        mediaType: res.mediaType,
        mediaUrl: res.url,
      });
      onNotice("Media uploaded.");
    } catch (err: any) {
      onNotice(err?.message || "Upload failed", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const moveItem = async (item: any, direction: -1 | 1) => {
    const sorted = [...portfolio].sort((a, b) => (a.order || 1) - (b.order || 1));
    const index = sorted.findIndex((row) => (row._id || row.slug) === (item._id || item.slug));
    const swapIndex = index + direction;
    if (index < 0 || swapIndex < 0 || swapIndex >= sorted.length) return;
    const a = sorted[index];
    const b = sorted[swapIndex];
    if (!a || !b) return;
    const nextA = { ...a, order: b.order };
    const nextB = { ...b, order: a.order };
    setPortfolio(sorted.map((row) => {
      if ((row._id || row.slug) === (nextA._id || nextA.slug)) return nextA;
      if ((row._id || row.slug) === (nextB._id || nextB.slug)) return nextB;
      return row;
    }));
    await Promise.all([
      adminSavePortfolioFn({ data: nextA }),
      adminSavePortfolioFn({ data: nextB }),
    ]);
  };

  const togglePublished = async (item: any) => {
    if (!item.isPublished && item.mediaUrl && !item.altText?.trim()) {
      onNotice("Add alt text before publishing this item.", "error");
      return;
    }
    const updated = { ...item, isPublished: !item.isPublished };
    await adminSavePortfolioFn({ data: updated });
    setPortfolio((prev) => prev.map((row) => (row._id === item._id ? updated : row)));
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    const id = deleteTargetId;
    setDeleteTargetId(null);
    try {
      await adminDeletePortfolioFn({ data: { id } });
      setPortfolio((prev) => prev.filter((p) => p._id !== id));
      onNotice("Portfolio project deleted.");
    } catch (err: any) {
      onNotice(err?.message || "Failed to delete project", "error");
    }
  };

  return (
    <div className="space-y-6">
      <ConfirmModal
        open={!!deleteTargetId}
        title="Delete Portfolio Project?"
        description="Are you sure you want to delete this portfolio project? This action cannot be undone."
        confirmLabel="Yes, delete"
        cancelLabel="Cancel"
        danger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white">
            Our Work
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Manage portfolio cards shown on /our-work.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setEditingPortfolio({
              slug: "",
              title: "",
              outcomeLine: "",
              mediaType: "image",
              mediaUrl: "",
              posterUrl: "",
              altText: "",
              detailUrl: "",
              order: portfolio.length + 1,
              isPublished: false,
            })
          }
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-black hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all cursor-pointer"
        >
          <Plus size={15} />
          <span>Add Project</span>
        </button>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-[#0A0B10] p-5">
        <h3 className="text-sm font-bold text-white">SEO settings</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="text-xs text-neutral-300">
            Meta title
            <input
              value={seoSettings.title}
              onChange={(e) => setSeoSettings({ ...seoSettings, title: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-white"
            />
          </label>
          <label className="text-xs text-neutral-300">
            Meta description
            <input
              value={seoSettings.description}
              onChange={(e) => setSeoSettings({ ...seoSettings, description: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-white"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={async () => {
            try {
              await adminSavePortfolioSettingsFn({ data: { seo: seoSettings } });
              onNotice("SEO settings saved.");
            } catch (err: any) {
              onNotice(err?.message || "Could not save SEO settings", "error");
            }
          }}
          className="mt-3 rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-white"
        >
          Save SEO
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((item: any) => (
          <div
            key={item.slug || item._id}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0E0F18]/90 shadow-xl backdrop-blur-xl transition-all hover:border-white/20"
          >
            <div>
              <div className="aspect-[16/9] w-full bg-neutral-900/60 overflow-hidden relative">
                {item.mediaSrc || item.mediaUrl ? (
                  <img
                    src={item.mediaSrc || item.mediaUrl}
                    alt={item.title || "Project preview"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-xs text-neutral-500 gap-1.5">
                    <ImageIcon size={20} className="text-neutral-600" />
                    <span>16:9 Showcase Frame</span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                  {item.title}
                </div>
                <h3 className="mt-1 font-display text-base font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  <span className="font-semibold text-neutral-300">Outcome: </span>
                  {item.outcome || item.outcomeLine}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-white/[0.06] mt-4">
              <span className="font-mono text-[10px] text-neutral-500">Order: {item.order || 1}</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => moveItem(item, -1)} className="rounded-lg border border-white/10 p-2 text-neutral-300" title="Move up"><ArrowUp size={13} /></button>
                <button type="button" onClick={() => moveItem(item, 1)} className="rounded-lg border border-white/10 p-2 text-neutral-300" title="Move down"><ArrowDown size={13} /></button>
                <button type="button" onClick={() => void togglePublished(item)} className="rounded-lg border border-white/10 p-2 text-neutral-300" title={item.isPublished ? "Unpublish" : "Publish"}>
                  {item.isPublished ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingPortfolio(item)}
                  className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                  title="Edit Project"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTargetId(item._id)}
                  className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                  title="Delete Project"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingPortfolio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-white/[0.12] bg-[#0E0F18] p-7 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                  PORTFOLIO CMS
                </span>
                <h3 className="font-display text-xl font-bold text-white mt-0.5">
                  {editingPortfolio._id ? "Edit Portfolio Item" : "New Portfolio Project"}
                </h3>
              </div>
              <button
                onClick={() => setEditingPortfolio(null)}
                className="rounded-full p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-300 mb-1.5">Slug</label>
                  <input
                    type="text"
                    value={editingPortfolio.slug || ""}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, slug: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-300 mb-1.5">Display order</label>
                  <input
                    type="number"
                    min={1}
                    value={editingPortfolio.order || 1}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, order: Number(e.target.value) || 1 })}
                    className="w-full rounded-xl border border-white/10 bg-[#0E0F18] px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-300 mb-1.5">Project Title</label>
                <input
                  type="text"
                  value={editingPortfolio.title || ""}
                  onChange={(e) =>
                    setEditingPortfolio({ ...editingPortfolio, title: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-300 mb-1.5">
                  Outcome Line (Key Commercial Result)
                </label>
                <textarea
                  rows={2}
                  value={editingPortfolio.outcome || editingPortfolio.outcomeLine || ""}
                  onChange={(e) =>
                    setEditingPortfolio({
                      ...editingPortfolio,
                      outcome: e.target.value,
                      outcomeLine: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-300 mb-1.5">Alt text</label>
                <input
                  type="text"
                  value={editingPortfolio.altText || ""}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, altText: e.target.value })}
                  placeholder={`${editingPortfolio.title || "Item"} — ${editingPortfolio.outcomeLine || "Outcome"}`}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-300 mb-1.5">Optional detail link</label>
                <input
                  type="text"
                  value={editingPortfolio.detailUrl || ""}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, detailUrl: e.target.value })}
                  placeholder="/case-studies/example"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-white/[0.08] p-3">
                <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-white">
                  <Upload size={14} />
                  {isUploading ? "Uploading..." : "Upload image or video"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif,video/mp4,video/webm,video/quicktime"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void handleUpload(file);
                    }}
                  />
                </label>
                {editingPortfolio.mediaUrl && (
                  <p className="mt-2 truncate text-[10px] text-neutral-500">{editingPortfolio.mediaUrl}</p>
                )}
              </div>

              {editingPortfolio.mediaType === "video" && (
                <div>
                  <label className="block font-semibold text-neutral-300 mb-1.5">Video poster URL</label>
                  <input
                    type="text"
                    value={editingPortfolio.posterUrl || ""}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, posterUrl: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-none"
                  />
                </div>
              )}

              <label className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                <input
                  type="checkbox"
                  checked={Boolean(editingPortfolio.isPublished)}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, isPublished: e.target.checked })}
                />
                Publish on /our-work
              </label>
            </div>

            <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setEditingPortfolio(null)}
                className="rounded-xl border border-white/10 px-5 py-2 text-xs font-semibold text-neutral-300 hover:bg-white/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2 text-xs font-bold text-black hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-50 cursor-pointer"
              >
                <Check size={14} />
                <span>{isSaving ? "Saving..." : "Save Project"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
