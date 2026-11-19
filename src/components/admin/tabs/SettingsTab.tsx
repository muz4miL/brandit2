"use client";

import { useState, useRef } from "react";
import { Save, UploadCloud, RefreshCw, X, Image as ImageIcon } from "lucide-react";
import { adminUpdateSiteSettingsFn, adminUploadMediaFn } from "@/api/admin";

interface SettingsTabProps {
  siteSettings: any;
  setSiteSettings: React.Dispatch<React.SetStateAction<any>>;
  onNotice: (text: string, type?: "success" | "error") => void;
}

export function SettingsTab({ siteSettings, setSiteSettings, onNotice }: SettingsTabProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await adminUpdateSiteSettingsFn({ data: siteSettings });
      onNotice("Agency settings saved successfully.");
    } catch (err: any) {
      onNotice(err?.message || "Failed to save settings", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageFile = async (file: File) => {
    if (!file) return;
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await adminUploadMediaFn(formData);
      if (res.success && res.url) {
        setSiteSettings((prev: any) => ({
          ...prev,
          founder: {
            ...prev.founder,
            image: res.url,
          },
        }));
        onNotice("Founder portrait uploaded successfully!");
      }
    } catch (err: any) {
      onNotice(err?.message || "Image upload failed", "error");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) void handleImageFile(file);
  };

  const founder = siteSettings.founder || {};

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-white">
          Agency Settings &amp; Leadership Bio
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          Configure direct inquiry dispatch coordinates, WhatsApp routing, and executive founder positioning.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="rounded-2xl border border-white/[0.08] bg-[#0E0F18]/90 p-7 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Primary Contact Email
            </label>
            <input
              type="email"
              value={siteSettings.contactEmail || ""}
              onChange={(e) =>
                setSiteSettings({ ...siteSettings, contactEmail: e.target.value })
              }
              placeholder="e.g. contact@yourdomain.com"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-white focus:border-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Phone / WhatsApp Number
            </label>
            <input
              type="text"
              value={siteSettings.phoneWhatsApp || ""}
              onChange={(e) =>
                setSiteSettings({ ...siteSettings, phoneWhatsApp: e.target.value })
              }
              placeholder="+971 52 534 7120"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-white focus:border-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
            WhatsApp Direct Action URL
          </label>
          <input
            type="url"
            value={siteSettings.whatsappLink || ""}
            onChange={(e) =>
              setSiteSettings({ ...siteSettings, whatsappLink: e.target.value })
            }
            placeholder="https://wa.me/971525347120"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-white focus:border-white focus:outline-none"
          />
        </div>

        <div className="border-t border-white/[0.08] pt-6 space-y-5">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              LEADERSHIP NARRATIVE &amp; FOUNDER PROFILE
            </span>
            <h3 className="font-display text-base font-bold text-white mt-1">
              Executive Leader / CEO Positioning
            </h3>
          </div>

          {/* Founder Name & Role Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                Founder / CEO Full Name
              </label>
              <input
                type="text"
                value={founder.name || ""}
                onChange={(e) =>
                  setSiteSettings({
                    ...siteSettings,
                    founder: { ...founder, name: e.target.value },
                  })
                }
                placeholder="e.g. Umar Orakzai"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-none font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                Executive Title / Role
              </label>
              <input
                type="text"
                value={founder.role || ""}
                onChange={(e) =>
                  setSiteSettings({
                    ...siteSettings,
                    founder: { ...founder, role: e.target.value },
                  })
                }
                placeholder="e.g. CHIEF EXECUTIVE OFFICER"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-none uppercase font-mono"
              />
            </div>
          </div>

          {/* Founder Portrait Upload with Drag & Drop */}
          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-2">
              Founder Portrait Photo
            </label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="relative rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/25 transition-all p-5 flex flex-col sm:flex-row items-center gap-5"
            >
              {/* Thumbnail preview if exists */}
              <div className="relative h-28 w-24 sm:h-32 sm:w-28 shrink-0 rounded-xl overflow-hidden bg-neutral-900 border border-white/10 flex items-center justify-center shadow-lg">
                {founder.image ? (
                  <>
                    <img
                      src={founder.image}
                      alt="Founder portrait"
                      className="h-full w-full object-cover object-center"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setSiteSettings({
                          ...siteSettings,
                          founder: { ...founder, image: "" },
                        })
                      }
                      className="absolute top-1 right-1 grid h-5 w-5 place-items-center rounded-full bg-black/80 text-white hover:bg-red-500 transition-colors"
                      title="Remove image"
                    >
                      <X size={11} />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-neutral-500">
                    <ImageIcon size={24} />
                    <span className="text-[10px] mt-1 font-mono">No Image</span>
                  </div>
                )}
              </div>

              {/* Actions & Drop text */}
              <div className="flex-1 text-center sm:text-left space-y-2">
                <p className="text-xs font-semibold text-white">
                  Drag and drop a portrait photo here, or select from your device
                </p>
                <p className="text-[11px] text-neutral-400 font-mono">
                  Recommended: 800×1000px portrait ratio (JPG, PNG, WebP)
                </p>
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <button
                    type="button"
                    disabled={isUploadingImage}
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-bold text-white transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isUploadingImage ? (
                      <>
                        <RefreshCw size={13} className="animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud size={14} />
                        <span>Select from device</span>
                      </>
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void handleImageFile(file);
                    }}
                    className="hidden"
                  />
                  {founder.image && (
                    <span className="font-mono text-[10px] text-neutral-400 truncate max-w-[200px]">
                      {founder.image}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bio Textareas */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                Bio Paragraph 1 (Arena &amp; Background)
              </label>
              <textarea
                rows={3}
                value={founder.bioParagraph1 || ""}
                onChange={(e) =>
                  setSiteSettings({
                    ...siteSettings,
                    founder: {
                      ...founder,
                      bioParagraph1: e.target.value,
                    },
                  })
                }
                placeholder="I sharpened my craft inside the UAE — one of the most competitive marketing arenas on earth..."
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-white focus:border-white focus:outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                Bio Paragraph 2 (Hands-on Seats &amp; Systems)
              </label>
              <textarea
                rows={3}
                value={founder.bioParagraph2 || ""}
                onChange={(e) =>
                  setSiteSettings({
                    ...siteSettings,
                    founder: {
                      ...founder,
                      bioParagraph2: e.target.value,
                    },
                  })
                }
                placeholder="I've personally sat in every seat: shooting, editing, designing, buying media, and writing the strategy..."
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-white focus:border-white focus:outline-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-xs font-bold text-black hover:bg-neutral-200 shadow-[0_0_24px_rgba(255,255,255,0.15)] disabled:opacity-50 transition-all cursor-pointer"
          >
            <Save size={15} />
            <span>{isSaving ? "Saving Settings..." : "Save Agency Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
