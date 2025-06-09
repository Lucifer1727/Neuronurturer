"use client";

import React from "react";
import { motion } from "framer-motion";
import { GiBrain } from "react-icons/gi";

export default function Cognitive() {
  return (
    <div className="flex items-center justify-center w-screen h-screen p-6 bg-amber-400 bg-gradient-to-b from-amber-400 via-yellow-400 to-amber-400">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#4E1F00] text-white rounded-2xl shadow-xl shadow-black/30 px-10 py-8 max-w-4xl flex flex-col items-center justify-center text-center gap-6"
      >
        <div className="flex items-center gap-2 text-5xl font-bold text-white drop-shadow-sm">
          <GiBrain className="text-amber-300 animate-bounce-slow" />
          <h1 className="font-extrabold">Cognitive Skills</h1>
        </div>

        <p className="text-lg leading-relaxed font-medium text-white/90 max-w-2xl">
          We strengthen{" "}
          <span className="text-amber-300">executive function skills</span>
          (working memory, planning, organization) and attention. Executive
          functions let us “reason and think before acting, meet new challenges…
          and stay focused and concentrate” — <i>additudemag.com</i>.
          <br />
          <br />
          Through fun games and tasks (puzzles, memory games, strategy
          planning), children practice planning, problem-solving, and
          self-control. (E.g., we might use age-appropriate board games to boost
          working memory and flexibility.)
        </p>
      </motion.div>
    </div>
  );
}
