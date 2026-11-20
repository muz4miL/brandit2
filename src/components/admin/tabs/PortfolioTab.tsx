"use client";

import { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Upload,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Sliders,
  Layers,
  Save,
  ExternalLink,
} from "lucide-react";
import {
  adminSavePortfolioFn,
  adminDeletePortfolioFn,
  adminUploadMediaFn,
  adminSavePortfolioSettingsFn,
} from "@/api/admin";
import type { PortfolioDoc, PortfolioPageSettingsDoc } from "@/server/types";

const CATEGORIES = ["Branding", "Video & Media", "Paid Ads", "Web & Stores"];

interface PortfolioTabProps {
  portfolio: PortfolioDoc[];
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioDoc[]>>;
  initialSettings?: PortfolioPageSettingsDoc;
  onNotice: (text: string, type?: "success" | "error") => void;
}

export function PortfolioTab({
  portfolio,
  setPortfolio,
  initialSettings,
  onNotice,
}: PortfolioTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<"projects" | "settings">("projects");
  const [editingItem, setEditingItem] = useState<Partial<PortfolioDoc> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const [settings, setSettings] = useState<PortfolioPageSettingsDoc>(
    initialSettings || {
      heroBadgeText: "brandit.® Work",
      heroHeadingLine1: "Where top brands",
      heroHeadingLine2: "come to create",
      heroSupportingCopy:
        "Performance marketing, cinematic production, and conversion systems built for high-growth brands.",
      heroCtaText: "Discovery Call",
      heroCtaUrl: "/contact",
      heroVideoUrl: "",
      quoteText:
        "Their superpower is combining scale and performance execution, unmatched by any agency I've worked with.",
      quoteAuthor: "Marcus Sterling",
      quoteRole: "Senior Managing Partner",
      quoteCompany: "Apex Strategic Advisory",
      capabilitiesHeading: "A standard built to inspire.",
      capabilitiesSubheading:
        "From high-impact performance ads to full-scale enterprise digital experiences, we engineer every layer in-house.",
      closingCtaHeadingLine1: "Ready to",
      closingCtaHeadingLine2: "Scale?",
      closingCtaCopy:
        "Partner with a performance creative agency that builds high-converting systems engineered for serious growth.",
      closingCtaButtonText: "Book a Strategy Call",
      closingCtaDestination: "/contact",
      seo: {
        title: "Our Work | brandit.",
        description:
          "Where top brands come to create. Explore selected brand identities, campaigns, video systems, and digital platforms built by brandit.",
        ogImage: "/images/work/work-identity-halo.jpg",
      },
      updatedAt: new Date("2026-01-01"),
    },
  );

  const handleSaveItem = async () => {
    if (!editingItem) return;
    if (!editingItem.slug?.trim() || !editingItem.title?.trim() || !editingItem.outcomeLine?.trim()) {
      onNotice("Slug, title, and outcome line are required.", "error");
      return;
    }

    setIsSaving(true);
    try {
      const res = await adminSavePortfolioFn({ data: editingItem });
      if (!editingItem._id) {
        setPortfolio((prev) => [
          ...prev,
          { ...(editingItem as PortfolioDoc), _id: res.id, order: prev.length + 1 },
        ]);
      } else {
        setPortfolio((prev) =>
          prev.map((p) => (p._id === editingItem._id ? (editingItem as PortfolioDoc) : p)),
        );
      }
      setEditingItem(null);
      onNotice("Our Work project saved successfully.");
    } catch (err: any) {
      onNotice(err?.message || "Failed to save project", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await adminDeletePortfolioFn({ data: { id } });
      setPortfolio((prev) => prev.filter((p) => String(p._id) !== id));
      onNotice("Project deleted.");
    } catch (err: any) {
      onNotice(err?.message || "Failed to delete project", "error");
    }
  };

  const handleUploadMedia = async (file: File) => {
    if (!editingItem) return;
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("altText", editingItem.altText || editingItem.title || "");
      const res = await adminUploadMediaFn(form);
      if (!res.success) throw new Error(res.error || "Upload failed");
      setEditingItem({
        ...editingItem,
        mediaType: res.mediaType,
        mediaUrl: res.url,
      });
      onNotice("Media uploaded successfully.");
    } catch (err: any) {
      onNotice(err?.message || "Upload failed", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      await adminSavePortfolioSettingsFn({ data: settings });
      onNotice("Our Work page settings saved successfully.");
    } catch (err: any) {
      onNotice(err?.message || "Failed to save page settings", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const moveItem = async (item: PortfolioDoc, direction: -1 | 1) => {
    const sorted = [...portfolio].sort((a, b) => (a.order || 1) - (b.order || 1));
    const index = sorted.findIndex((row) => (row._id || row.slug) === (item._id || item.slug));
    const swapIndex = index + direction;
    if (index < 0 || swapIndex < 0 || swapIndex >= sorted.length) return;
    const a = sorted[index];
    const b = sorted[swapIndex];
    if (!a || !b) return;
    const nextA = { ...a, order: b.order };
    const nextB = { ...b, order: a.order };
    setPortfolio(
      sorted.map((row) => {
        if ((row._id || row.slug) === (nextA._id || nextA.slug)) return nextA;
        if ((row._id || row.slug) === (nextB._id || nextB.slug)) return nextB;
        return row;
      }),
    );
    await Promise.all([
      adminSavePortfolioFn({ data: nextA }),
      adminSavePortfolioFn({ data: nextB }),
    ]);
  };

  const togglePublished = async (item: PortfolioDoc) => {
    const updated = { ...item, isPublished: !item.isPublished };
    setPortfolio((prev) =>
      prev.map((p) => ((p._id || p.slug) === (item._id || item.slug) ? updated : p)),
    );
    try {
      await adminSavePortfolioFn({ data: updated });
      onNotice(updated.isPublished ? "Project published on /our-work." : "Project set to draft.");
    } catch (err: any) {
      onNotice(err?.message || "Failed to update status", "error");
    }
  };

  const filteredItems = portfolio.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.client && item.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (selectedCategory !== "All" && item.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
            CREATIVE PORTFOLIO ENGINE
          </span>
          <h2 className="font-display font-extrabold text-2xl text-white">Our Work CMS</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Manage visual creative projects, showreels, and categories displayed on the /our-work page.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSubTab("projects")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === "projects"
                ? "bg-white text-black shadow-lg"
                : "border border-white/10 bg-white/[0.04] text-neutral-300 hover:text-white"
            }`}
          >
            <Layers size={13} className="inline mr-1.5" />
            <span>Projects ({portfolio.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("settings")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === "settings"
                ? "bg-white text-black shadow-lg"
                : "border border-white/10 bg-white/[0.04] text-neutral-300 hover:text-white"
            }`}
          >
            <Sliders size={13} className="inline mr-1.5" />
            <span>Page Settings</span>
          </button>

          {activeSubTab === "projects" && (
            <button
              type="button"
              onClick={() =>
                setEditingItem({
                  slug: `project-${Date.now().toString().slice(-4)}`,
                  title: "",
                  client: "",
                  category: "Branding",
                  outcomeLine: "",
                  mediaType: "image",
                  mediaUrl: "/images/work/work-identity-halo.jpg",
                  altText: "",
                  detailUrl: "",
                  order: portfolio.length + 1,
                  isPublished: true,
                })
              }
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-bold text-black hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <Plus size={14} />
              <span>Add Project</span>
            </button>
          )}
        </div>
      </div>

      {/* ─── SUBTAB 1: PROJECTS LIST ───────────────────────────── */}
      {activeSubTab === "projects" && (
        <div className="space-y-4">
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search projects by client, title, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white placeholder-neutral-500 focus:border-white focus:outline-hidden"
            />

            <div className="flex flex-wrap gap-1.5">
              {["All", ...CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-white text-black font-semibold"
                      : "border border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {filteredItems.map((item, index) => (
              <div
                key={String(item._id || item.slug)}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#0A0B12]/90 p-4 transition-all hover:border-white/[0.18] shadow-md group"
              >
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                  {/* Thumbnail */}
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#08080C]">
                    <img
                      src={item.mediaUrl || "/images/work/work-identity-halo.jpg"}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
                          item.isPublished
                            ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                            : "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.isPublished ? "bg-emerald-400" : "bg-amber-400"
                          }`}
                        />
                        {item.isPublished ? "Live on /our-work" : "Draft"}
                      </span>

                      {item.category && (
                        <span className="rounded-full bg-white/[0.06] border border-white/10 px-2.5 py-0.5 text-[10px] font-mono text-white/70">
                          {item.category}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-white text-sm sm:text-base truncate mt-1">
                      {item.client ? `${item.client} — ` : ""}
                      {item.title}
                    </h3>

                    <p className="font-sans text-xs text-neutral-400 truncate mt-0.5">
                      {item.outcomeLine}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => moveItem(item, -1)}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Move up"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(item, 1)}
                    disabled={index === filteredItems.length - 1}
                    className="p-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Move down"
                  >
                    <ArrowDown size={13} />
                  </button>

                  <button
                    type="button"
                    onClick={() => togglePublished(item)}
                    className="p-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-white cursor-pointer"
                    title={item.isPublished ? "Unpublish" : "Publish"}
                  >
                    {item.isPublished ? <Eye size={13} /> : <EyeOff size={13} />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingItem({ ...item })}
                    className="inline-flex items-center gap-1 rounded-xl bg-white/[0.08] border border-white/10 hover:bg-white hover:text-black px-3 py-1.5 text-xs font-bold text-white transition-all cursor-pointer"
                  >
                    <Edit2 size={12} />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => item._id && handleDeleteItem(String(item._id))}
                    className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── SUBTAB 2: PAGE SETTINGS ───────────────────────────── */}
      {activeSubTab === "settings" && (
        <div className="rounded-2xl border border-white/[0.08] bg-[#0A0B12]/90 p-6 sm:p-8 space-y-6 max-w-4xl shadow-xl">
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              Our Work Page Hero &amp; Content
            </h3>
            <p className="text-xs text-neutral-400">
              Configure typography, Defiant showreel, capabilities, and SEO for /our-work
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                  Hero Badge Text
                </label>
                <input
                  type="text"
                  value={settings.heroBadgeText || ""}
                  onChange={(e) => setSettings({ ...settings, heroBadgeText: e.target.value })}
                  placeholder="brandit.® Work"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:border-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                  Hero Video URL (Optional showreel mp4)
                </label>
                <input
                  type="text"
                  value={settings.heroVideoUrl || ""}
                  onChange={(e) => setSettings({ ...settings, heroVideoUrl: e.target.value })}
                  placeholder="https://.../showreel.mp4"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:border-white focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                  Headline Line 1 (Grotesk Sans)
                </label>
                <input
                  type="text"
                  value={settings.heroHeadingLine1 || ""}
                  onChange={(e) => setSettings({ ...settings, heroHeadingLine1: e.target.value })}
                  placeholder="Where top brands"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:border-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                  Headline Line 2 (Italic Serif)
                </label>
                <input
                  type="text"
                  value={settings.heroHeadingLine2 || ""}
                  onChange={(e) => setSettings({ ...settings, heroHeadingLine2: e.target.value })}
                  placeholder="come to create"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:border-white focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                Supporting Subcopy
              </label>
              <textarea
                rows={2}
                value={settings.heroSupportingCopy || ""}
                onChange={(e) => setSettings({ ...settings, heroSupportingCopy: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:border-white focus:outline-hidden"
              />
            </div>

            {/* Editorial Quote */}
            <div className="pt-4 border-t border-white/[0.06] space-y-3">
              <label className="font-mono text-[11px] font-bold uppercase text-amber-300 block">
                Editorial Quote
              </label>
              <textarea
                rows={2}
                value={settings.quoteText || ""}
                onChange={(e) => setSettings({ ...settings, quoteText: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:border-white focus:outline-hidden"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Author"
                  value={settings.quoteAuthor || ""}
                  onChange={(e) => setSettings({ ...settings, quoteAuthor: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:border-white focus:outline-hidden"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={settings.quoteRole || ""}
                  onChange={(e) => setSettings({ ...settings, quoteRole: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:border-white focus:outline-hidden"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={settings.quoteCompany || ""}
                  onChange={(e) => setSettings({ ...settings, quoteCompany: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:border-white focus:outline-hidden"
                />
              </div>
            </div>

            {/* SEO */}
            <div className="pt-4 border-t border-white/[0.06] space-y-3">
              <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block">
                SEO Parameters
              </label>
              <input
                type="text"
                placeholder="Meta Title"
                value={settings.seo?.title || ""}
                onChange={(e) =>
                  setSettings({ ...settings, seo: { ...settings.seo, title: e.target.value } })
                }
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:border-white focus:outline-hidden"
              />
              <textarea
                rows={2}
                placeholder="Meta Description"
                value={settings.seo?.description || ""}
                onChange={(e) =>
                  setSettings({ ...settings, seo: { ...settings.seo, description: e.target.value } })
                }
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:border-white focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex justify-end">
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSaveSettings}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-xs font-bold text-black hover:bg-neutral-200 transition-all disabled:opacity-50 cursor-pointer shadow-lg"
            >
              <Save size={14} />
              <span>{isSaving ? "Saving..." : "Save Page Settings"}</span>
            </button>
          </div>
        </div>
      )}

      {/* ─── MODAL: EDIT OR CREATE PROJECT ───────────────────────── */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#0A0B12] p-6 shadow-2xl border border-white/10 my-4 flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <h3 className="font-display font-bold text-lg text-white">
                {editingItem._id ? "Edit Portfolio Project" : "Create New Project"}
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[10.5px] uppercase text-neutral-400 block mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={editingItem.client || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, client: e.target.value })}
                    placeholder="fäm Properties"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-white focus:border-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10.5px] uppercase text-neutral-400 block mb-1">
                    Category
                  </label>
                  <select
                    value={editingItem.category || "Branding"}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#0E0F18] px-3 py-2 text-white focus:border-white focus:outline-hidden"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono text-[10.5px] uppercase text-neutral-400 block mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={editingItem.title || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="Enterprise Brokerage Content System"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-white focus:border-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-mono text-[10.5px] uppercase text-neutral-400 block mb-1">
                  Outcome Line *
                </label>
                <input
                  type="text"
                  value={editingItem.outcomeLine || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, outcomeLine: e.target.value })}
                  placeholder="One content system across an entire enterprise brokerage."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-white focus:border-white focus:outline-hidden"
                />
              </div>

              {/* Media URL + Upload */}
              <div>
                <label className="font-mono text-[10.5px] uppercase text-neutral-400 block mb-1">
                  Media Image or Video URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingItem.mediaUrl || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, mediaUrl: e.target.value })}
                    placeholder="/images/work/work-identity-halo.jpg"
                    className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-white focus:border-white focus:outline-hidden"
                  />
                  <label className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3 py-2 font-bold text-white hover:bg-white/20 transition-colors cursor-pointer shrink-0">
                    <Upload size={12} />
                    <span>{isUploading ? "Uploading..." : "Upload"}</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => e.target.files?.[0] && handleUploadMedia(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[10.5px] uppercase text-neutral-400 block mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={editingItem.slug || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-white focus:border-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10.5px] uppercase text-neutral-400 block mb-1">
                    Live Project / Detail URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingItem.detailUrl || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, detailUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-white focus:border-white focus:outline-hidden"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={Boolean(editingItem.isPublished)}
                  onChange={(e) => setEditingItem({ ...editingItem, isPublished: e.target.checked })}
                  className="rounded border-white/20 bg-white/5 text-white accent-white"
                />
                <span className="font-bold text-white">Publish on /our-work</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSaving || isUploading}
                onClick={handleSaveItem}
                className="rounded-xl bg-white px-5 py-2 text-xs font-bold text-black hover:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
