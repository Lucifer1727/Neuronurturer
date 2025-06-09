"use client";

import React from "react";
import { motion } from "framer-motion";
import { MdMenuBook } from "react-icons/md";

export default function AcademicSkills() {
  return (
    <div className="flex items-center justify-center w-screen h-screen p-6 bg-amber-400 bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-400">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#4E1F00] text-white rounded-2xl shadow-xl shadow-black/30 px-10 py-8 max-w-4xl flex flex-col items-center justify-center text-center gap-6"
      >
        <div className="flex items-center gap-2 text-5xl font-bold text-white drop-shadow-sm">
          <MdMenuBook className="text-amber-300 animate-bounce-slow" />
          <h1 className="font-extrabold">Academic Skills</h1>
        </div>

        <p className="text-lg leading-relaxed font-medium text-white/90 max-w-2xl">
          We support school success by strengthening reading, writing, and math
          through{" "}
          <span className="text-amber-300">fun and evidence-based methods</span>
          .
          <br />
          <br />
          Tools like{" "}
          <span className="text-amber-300">multisensory phonics</span> (for
          dyslexia), <span className="text-amber-300">visual organizers</span>,
          and <span className="text-amber-300">math games</span> help build
          confidence. We also teach study strategies like note-taking, planner
          use, and self-paced learning with assistive tools — including
          overlays, reading apps, and calculators.
          <br />
          <br />
          The goal: children become{" "}
          <span className="italic text-white">
            independent, curious learners
          </span>{" "}
          who enjoy school.
        </p>
      </motion.div>
    </div>
  );
}
