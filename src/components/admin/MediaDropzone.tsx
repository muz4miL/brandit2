"use client";

import { useRef, useState } from "react";
import { UploadCloud, RefreshCw, X, Link2, Film, Image as ImageIcon } from "lucide-react";
import { adminUploadMediaFn } from "@/api/admin";

type MediaKind = "image" | "video";

interface MediaDropzoneProps {
  label: string;
  hint?: string | undefined;
  value?: string | undefined;
  kind: MediaKind;
  onChange: (url: string) => void;
  onNotify?: ((msg: string, type?: "success" | "error") => void) | undefined;
  /** Existing poster URL — when empty, a frame is extracted from the uploaded video. */
  poster?: string | undefined;
  onAutoPoster?: ((url: string) => void) | undefined;
  tileClassName?: string | undefined;
}

const ACCEPT: Record<MediaKind, string> = {
  image: "image/jpeg,image/png,image/webp,image/avif",
  video: "video/mp4,video/webm,video/quicktime",
};

/** Grabs a representative frame from a local video file so the card never renders blank. */
async function capturePoster(file: File): Promise<File | null> {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement("video");
    let settled = false;

    const finish = (result: File | null) => {
      if (settled) return;
      settled = true;
      URL.revokeObjectURL(objectUrl);
      resolve(result);
    };

    const draw = () => {
      try {
        const canvas = document.createElement("canvas");
        const sourceW = video.videoWidth || 405;
        const sourceH = video.videoHeight || 720;
        const scale = Math.min(1, 720 / sourceH);
        canvas.width = Math.round(sourceW * scale);
        canvas.height = Math.round(sourceH * scale);

        const ctx = canvas.getContext("2d");
        if (!ctx) return finish(null);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return finish(null);
            const ext = blob.type === "image/png" ? "png" : "webp";
            finish(new File([blob], `poster-${Date.now()}.${ext}`, { type: blob.type }));
          },
          "image/webp",
          0.82,
        );
      } catch {
        finish(null);
      }
    };

    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.onloadeddata = () => {
      const target = Number.isFinite(video.duration) && video.duration > 1.4 ? 1.2 : 0;
      if (target > 0) {
        video.currentTime = target;
      } else {
        draw();
      }
    };
    video.onseeked = draw;
    video.onerror = () => finish(null);
    video.src = objectUrl;
  });
}

export function MediaDropzone({
  label,
  hint,
  value,
  kind,
  onChange,
  onNotify,
  poster,
  onAutoPoster,
  tileClassName = "h-20 w-16",
}: MediaDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showUrl, setShowUrl] = useState(false);

  const noun = kind === "video" ? "video" : "image";

  const upload = async (file: File) => {
    if (kind === "video" && !file.type.startsWith("video/")) {
      onNotify?.("That file isn't a video. Drop an MP4, WebM, or MOV.", "error");
      return;
    }
    if (kind === "image" && !file.type.startsWith("image/")) {
      onNotify?.("That file isn't an image. Drop a JPG, PNG, WebP, or AVIF.", "error");
      return;
    }

    setIsUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await adminUploadMediaFn(body);
      onChange(res.url);
      onNotify?.(`${kind === "video" ? "Video" : "Image"} uploaded`);

      if (kind === "video" && !poster && onAutoPoster) {
        const frame = await capturePoster(file);
        if (frame) {
          const frameBody = new FormData();
          frameBody.append("file", frame);
          const frameRes = await adminUploadMediaFn(frameBody);
          onAutoPoster(frameRes.url);
        }
      }
    } catch (err: unknown) {
      onNotify?.(err instanceof Error ? err.message : "Upload failed", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (isUploading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) void upload(file);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <label className="block text-neutral-400 font-semibold">{label}</label>
        <button
          type="button"
          onClick={() => setShowUrl((v) => !v)}
          className="inline-flex items-center gap-1 text-[10px] font-mono text-neutral-500 hover:text-white transition-colors"
        >
          <Link2 size={10} />
          {showUrl ? "Hide URL" : "Paste URL"}
        </button>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!isUploading) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative flex items-center gap-3.5 rounded-2xl border-2 border-dashed p-3 transition-all ${
          isDragging
            ? "border-white/60 bg-white/[0.07]"
            : "border-white/[0.12] bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.03]"
        }`}
      >
        {/* Thumbnail */}
        <div
          className={`relative ${tileClassName} shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#07070A] grid place-items-center`}
        >
          {isUploading ? (
            <RefreshCw size={16} className="animate-spin text-neutral-400" />
          ) : value ? (
            kind === "video" ? (
              <video
                src={value}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            ) : (
              <img src={value} alt="" className="h-full w-full object-cover" />
            )
          ) : (
            <span className="flex flex-col items-center text-neutral-600">
              {kind === "video" ? <Film size={16} /> : <ImageIcon size={16} />}
              <span className="mt-0.5 text-[8px] font-mono uppercase">Empty</span>
            </span>
          )}

          {value && !isUploading && (
            <button
              type="button"
              onClick={() => onChange("")}
              title="Remove media"
              className="absolute top-1 right-1 grid h-5 w-5 place-items-center rounded-full bg-black/80 text-white hover:bg-red-500 transition-colors"
            >
              <X size={11} />
            </button>
          )}
        </div>

        {/* Copy + actions */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-white">
            {isDragging
              ? `Drop to ${value ? "replace" : "upload"} ${noun}`
              : value
                ? `Drag a new ${noun} here to replace`
                : `Drag & drop ${noun} here`}
          </p>
          <p className="mt-0.5 truncate font-mono text-[10px] text-neutral-500">
            {value || hint || (kind === "video" ? "MP4 / WebM / MOV · up to 35MB" : "JPG / PNG / WebP / AVIF · up to 10MB")}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-white/20 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isUploading ? (
                <>
                  <RefreshCw size={12} className="animate-spin" />
                  <span>Uploading…</span>
                </>
              ) : value ? (
                <>
                  <RefreshCw size={12} />
                  <span>Replace file</span>
                </>
              ) : (
                <>
                  <UploadCloud size={12} />
                  <span>Browse files</span>
                </>
              )}
            </button>
            {value && !isUploading && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="text-[11px] font-semibold text-neutral-500 hover:text-red-400 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT[kind]}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
            e.target.value = "";
          }}
        />

        {isDragging && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center rounded-2xl bg-black/60 backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-white">
              <UploadCloud size={15} />
              Release to {value ? "replace" : "upload"}
            </span>
          </div>
        )}
      </div>

      {showUrl && (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={kind === "video" ? "/videos/ads/optimized/… .mp4" : "/uploads/work/… or https://…"}
          className="w-full rounded-xl border border-white/10 bg-[#07070A] p-2.5 text-white font-mono focus:outline-none focus:border-white"
        />
      )}
    </div>
  );
}
