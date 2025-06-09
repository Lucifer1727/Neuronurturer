"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaHandsHelping } from "react-icons/fa";

export default function Caregivers() {
  return (
    <div className="flex items-center justify-center w-screen h-screen p-6 bg-amber-400 bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-400">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#4E1F00] text-white rounded-2xl shadow-lg shadow-black/30 px-10 py-8 max-w-4xl flex flex-col items-center justify-center text-center gap-6"
      >
        <div className="flex items-center gap-3 text-4xl font-bold text-white drop-shadow-sm">
          <FaHandsHelping className="text-amber-300 animate-bounce" />
          <h1>Support for Parents & Educators</h1>
        </div>

        <p className="text-lg leading-relaxed font-medium text-white/90 max-w-2xl">
          We empower{" "}
          <span className="text-amber-300">
            parents, caregivers, and teachers
          </span>{" "}
          with training, resources, and one-on-one coaching.
          <br />
          <br />
          Backed by research{" "}
          <span className="italic text-white/70">(childrenscolorado.org)</span>,
          our strategies help children thrive in both home and school settings.
          Whether it’s using <span className="underline">visual supports</span>{" "}
          or <span className="underline">movement breaks</span>, we help
          caregivers nurture each child’s unique strengths with confidence and
          care.
        </p>
      </motion.div>
    </div>
  );
}
