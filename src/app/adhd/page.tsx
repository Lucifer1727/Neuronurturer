"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaBrain } from "react-icons/fa";

export default function ADHD() {
  return (
    <div className="flex items-center justify-center w-screen h-screen p-6 bg-amber-400 bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-400">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#4E1F00] text-white rounded-2xl shadow-xl shadow-black/30 px-10 py-8 max-w-4xl flex flex-col items-center justify-center text-center gap-6"
      >
        <div className="flex items-center gap-2 text-5xl font-bold text-white drop-shadow-sm">
          <FaBrain className="text-amber-300 animate-spin-slow" />
          <h1 className="font-extrabold">ADHD Support</h1>
        </div>

        <p className="text-lg leading-relaxed font-medium text-white/90 max-w-2xl">
          Children with <span className="text-amber-300">ADHD</span> may face
          challenges with attention, impulse control, and hyperactivity.
          <br />
          <br />
          These kids often find it difficult to sit still, focus, or manage
          sudden urges{" "}
          <span className="italic text-white/70">(as noted by cdc.gov)</span>.
          <br />
          <br />
          Our approach builds{" "}
          <span className="text-amber-300">
            focus, self-control, and organization
          </span>{" "}
          through playful, interactive tools like{" "}
          <span className="underline">
            games, timers, and visual checklists
          </span>
          .
          <br />
          <br />
          With consistent support, children feel{" "}
          <span className="italic text-white">
            more confident, in control, and ready to thrive
          </span>
          .
        </p>
      </motion.div>
    </div>
  );
}
