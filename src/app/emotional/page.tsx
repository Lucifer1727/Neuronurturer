"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

export default function EmotionalSkills() {
  return (
    <div className="flex items-center justify-center w-screen h-screen p-6 bg-amber-400 bg-gradient-to-b from-amber-400 via-yellow-400 to-amber-400">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#4E1F00] text-white rounded-2xl shadow-xl shadow-black/30 px-10 py-8 max-w-4xl flex flex-col items-center justify-center text-center gap-6"
      >
        <div className="flex items-center gap-2 text-5xl font-bold text-white drop-shadow-sm">
          <FaHeart className="text-amber-300 animate-bounce-slow" />
          <h1 className="font-extrabold">Emotional Skills</h1>
        </div>

        <p className="text-lg leading-relaxed font-medium text-white/90 max-w-2xl">
          We help children{" "}
          <span className="text-amber-300">recognize and manage feelings</span>.
          Many kids with learning differences find it hard to understand
          emotions or shifts in mood — <i>childrenscolorado.org</i>.
          <br />
          <br />
          Our approach teaches{" "}
          <span className="text-amber-300">
            self-awareness and regulation
          </span>{" "}
          using breathing exercises, emotion charts, and positive affirmations.
          This helps children cope with frustration and anxiety, building
          confidence and resilience so they feel calm and “in control of big
          feelings.”
        </p>
      </motion.div>
    </div>
  );
}
