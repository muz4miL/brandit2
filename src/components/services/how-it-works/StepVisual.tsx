"use client";

import React from "react";
import { Calendar, Rocket } from "lucide-react";

interface StepVisualProps {
  stepIndex: number;
}

export function StepVisual({ stepIndex }: StepVisualProps) {
  // Step 1: Free strategy call -> Mini visual: a "30 min" chip with a calendar icon
  if (stepIndex === 0) {
    return (
      <div
        className="mt-5 pt-4 flex items-center justify-between"
        style={{ borderTop: "1px solid var(--section-border)" }}
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full gold-status-pill gold-shine gold-shine-d1"
          style={{ color: "var(--gold)" }}
        >
          <Calendar size={13} style={{ color: "var(--gold)" }} />
          <span className="font-mono text-[11.5px] font-medium tracking-wide">30 min</span>
        </div>
        <span
          className="font-mono text-[11px] tracking-tight"
          style={{ color: "var(--muted-foreground)" }}
        >
          Video Call · No Obligation
        </span>
      </div>
    );
  }

  // Step 2: Your plan -> Mini visual: a small package card with 3 priority bars
  if (stepIndex === 1) {
    return (
      <div
        className="mt-5 pt-4 space-y-2"
        style={{ borderTop: "1px solid var(--section-border)" }}
      >
        <div
          className="flex items-center justify-between text-[11px] font-mono mb-1"
          style={{ color: "var(--muted-foreground)" }}
        >
          <span>Priority Allocation</span>
          <span style={{ color: "var(--gold)", fontWeight: 600 }}>Custom Package</span>
        </div>

        <div
          className="space-y-2 rounded-xl p-3"
          style={{
            border: "1px solid var(--section-border)",
            background: "var(--section-elevated)",
          }}
        >
          {/* Bar 1 */}
          <div className="space-y-1">
            <div
              className="flex justify-between text-[10.5px] font-mono"
              style={{ color: "var(--foreground)" }}
            >
              <span>Positioning &amp; Funnel</span>
              <span style={{ color: "var(--gold)" }}>85%</span>
            </div>
            <div
              className="h-1.5 w-full rounded-full overflow-hidden"
              style={{ background: "var(--section-border)" }}
            >
              <div
                className="h-full rounded-full w-[85%] shadow-[0_0_8px_rgba(209,173,105,0.4)]"
                style={{ background: "var(--gold)" }}
              />
            </div>
          </div>

          {/* Bar 2 */}
          <div className="space-y-1">
            <div
              className="flex justify-between text-[10.5px] font-mono"
              style={{ color: "var(--muted-foreground)" }}
            >
              <span>Website Performance</span>
              <span style={{ color: "var(--muted-foreground)" }}>65%</span>
            </div>
            <div
              className="h-1.5 w-full rounded-full overflow-hidden"
              style={{ background: "var(--section-border)" }}
            >
              <div
                className="h-full rounded-full w-[65%]"
                style={{ background: "linear-gradient(90deg, var(--section-border) 0%, var(--gold) 100%)" }}
              />
            </div>
          </div>

          {/* Bar 3 */}
          <div className="space-y-1">
            <div
              className="flex justify-between text-[10.5px] font-mono"
              style={{ color: "var(--muted-foreground)" }}
            >
              <span>Content &amp; Paid Engine</span>
              <span style={{ color: "var(--muted-foreground)" }}>45%</span>
            </div>
            <div
              className="h-1.5 w-full rounded-full overflow-hidden"
              style={{ background: "var(--section-border)" }}
            >
              <div
                className="h-full rounded-full w-[45%]"
                style={{ background: "var(--gold-muted, var(--muted-foreground))" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: We build -> Mini visual: a small timeline strip with a "Kickoff" marker
  if (stepIndex === 2) {
    return (
      <div
        className="mt-5 pt-4 space-y-2.5"
        style={{ borderTop: "1px solid var(--section-border)" }}
      >
        <div
          className="flex items-center justify-between text-[11px] font-mono"
          style={{ color: "var(--muted-foreground)" }}
        >
          <span>Timeline &amp; Delivery</span>
          <span
            className="flex items-center gap-1.5 font-medium"
            style={{ color: "var(--gold)" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }}
            />
            Execution Ready
          </span>
        </div>

        <div
          className="rounded-xl p-3 flex items-center justify-between"
          style={{
            border: "1px solid var(--section-border)",
            background: "var(--section-elevated)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="h-7 w-7 rounded-lg flex items-center justify-center"
              style={{
                background: "var(--gold-bg)",
                border: "1px solid var(--gold-border)",
              }}
            >
              <Rocket size={13} style={{ color: "var(--gold)" }} />
            </div>
            <div>
              <span
                className="font-display font-medium text-[12.5px] block leading-snug"
                style={{ color: "var(--foreground)" }}
              >
                Kickoff Marker
              </span>
              <span
                className="font-mono text-[10.5px] block mt-0.5"
                style={{ color: "var(--muted-foreground)" }}
              >
                Sprint 1 Milestones Locked
              </span>
            </div>
          </div>

          <span
            className="font-mono text-[10.5px] font-semibold px-2.5 py-0.5 rounded-md gold-status-pill gold-shine gold-shine-d3"
            style={{ color: "var(--gold)" }}
          >
            Agreed
          </span>
        </div>
      </div>
    );
  }

  return null;
}
