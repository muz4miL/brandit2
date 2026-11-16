"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Edit2,
  Trash2,
  Copy,
  Eye,
  ArrowUp,
  ArrowDown,
  Upload,
  Save,
  X,
  Sliders,
  Layers,
  Star,
  GripVertical,
  Tag,
  Quote,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type {
  WorkProjectDoc,
  WorkPageSettingsDoc,
  CaseStudyBlock,
  CaseStudyBlockType,
} from "@/server/types";
import {
  adminSaveWorkProjectFn,
  adminDeleteWorkProjectFn,
  adminDuplicateWorkProjectFn,
  adminSaveWorkPageSettingsFn,
  adminUploadMediaFn,
} from "@/api/admin";

interface OurWorkManagerProps {
  initialProjects: WorkProjectDoc[];
  initialSettings: WorkPageSettingsDoc;
  onNotice: (text: string, type?: "success" | "error") => void;
}

const DEFAULT_CATEGORIES = [
  { id: "Ecom", label: "Ecom" },
  { id: "Services", label: "Services" },
  { id: "SaaS", label: "SaaS" },
];

// Sortable Row for Case Studies List
function SortableProjectRow({
  project,
  onEdit,
  onDuplicate,
  onToggleFeatured,
  onDeleteRequest,
}: {
  project: WorkProjectDoc;
  onEdit: (p: WorkProjectDoc) => void;
  onDuplicate: (slug: string) => void;
  onToggleFeatured: (p: WorkProjectDoc) => void;
  onDeleteRequest: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: String(project._id || project.slug),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#0A0B12]/90 p-4 transition-all hover:border-white/[0.18] hover:bg-[#0E0F18] shadow-md group"
    >
      <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
        <button
          {...attributes}
          {...listeners}
          type="button"
          className="cursor-grab text-neutral-600 hover:text-neutral-300 p-1 shrink-0 self-center"
          title="Drag to reorder"
        >
          <GripVertical size={16} />
        </button>

        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#08080C]">
          <img
            src={project.thumbnailUrl || project.heroMediaUrl}
            alt={project.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
                project.isPublished
                  ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                  : "bg-amber-400/10 text-amber-400 border border-amber-400/20"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${project.isPublished ? "bg-emerald-400" : "bg-amber-400"}`} />
              {project.isPublished ? "Published" : "Draft"}
            </span>

            {project.isFeatured && (
              <span className="rounded-full bg-white/10 border border-white/20 px-2 py-0.5 text-[10px] font-mono font-bold text-white uppercase">
                Featured
              </span>
            )}

            {project.categories?.map((cat) => (
              <span key={cat} className="rounded-full bg-white/[0.04] border border-white/10 px-2 py-0.5 text-[10px] font-mono text-neutral-400">
                {cat}
              </span>
            ))}
          </div>

          <h3 className="font-display font-bold text-white text-sm sm:text-base truncate mt-1">
            {project.clientName} — {project.title}
          </h3>

          <span className="font-mono text-[10.5px] text-neutral-400 block truncate mt-0.5">
            /case-studies/{project.slug} • {project.year} • {project.results?.length || 0} KPIs • {project.gallery?.length || 0} gallery images
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center pt-2 sm:pt-0 border-t border-white/[0.04] sm:border-0 w-full sm:w-auto justify-end">
        <button
          type="button"
          onClick={() => onToggleFeatured(project)}
          className={`rounded-xl p-2 text-xs transition-colors cursor-pointer border ${
            project.isFeatured
              ? "bg-amber-400/10 text-amber-400 border-amber-400/30"
              : "text-neutral-400 hover:text-white border-white/[0.08] hover:bg-white/[0.05]"
          }`}
          title={project.isFeatured ? "Unfeature" : "Feature on Signature Stage"}
        >
          <Star size={14} className={project.isFeatured ? "fill-current" : ""} />
        </button>

        <Link
          href={`/case-studies/${project.slug}?preview=true`}
          target="_blank"
          className="rounded-xl border border-white/[0.08] p-2 text-neutral-300 hover:text-white hover:bg-white/[0.05] transition-colors"
          title="Preview Case Study"
        >
          <Eye size={14} />
        </Link>

        <button
          type="button"
          onClick={() => onDuplicate(project.slug)}
          className="rounded-xl border border-white/[0.08] p-2 text-neutral-300 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
          title="Duplicate as Draft"
        >
          <Copy size={14} />
        </button>

        <button
          type="button"
          onClick={() => onEdit(project)}
          className="inline-flex items-center gap-1 rounded-xl bg-white/[0.08] border border-white/10 hover:bg-white hover:text-black px-3 py-1.5 text-xs font-bold text-white transition-all cursor-pointer"
        >
          <Edit2 size={12} />
          <span>Edit</span>
        </button>

        <button
          type="button"
          onClick={() => onDeleteRequest(String(project._id || project.slug))}
          className="rounded-xl border border-red-500/20 p-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
          title="Delete Project"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

export function OurWorkManager({
  initialProjects,
  initialSettings,
  onNotice,
}: OurWorkManagerProps) {
  const [subTab, setSubTab] = useState<"projects" | "categories" | "settings">("projects");
  const [projects, setProjects] = useState<WorkProjectDoc[]>(initialProjects || []);
  const [settings, setSettings] = useState<WorkPageSettingsDoc>(initialSettings);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "featured">("all");

  // Category Manager State
  const [categories, setCategories] = useState<{ id: string; label: string }[]>(
    initialSettings.managedCategories && initialSettings.managedCategories.length > 0
      ? initialSettings.managedCategories
      : DEFAULT_CATEGORIES,
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryLabel, setEditingCategoryLabel] = useState("");

  // Editing Project Modal State
  const [editingProject, setEditingProject] = useState<Partial<WorkProjectDoc> | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // 1. FILTERING & SEARCH
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.industry.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === "published") return p.isPublished === true;
    if (statusFilter === "draft") return p.isPublished !== true;
    if (statusFilter === "featured") return p.isFeatured === true;
    return true;
  });

  // 2. DRAG AND DROP REORDERING
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex((p) => String(p._id || p.slug) === active.id);
    const newIndex = projects.findIndex((p) => String(p._id || p.slug) === over.id);

    if (oldIndex < 0 || newIndex < 0) return;

    const reordered = arrayMove(projects, oldIndex, newIndex).map((p, i) => ({
      ...p,
      order: i + 1,
    }));
    setProjects(reordered);

    try {
      await Promise.all(
        reordered.map((p) => adminSaveWorkProjectFn({ data: { _id: p._id, order: p.order } })),
      );
      onNotice("Case studies order reordered and saved successfully");
    } catch {
      onNotice("Failed to save reordered list", "error");
    }
  };

  // 3. DUPLICATE AS DRAFT
  const handleDuplicate = async (slug: string) => {
    try {
      const res = await adminDuplicateWorkProjectFn({ data: { slug } });
      if (res.success) {
        onNotice("Project duplicated as draft!");
        const orig = projects.find((p) => p.slug === slug);
        if (orig) {
          const duplicateItem: WorkProjectDoc = {
            ...orig,
            _id: res.id,
            slug: res.slug,
            title: `${orig.title} (Draft Copy)`,
            isPublished: false,
            isDraft: true,
            isFeatured: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          setProjects((prev) => [duplicateItem, ...prev]);
        }
      }
    } catch (err: any) {
      onNotice(err?.message || "Failed to duplicate project", "error");
    }
  };

  // 4. DELETE PROJECT
  const handleDelete = async (id: string) => {
    try {
      await adminDeleteWorkProjectFn({ data: { id } });
      setProjects((prev) => prev.filter((p) => (p._id ? p._id !== id : p.slug !== id)));
      setDeleteConfirmId(null);
      onNotice("Case study removed successfully");
    } catch (err: any) {
      onNotice(err?.message || "Failed to delete project", "error");
    }
  };

  // 5. TOGGLE FEATURED
  const handleToggleFeatured = async (project: WorkProjectDoc) => {
    const newFeatured = !project.isFeatured;
    try {
      await adminSaveWorkProjectFn({
        data: { _id: project._id, slug: project.slug, isFeatured: newFeatured },
      });
      setProjects((prev) =>
        prev.map((p) => (p.slug === project.slug ? { ...p, isFeatured: newFeatured } : p)),
      );
      onNotice(newFeatured ? "Marked as featured on showcase" : "Removed from featured");
    } catch {
      onNotice("Failed to update featured status", "error");
    }
  };

  // 6. SAVE CASE STUDY PROJECT
  const handleSaveProject = async () => {
    if (!editingProject) return;

    if (!editingProject.title?.trim()) {
      onNotice("Project title is required", "error");
      return;
    }
    if (!editingProject.clientName?.trim()) {
      onNotice("Client name is required", "error");
      return;
    }
    if (!editingProject.slug?.trim()) {
      onNotice("Slug is required", "error");
      return;
    }

    if (editingProject.isPublished) {
      if (!editingProject.summary?.trim()) {
        onNotice("Published projects require a summary positioning statement", "error");
        return;
      }
      if (!editingProject.thumbnailUrl) {
        onNotice("Published projects require at least a thumbnail image", "error");
        return;
      }
    }

    setIsSaving(true);
    try {
      const payload = {
        ...editingProject,
        categories: editingProject.categories || [],
        services: editingProject.services || [],
        results: editingProject.results || [],
        gallery: editingProject.gallery || [],
        blocks: editingProject.blocks || [],
        isPublished: Boolean(editingProject.isPublished),
        isFeatured: Boolean(editingProject.isFeatured),
        order: editingProject.order ?? projects.length + 1,
      };

      const res = await adminSaveWorkProjectFn({ data: payload });
      if (res.success) {
        onNotice(editingProject._id ? "Case study updated successfully" : "New case study saved!");
        setProjects((prev) => {
          const index = prev.findIndex((p) => p.slug === editingProject.slug || (p._id && p._id === editingProject._id));
          const fullDoc = { ...payload, _id: res.id } as WorkProjectDoc;
          if (index >= 0) {
            const next = [...prev];
            next[index] = fullDoc;
            return next;
          }
          return [fullDoc, ...prev];
        });
        setEditingProject(null);
      }
    } catch (err: any) {
      onNotice(err?.message || "Failed to save project", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // 7. CATEGORIES MANAGER: ADD, RENAME, DELETE
  const handleAddCategory = async () => {
    const label = newCategoryName.trim();
    if (!label) return;
    const id = label;
    if (categories.some((c) => c.id.toLowerCase() === id.toLowerCase())) {
      onNotice("Category already exists", "error");
      return;
    }
    const updated = [...categories, { id, label }];
    setCategories(updated);
    setNewCategoryName("");
    await saveCategoriesToSettings(updated);
    onNotice(`Category "${label}" added.`);
  };

  const handleRenameCategory = async (id: string, newLabel: string) => {
    const trimmed = newLabel.trim();
    if (!trimmed) return;
    const updated = categories.map((c) => (c.id === id ? { ...c, label: trimmed } : c));
    setCategories(updated);
    setEditingCategoryId(null);
    await saveCategoriesToSettings(updated);
    onNotice(`Category renamed to "${trimmed}".`);
  };

  const handleDeleteCategory = async (id: string) => {
    const updatedCats = categories.filter((c) => c.id !== id);
    setCategories(updatedCats);

    // Reassign cases that had this category: if empty, assign 'Uncategorized'
    const updatedProjects = projects.map((p) => {
      if (p.categories?.includes(id)) {
        const remaining = p.categories.filter((c) => c !== id);
        return {
          ...p,
          categories: remaining.length > 0 ? remaining : ["Uncategorized"],
        };
      }
      return p;
    });

    setProjects(updatedProjects);
    await saveCategoriesToSettings(updatedCats);

    // Persist affected projects
    try {
      const affected = updatedProjects.filter((p) => p.categories?.includes("Uncategorized"));
      await Promise.all(
        affected.map((p) => adminSaveWorkProjectFn({ data: { _id: p._id, categories: p.categories } })),
      );
      onNotice(`Category deleted. Associated cases reassigned to Uncategorized.`);
    } catch {
      onNotice("Category removed, but error updating some projects", "error");
    }
  };

  const saveCategoriesToSettings = async (cats: { id: string; label: string }[]) => {
    const updatedSettings = {
      ...settings,
      managedCategories: cats,
      categoryOrder: ["all", ...cats.map((c) => c.id)],
    };
    setSettings(updatedSettings);
    await adminSaveWorkPageSettingsFn({ data: updatedSettings });
  };

  // 8. SAVE PAGE SETTINGS
  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      await adminSaveWorkPageSettingsFn({ data: settings });
      onNotice("Case studies page settings saved successfully!");
    } catch (err: any) {
      onNotice(err?.message || "Failed to save settings", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // 9. MEDIA UPLOADER
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (url: string, mediaType: "image" | "video") => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await adminUploadMediaFn(formData);
      if (res.success && res.url) {
        onComplete(res.url, res.mediaType);
        onNotice("Media uploaded successfully");
      }
    } catch (err: any) {
      onNotice(err?.message || "Media upload failed", "error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-neutral-400">
            CASE STUDIES &amp; PORTFOLIO ENGINE
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
            Case Studies CMS
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Manage client case studies, KPI metrics, rich narrative sections, galleries, and categories.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSubTab("projects")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              subTab === "projects"
                ? "bg-white text-black font-semibold shadow-[0_0_16px_rgba(255,255,255,0.15)]"
                : "bg-white/[0.04] text-neutral-300 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            <span>Case Studies ({projects.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab("categories")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              subTab === "categories"
                ? "bg-white text-black font-semibold shadow-[0_0_16px_rgba(255,255,255,0.15)]"
                : "bg-white/[0.04] text-neutral-300 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            <Tag size={13} className="inline mr-1.5" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab("settings")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              subTab === "settings"
                ? "bg-white text-black font-semibold shadow-[0_0_16px_rgba(255,255,255,0.15)]"
                : "bg-white/[0.04] text-neutral-300 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            <Sliders size={13} className="inline mr-1.5" />
            <span>Page Settings</span>
          </button>

          {subTab === "projects" && (
            <button
              type="button"
              onClick={() =>
                setEditingProject({
                  title: "",
                  clientName: "",
                  slug: "",
                  industry: "E-Commerce",
                  year: "2026",
                  summary: "",
                  challenge: "",
                  approach: "",
                  categories: [categories[0]?.id || "Ecom"],
                  services: ["Paid Media", "CRO & Web"],
                  results: [{ metric: "+150%", label: "Key Outcome", context: "Verification metric" }],
                  gallery: [],
                  blocks: [],
                  isPublished: false,
                  isDraft: true,
                  isFeatured: false,
                  mediaType: "image",
                  thumbnailUrl: "/images/work/work-ad-sneaker.jpg",
                  heroMediaUrl: "/images/work/work-ad-sneaker.jpg",
                  altText: "",
                  testimonial: {
                    quote: "",
                    clientName: "",
                    clientTitle: "",
                    companyName: "",
                  },
                  seo: {
                    title: "",
                    description: "",
                  },
                })
              }
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-bold text-black hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all cursor-pointer ml-2"
            >
              <Plus size={14} />
              <span>New Case Study</span>
            </button>
          )}
        </div>
      </div>

      {/* ─── TAB 1: CASE STUDIES LIST ───────────────────────── */}
      {subTab === "projects" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search case studies by client, title, industry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#07070A] px-4 py-2 text-xs text-white placeholder-neutral-500 focus:border-white focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {(["all", "published", "draft", "featured"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold capitalize transition-colors cursor-pointer ${
                    statusFilter === tab
                      ? "bg-white text-black"
                      : "bg-white/[0.04] text-neutral-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0B10] p-12 text-center">
              <Layers size={32} className="mx-auto text-neutral-500 mb-3" />
              <h3 className="font-display font-bold text-base text-white">No case studies found</h3>
              <p className="text-xs text-neutral-400 mt-1">
                {searchQuery ? "Try clearing your search query." : "Click 'New Case Study' to create your first case study."}
              </p>
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext
                items={filteredProjects.map((p) => String(p._id || p.slug))}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {filteredProjects.map((project) => (
                    <SortableProjectRow
                      key={String(project._id || project.slug)}
                      project={project}
                      onEdit={(p) => setEditingProject({ ...p })}
                      onDuplicate={handleDuplicate}
                      onToggleFeatured={handleToggleFeatured}
                      onDeleteRequest={(id) => setDeleteConfirmId(id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      )}

      {/* ─── TAB 2: CATEGORIES MANAGER ───────────────────────── */}
      {subTab === "categories" && (
        <div className="rounded-2xl border border-white/[0.08] bg-[#0A0B12]/90 p-6 sm:p-8 space-y-6 max-w-2xl shadow-xl">
          <div>
            <h3 className="font-display font-bold text-lg text-white">Category Taxonomy Manager</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Add, rename, or delete filter categories. Deleting reassigns cases to Uncategorized.
            </p>
          </div>

          {/* Add Category Form */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="New category name (e.g. Fintech)..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:border-white focus:outline-hidden"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-bold text-black hover:bg-neutral-200 transition-colors"
            >
              <Plus size={14} />
              <span>Add</span>
            </button>
          </div>

          {/* Categories List */}
          <div className="space-y-2 pt-2 border-t border-white/[0.08]">
            {categories.map((cat) => {
              const count = projects.filter((p) => p.categories?.includes(cat.id)).length;
              const isEditing = editingCategoryId === cat.id;

              return (
                <div
                  key={cat.id}
                  className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-3 flex-1 mr-4">
                    <Tag size={14} className="text-neutral-500" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingCategoryLabel}
                        onChange={(e) => setEditingCategoryLabel(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleRenameCategory(cat.id, editingCategoryLabel)}
                        className="rounded-lg border border-white/20 bg-black px-2 py-1 text-xs text-white"
                        autoFocus
                      />
                    ) : (
                      <span className="font-display font-semibold text-white text-sm">
                        {cat.label}
                      </span>
                    )}
                    <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] text-neutral-300">
                      {count} cases
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {isEditing ? (
                      <button
                        type="button"
                        onClick={() => handleRenameCategory(cat.id, editingCategoryLabel)}
                        className="rounded-lg bg-emerald-500/20 text-emerald-300 p-1.5 hover:bg-emerald-500/30 text-xs"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCategoryId(cat.id);
                          setEditingCategoryLabel(cat.label);
                        }}
                        className="rounded-lg border border-white/10 p-1.5 text-neutral-300 hover:text-white hover:bg-white/5"
                        title="Rename"
                      >
                        <Edit2 size={13} />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="rounded-lg border border-red-500/20 p-1.5 text-red-400 hover:bg-red-500/10"
                      title="Delete category"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── TAB 3: PAGE SETTINGS ───────────────────────────── */}
      {subTab === "settings" && (
        <div className="rounded-2xl border border-white/[0.08] bg-[#0A0B12]/90 p-6 sm:p-8 space-y-8 max-w-4xl shadow-xl">
          <div>
            <h3 className="font-display font-bold text-lg text-white">Case Studies Page Hero &amp; Meta</h3>
            <p className="text-xs text-neutral-400">Configure global hero typography and SEO parameters</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                Hero Eyebrow Pill
              </label>
              <input
                type="text"
                value={settings.heroEyebrow}
                onChange={(e) => setSettings({ ...settings, heroEyebrow: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:border-white focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                  Headline Line 1 (Grotesk)
                </label>
                <input
                  type="text"
                  value={settings.heroHeadingLine1}
                  onChange={(e) => setSettings({ ...settings, heroHeadingLine1: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:border-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                  Headline Line 2 (Italic Serif)
                </label>
                <input
                  type="text"
                  value={settings.heroHeadingLine2}
                  onChange={(e) => setSettings({ ...settings, heroHeadingLine2: e.target.value })}
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
                value={settings.heroSupportingCopy}
                onChange={(e) => setSettings({ ...settings, heroSupportingCopy: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:border-white focus:outline-hidden"
              />
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="pt-6 border-t border-white/[0.08] space-y-4">
            <h4 className="font-display font-bold text-base text-white">SEO &amp; Meta</h4>
            <div className="space-y-3">
              <div>
                <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={settings.seo?.title || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, seo: { ...settings.seo, title: e.target.value } })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:border-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  value={settings.seo?.description || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, seo: { ...settings.seo, description: e.target.value } })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:border-white focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.08] flex justify-end">
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSaveSettings}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-xs font-bold text-black hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save size={14} />
              <span>{isSaving ? "Saving..." : "Save Page Settings"}</span>
            </button>
          </div>
        </div>
      )}

      {/* ─── MODAL: EDIT OR CREATE CASE STUDY ────────────────── */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-4xl rounded-3xl bg-[#0A0B12] p-5 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.9)] border border-white/10 my-4 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4 shrink-0">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                  {editingProject._id ? "EDIT CASE STUDY" : "CREATE NEW CASE STUDY"}
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                  {editingProject.title || "Untitled Case Study"}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="rounded-xl border border-white/10 p-2 text-neutral-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-6 text-xs custom-scrollbar">
              {/* Publication Status & Flags */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 rounded-2xl bg-white/[0.02] p-4 border border-white/[0.06]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProject.isPublished)}
                    onChange={(e) => setEditingProject({ ...editingProject, isPublished: e.target.checked })}
                    className="rounded border-white/20 bg-white/5 text-white accent-white focus:ring-0"
                  />
                  <span className="font-bold text-white">Published on Live Site</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProject.isFeatured)}
                    onChange={(e) => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
                    className="rounded border-white/20 bg-white/5 text-white accent-white focus:ring-0"
                  />
                  <span className="font-bold text-white">Feature on Signature Stage</span>
                </label>
              </div>

              {/* Core Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={editingProject.clientName || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, clientName: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-white focus:border-white focus:outline-hidden"
                    placeholder="e.g. Voltex Active"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                    URL Slug (auto/editable) *
                  </label>
                  <input
                    type="text"
                    value={editingProject.slug || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "-"),
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 font-mono text-white focus:border-white focus:outline-hidden"
                    placeholder="e.g. voltex-active"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                    Metric-Led Headline *
                  </label>
                  <input
                    type="text"
                    value={editingProject.title || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 font-display font-semibold text-white focus:border-white focus:outline-hidden"
                    placeholder="e.g. 4.4x ROAS & $1.8M drop revenue through high-velocity performance creative"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                    Client Logo Upload / URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingProject.clientLogo || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, clientLogo: e.target.value })}
                      className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-white focus:border-white focus:outline-hidden"
                      placeholder="Logo URL or upload"
                    />
                    <label className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.1] px-3 py-2 text-xs font-bold text-white cursor-pointer transition-colors">
                      <Upload size={12} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload(e, (url) => setEditingProject({ ...editingProject, clientLogo: url }))
                        }
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={editingProject.year || "2026"}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-white focus:border-white focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                    One-Line Summary *
                  </label>
                  <textarea
                    rows={2}
                    value={editingProject.summary || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-white focus:border-white focus:outline-hidden"
                    placeholder="Short summary displayed on grid and detail hero..."
                  />
                </div>

                {/* Categories */}
                <div className="sm:col-span-2">
                  <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                    Categories (Managed list)
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {categories.map((cat) => {
                      const isChecked = editingProject.categories?.includes(cat.id);
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            const cur = editingProject.categories || [];
                            const next = isChecked ? cur.filter((c) => c !== cat.id) : [...cur, cat.id];
                            setEditingProject({ ...editingProject, categories: next });
                          }}
                          className={`rounded-xl px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                            isChecked
                              ? "bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                              : "bg-white/[0.04] text-neutral-400 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white"
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Cover Media */}
              <div className="pt-4 border-t border-white/[0.08] space-y-4">
                <h4 className="font-display font-bold text-sm text-white">Cover Image</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingProject.thumbnailUrl || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        thumbnailUrl: e.target.value,
                        heroMediaUrl: e.target.value,
                      })
                    }
                    className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-white focus:border-white focus:outline-hidden"
                    placeholder="Cover image URL..."
                  />
                  <label className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.1] px-4 py-2 text-xs font-bold text-white cursor-pointer transition-colors">
                    <Upload size={12} />
                    <span>Upload Cover</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload(e, (url) =>
                          setEditingProject({
                            ...editingProject,
                            thumbnailUrl: url,
                            heroMediaUrl: url,
                          }),
                        )
                      }
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Gallery Images (Multi-upload, drag/reorder, alt text) */}
              <div className="pt-4 border-t border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">Gallery Images</h4>
                    <p className="text-[11px] text-neutral-400">Multiple screenshots or campaign assets with alt text</p>
                  </div>
                  <label className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.1] px-3.5 py-1.5 text-xs font-bold text-white cursor-pointer transition-colors">
                    <Upload size={12} />
                    <span>Add Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload(e, (url) => {
                          const cur = editingProject.gallery || [];
                          setEditingProject({
                            ...editingProject,
                            gallery: [...cur, { url, altText: `${editingProject.clientName} gallery item`, caption: "" }],
                          });
                        })
                      }
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="space-y-2">
                  {editingProject.gallery?.map((gItem, gIdx) => (
                    <div key={gIdx} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#0E0F18] p-3">
                      <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-black border border-white/10">
                        <img src={gItem.url} alt="" className="h-full w-full object-cover" />
                      </div>
                      <input
                        type="text"
                        value={gItem.altText || ""}
                        placeholder="Alt text..."
                        onChange={(e) => {
                          const updated = [...(editingProject.gallery || [])];
                          if (updated[gIdx]) updated[gIdx] = { ...updated[gIdx]!, altText: e.target.value };
                          setEditingProject({ ...editingProject, gallery: updated });
                        }}
                        className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-white"
                      />
                      <input
                        type="text"
                        value={gItem.caption || ""}
                        placeholder="Caption (optional)..."
                        onChange={(e) => {
                          const updated = [...(editingProject.gallery || [])];
                          if (updated[gIdx]) updated[gIdx] = { ...updated[gIdx]!, caption: e.target.value };
                          setEditingProject({ ...editingProject, gallery: updated });
                        }}
                        className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (editingProject.gallery || []).filter((_, idx) => idx !== gIdx);
                          setEditingProject({ ...editingProject, gallery: updated });
                        }}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* KPI Stats Array {value, label} */}
              <div className="pt-4 border-t border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-sm text-white">KPI Stats Array</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = editingProject.results || [];
                      setEditingProject({
                        ...editingProject,
                        results: [...cur, { metric: "+100%", label: "Key Outcome", context: "Verification metric" }],
                      });
                    }}
                    className="inline-flex items-center gap-1 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] px-3 py-1 font-bold text-white cursor-pointer transition-colors"
                  >
                    <Plus size={12} />
                    <span>Add Stat</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {editingProject.results?.map((res, i) => (
                    <div key={i} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        placeholder="Value (+184%)"
                        value={res.metric}
                        onChange={(e) => {
                          const cur = [...(editingProject.results || [])];
                          if (cur[i]) cur[i] = { ...cur[i]!, metric: e.target.value };
                          setEditingProject({ ...editingProject, results: cur });
                        }}
                        className="w-full sm:w-32 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono font-bold text-white"
                      />
                      <input
                        type="text"
                        placeholder="Label (Qualified Pipeline)"
                        value={res.label}
                        onChange={(e) => {
                          const cur = [...(editingProject.results || [])];
                          if (cur[i]) cur[i] = { ...cur[i]!, label: e.target.value };
                          setEditingProject({ ...editingProject, results: cur });
                        }}
                        className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Context note..."
                        value={res.context || ""}
                        onChange={(e) => {
                          const cur = [...(editingProject.results || [])];
                          if (cur[i]) cur[i] = { ...cur[i]!, context: e.target.value };
                          setEditingProject({ ...editingProject, results: cur });
                        }}
                        className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (editingProject.results || []).filter((_, idx) => idx !== i);
                          setEditingProject({ ...editingProject, results: updated });
                        }}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg cursor-pointer transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge / Approach Narrative */}
              <div className="pt-4 border-t border-white/[0.08] space-y-4">
                <h4 className="font-display font-bold text-sm text-white">Challenge &amp; Approach Narrative</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                      The Challenge (Friction Point)
                    </label>
                    <textarea
                      rows={4}
                      value={editingProject.challenge || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-white focus:border-white focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                      Our Approach (The Solution)
                    </label>
                    <textarea
                      rows={4}
                      value={editingProject.approach || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, approach: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-white focus:border-white focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Testimonial {quote, author, role} */}
              <div className="pt-4 border-t border-white/[0.08] space-y-3">
                <h4 className="font-display font-bold text-sm text-white">Client Testimonial</h4>
                <textarea
                  rows={3}
                  placeholder="Testimonial quote..."
                  value={editingProject.testimonial?.quote || ""}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      testimonial: {
                        ...(editingProject.testimonial || { clientName: "", clientTitle: "", companyName: "" }),
                        quote: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-white focus:border-white focus:outline-hidden"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Author (e.g. Elena Rostova)"
                    value={editingProject.testimonial?.clientName || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        testimonial: {
                          ...(editingProject.testimonial || { quote: "", clientTitle: "", companyName: "" }),
                          clientName: e.target.value,
                        },
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Role (e.g. Head of Growth)"
                    value={editingProject.testimonial?.clientTitle || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        testimonial: {
                          ...(editingProject.testimonial || { quote: "", clientName: "", companyName: "" }),
                          clientTitle: e.target.value,
                        },
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-white"
                  />
                </div>
              </div>

              {/* SEO Title & Description */}
              <div className="pt-4 border-t border-white/[0.08] space-y-3">
                <h4 className="font-display font-bold text-sm text-white">SEO Title &amp; Description</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="SEO Title..."
                    value={editingProject.seo?.title || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        seo: { ...(editingProject.seo || { description: "" }), title: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-white"
                  />
                  <input
                    type="text"
                    placeholder="SEO Description..."
                    value={editingProject.seo?.description || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        seo: { ...(editingProject.seo || { title: "" }), description: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-4 shrink-0 bg-[#0A0B12]">
              <div className="flex items-center gap-2">
                <Link
                  href={`/case-studies/${editingProject.slug}?preview=true`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-bold text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  <Eye size={13} className="text-white" />
                  <span>Preview Page</span>
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="rounded-xl px-5 py-2 text-xs font-semibold text-neutral-400 hover:text-white cursor-pointer transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSaveProject}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-xs font-bold text-black hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Save size={14} />
                  <span>{isSaving ? "Saving..." : "Save Case Study"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#0E0F18] p-6 shadow-2xl">
            <h3 className="font-display font-bold text-lg text-white">Delete Case Study?</h3>
            <p className="text-xs text-neutral-400 mt-2">
              This action cannot be undone. The case study will be permanently deleted from the database.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="rounded-xl bg-red-600 px-5 py-2 text-xs font-bold text-white hover:bg-red-700 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
