"use client";

import { useRef, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Upload,
  X,
  ExternalLink,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { starterTestimonials } from "@/content/testimonials";

interface Testimonial {
  _id?: string;
  quote: string;
  clientName: string;
  clientTitle: string;
  companyName: string;
  companyCategory?: string;
  companyLogoUrl?: string;
  clientPhotoUrl?: string;
  clientVideoUrl?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  order: number;
  isPublished: boolean;
}

const EMPTY: Testimonial = {
  quote: "",
  clientName: "",
  clientTitle: "",
  companyName: "",
  companyCategory: "",
  companyLogoUrl: "",
  clientPhotoUrl: "",
  clientVideoUrl: "",
  stat1Value: "",
  stat1Label: "",
  stat2Value: "",
  stat2Label: "",
  stat3Value: "",
  stat3Label: "",
  order: 0,
  isPublished: true,
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/25 transition-colors focus:border-white/30 focus:outline-none";

const labelClass = "text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/50";

interface Props {
  initialTestimonials?: Testimonial[];
  onNotice?: (msg: string, type?: "success" | "error") => void;
}

function MediaField({
  label,
  hint,
  value,
  accept,
  uploading,
  onUpload,
  onChange,
  preview,
}: {
  label: string;
  hint: string;
  value: string;
  accept: string;
  uploading: boolean;
  onUpload: (file: File) => void;
  onChange: (value: string) => void;
  preview: "image" | "video" | "none";
}) {
  const fileInput = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-1.5">
      <label className={labelClass}>{label}</label>
      <div className="flex items-center gap-2">
        {value && preview !== "none" && (
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/40">
            {preview === "video" ? (
              <video src={value} muted loop playsInline className="h-full w-full object-cover" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt="" className="h-full w-full object-cover" />
            )}
          </span>
        )}
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={hint}
          className={inputClass}
        />
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
          className="inline-flex h-[42px] shrink-0 items-center gap-1.5 rounded-xl border border-white/12 bg-white/[0.04] px-3 text-xs font-semibold text-white/75 transition-colors hover:border-white/25 hover:text-white disabled:opacity-40"
        >
          <Upload size={13} />
          {uploading ? "…" : "Upload"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label={`Clear ${label}`}
            className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl border border-white/10 text-white/40 transition-colors hover:border-red-400/30 hover:text-red-300"
          >
            <X size={14} />
          </button>
        )}
        <input
          ref={fileInput}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onUpload(file);
            event.currentTarget.value = "";
          }}
        />
      </div>
    </div>
  );
}

