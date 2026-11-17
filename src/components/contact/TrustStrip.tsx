"use client";

import React from "react";
import { Clock, Calendar, ShieldCheck } from "lucide-react";

export function TrustStrip() {
  return (
    <div className="space-y-6">
      {/* 3 Trust Signals */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] sm:text-[13px] text-neutral-300">
        <div className="inline-flex items-center gap-2">
          <Clock size={14} className="text-white shrink-0" />
          <span>Reply within 4h</span>
        </div>
        <div className="inline-flex items-center gap-2">
          <Calendar size={14} className="text-white shrink-0" />
          <span>Free 30-min call</span>
        </div>
        <div className="inline-flex items-center gap-2">
          <ShieldCheck size={14} className="text-white shrink-0" />
          <span>No sales pitch</span>
        </div>
      </div>
    </div>
  );
}