export function TestimonialsTab({ initialTestimonials = [], onNotice }: Props) {
  const [items, setItems] = useState<Testimonial[]>(initialTestimonials);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Testimonial | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const notify = (msg: string, type: "success" | "error" = "success") => onNotice?.(msg, type);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials", { cache: "no-store" });
      const json = await res.json();
      if (json.success) setItems(json.testimonials ?? []);
    } catch {
      notify("Failed to reload testimonials", "error");
    } finally {
      setLoading(false);
    }
  };

  const patch = (key: keyof Testimonial, value: string | boolean | number) =>
    setEditing((prev) => (prev ? { ...prev, [key]: value } : prev));

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "saveTestimonial", data: editing }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? "Save failed");
      notify(editing._id ? "Testimonial updated." : "Testimonial created.");
      setEditing(null);
      await refresh();
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete?._id) return;
    const id = confirmDelete._id;
    setDeleting(id);
    try {
      const res = await fetch("/api/admin/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "deleteTestimonial", data: { id } }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? "Delete failed");
      notify("Testimonial deleted.");
      setConfirmDelete(null);
      await refresh();
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeleting(null);
    }
  };

  const togglePublish = async (item: Testimonial) => {
    const updated = { ...item, isPublished: !item.isPublished };
    try {
      const res = await fetch("/api/admin/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "saveTestimonial", data: updated }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setItems((prev) =>
        prev.map((entry) =>
          entry._id === item._id ? { ...entry, isPublished: !entry.isPublished } : entry,
        ),
      );
      notify(updated.isPublished ? "Now live on the homepage." : "Hidden from the homepage.");
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Could not update visibility", "error");
    }
  };

  const uploadMedia = async (
    field: "clientPhotoUrl" | "clientVideoUrl" | "companyLogoUrl",
    file: File,
  ) => {
    setUploadingField(field);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/media/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok || !json.success || !json.url) throw new Error(json.error || "Upload failed");
      setEditing((prev) => (prev ? { ...prev, [field]: json.url } : prev));
      notify("Media uploaded.");
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Upload failed", "error");
    } finally {
      setUploadingField(null);
    }
  };

  const seedStarterSet = async () => {
    setSeeding(true);
    try {
      for (let index = 0; index < starterTestimonials.length; index++) {
        const res = await fetch("/api/admin/action", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "saveTestimonial",
            data: { ...starterTestimonials[index], order: index, isPublished: true },
          }),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.error ?? "Import failed");
      }
      notify("Starter testimonials imported — edit them freely.");
      await refresh();
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Import failed", "error");
    } finally {
      setSeeding(false);
    }
  };

  const canSave =
    Boolean(editing) &&
    Boolean(editing?.quote.trim()) &&
    Boolean(editing?.clientName.trim()) &&
    Boolean(editing?.companyName.trim());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            <h2 className="font-display text-2xl font-bold tracking-tight text-white">
              Testimonials
            </h2>
          </div>
          <p className="mt-1 text-xs text-neutral-400">
            Controls the “Hear from our Clients” section on the homepage — logo rail, media, quote
            and result stats.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/#testimonials"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-white/20"
          >
            View live section
            <ExternalLink size={13} />
          </a>
          <button
            onClick={() => setEditing({ ...EMPTY, order: items.length })}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-white/90"
          >
            <Plus size={15} />
            Add testimonial
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="py-10 text-center text-sm text-white/40">Loading…</div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/12 bg-white/[0.015] px-6 py-14 text-center">
          <Sparkles className="mx-auto text-white/30" size={22} />
          <p className="mt-4 font-display text-lg font-semibold text-white">
            No testimonials stored yet
          </p>
          <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-white/45">
            The homepage is showing brandit’s starter stories. Import them to start editing, or
            create your first testimonial from scratch.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={seedStarterSet}
              disabled={seeding}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/90 disabled:opacity-50"
            >
              <Sparkles size={14} />
              {seeding ? "Importing…" : "Import starter set"}
            </button>
            <button
              onClick={() => setEditing({ ...EMPTY, order: 0 })}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              <Plus size={14} />
              Start blank
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => {
            const id = item._id ?? `${item.companyName}-${index}`;
            const isExpanded = expandedId === id;
            const thumb = item.clientPhotoUrl || item.companyLogoUrl;
            return (
              <div
                key={id}
                className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0f]"
              >
                <div className="flex items-center gap-3 px-4 py-4 sm:px-5">
                  <span className="w-6 shrink-0 text-center font-mono text-[11px] text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/50">
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={thumb} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="grid h-full w-full place-items-center font-instrument text-lg italic text-white/40">
                        {item.companyName.slice(0, 1)}
                      </span>
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-white">{item.companyName}</span>
                      {item.companyCategory && (
                        <span className="text-xs text-white/35">{item.companyCategory}</span>
                      )}
                      {!item.isPublished && (
                        <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-amber-400">
                          HIDDEN
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-white/40">
                      {item.clientName} · {item.clientTitle}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      title={isExpanded ? "Collapse" : "Preview"}
                      onClick={() => setExpandedId(isExpanded ? null : id)}
                      className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </button>
                    <button
                      title={item.isPublished ? "Hide from homepage" : "Show on homepage"}
                      onClick={() => togglePublish(item)}
                      className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {item.isPublished ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                    <button
                      title="Edit"
                      onClick={() => setEditing({ ...item })}
                      className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => setConfirmDelete(item)}
                      className="rounded-lg p-2 text-red-400/60 transition-colors hover:bg-red-400/5 hover:text-red-400"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="space-y-4 border-t border-white/[0.05] px-5 py-4">
                    <p className="text-sm italic leading-relaxed text-white/70">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    {(item.stat1Value || item.stat2Value || item.stat3Value) && (
                      <div className="flex flex-wrap gap-5">
                        {[
                          { v: item.stat1Value, l: item.stat1Label },
                          { v: item.stat2Value, l: item.stat2Label },
                          { v: item.stat3Value, l: item.stat3Label },
                        ]
                          .filter((stat) => stat.v)
                          .map((stat, i) => (
                            <div key={i}>
                              <span className="text-lg font-bold text-emerald-400">{stat.v}</span>
                              {stat.l && (
                                <span className="block text-xs text-white/40">{stat.l}</span>
                              )}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl space-y-6 overflow-y-auto rounded-2xl border border-white/10 bg-[#0d0d12] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  {editing._id ? "Edit testimonial" : "New testimonial"}
                </h3>
                <p className="mt-1 text-xs text-white/40">
                  Everything here appears in the homepage “Hear from our Clients” card.
                </p>
              </div>
              <button
                onClick={() => setEditing(null)}
                className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quote */}
            <div className="space-y-1.5">
              <label className={labelClass}>Quote *</label>
              <textarea
                rows={3}
                value={editing.quote}
                onChange={(event) => patch("quote", event.target.value)}
                placeholder="They rebuilt how we're positioned, and the right clients started finding us."
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Person */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className={labelClass}>Client name *</label>
                <input
                  value={editing.clientName}
                  onChange={(event) => patch("clientName", event.target.value)}
                  placeholder="Daniel Reeve"
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>Title / role</label>
                <input
                  value={editing.clientTitle}
                  onChange={(event) => patch("clientTitle", event.target.value)}
                  placeholder="Managing Partner"
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>Company name *</label>
                <input
                  value={editing.companyName}
                  onChange={(event) => patch("companyName", event.target.value)}
                  placeholder="Apex Strategic Advisory"
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>Industry / category</label>
                <input
                  value={editing.companyCategory ?? ""}
                  onChange={(event) => patch("companyCategory", event.target.value)}
                  placeholder="Management consultancy"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Media */}
            <div className="space-y-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <p className={labelClass}>Media</p>
              <MediaField
                label="Client photo"
                hint="https://…/portrait.jpg"
                value={editing.clientPhotoUrl ?? ""}
                accept="image/*"
                uploading={uploadingField === "clientPhotoUrl"}
                onUpload={(file) => uploadMedia("clientPhotoUrl", file)}
                onChange={(value) => patch("clientPhotoUrl", value)}
                preview="image"
              />
              <MediaField
                label="Client video (optional — plays muted in the card)"
                hint="https://…/story.mp4"
                value={editing.clientVideoUrl ?? ""}
                accept="video/*"
                uploading={uploadingField === "clientVideoUrl"}
                onUpload={(file) => uploadMedia("clientVideoUrl", file)}
                onChange={(value) => patch("clientVideoUrl", value)}
                preview="video"
              />
              <MediaField
                label="Company logo (used in the rail and byline)"
                hint="https://…/logo.png"
                value={editing.companyLogoUrl ?? ""}
                accept="image/*"
                uploading={uploadingField === "companyLogoUrl"}
                onUpload={(file) => uploadMedia("companyLogoUrl", file)}
                onChange={(value) => patch("companyLogoUrl", value)}
                preview="image"
              />
              <p className="text-[11px] text-white/35">
                Logo appears white in the dark rail. A transparent PNG or SVG works best.
              </p>
            </div>

            {/* Stats */}
            <div className="space-y-2">
              <label className={labelClass}>Result stats (green numbers under the quote)</label>
              {([1, 2, 3] as const).map((n) => (
                <div key={n} className="grid gap-3 sm:grid-cols-2">
                  <input
                    value={(editing[`stat${n}Value` as keyof Testimonial] as string) ?? ""}
                    onChange={(event) => patch(`stat${n}Value`, event.target.value)}
                    placeholder={`Stat ${n} value — e.g. +184%`}
                    className={inputClass}
                  />
                  <input
                    value={(editing[`stat${n}Label` as keyof Testimonial] as string) ?? ""}
                    onChange={(event) => patch(`stat${n}Label`, event.target.value)}
                    placeholder={`Stat ${n} label — e.g. Qualified pipeline`}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>

            {/* Display */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className={labelClass}>Display order</label>
                <input
                  type="number"
                  value={editing.order}
                  onChange={(event) => patch("order", parseInt(event.target.value, 10) || 0)}
                  className={inputClass}
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex cursor-pointer items-center gap-3">
                  <div
                    onClick={() => patch("isPublished", !editing.isPublished)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      editing.isPublished ? "bg-emerald-500" : "bg-white/15"
                    }`}
                  >
                    <span
                      className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        editing.isPublished ? "translate-x-5" : ""
                      }`}
                    />
                  </div>
                  <span className="text-sm text-white/70">
                    {editing.isPublished ? "Live on homepage" : "Hidden"}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-white/[0.07] pt-4">
              <button
                onClick={() => setEditing(null)}
                className="rounded-xl border border-white/10 px-5 py-2 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !canSave}
                className="rounded-xl bg-white px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90 disabled:opacity-40"
              >
                {saving ? "Saving…" : "Save testimonial"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#0d0d12] p-6 shadow-2xl">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-red-500/25 bg-red-500/10 text-red-400">
                <AlertTriangle size={18} />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Delete this testimonial?
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-white/50">
                  {confirmDelete.clientName} · {confirmDelete.companyName} will be removed from the
                  homepage. This can’t be undone.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="rounded-xl border border-white/10 px-5 py-2 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
              >
                Keep it
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting !== null}
                className="rounded-xl bg-red-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-400 disabled:opacity-40"
              >
                {deleting ? "Deleting…" : "Delete permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
