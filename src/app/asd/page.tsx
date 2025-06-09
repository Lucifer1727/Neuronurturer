"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaPuzzlePiece } from "react-icons/fa";

export default function ASD() {
  return (
    <div className="flex items-center justify-center w-screen h-screen p-6 bg-amber-400 bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-400">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#4E1F00] text-white rounded-2xl shadow-xl shadow-black/30 px-10 py-8 max-w-4xl flex flex-col items-center justify-center text-center gap-6"
      >
        <div className="flex items-center gap-2 text-5xl font-bold text-white drop-shadow-sm">
          <FaPuzzlePiece className="text-amber-300 animate-bounce" />
          <h1 className="font-extrabold">ASD Support</h1>
        </div>

        <p className="text-lg leading-relaxed font-medium text-white/90 max-w-2xl">
          Children with <span className="text-amber-300">ASD (Autism)</span>{" "}
          often face challenges with{" "}
          <span className="italic">social communication</span> and{" "}
          <span className="italic">behavioral flexibility</span>.
          <br />
          <br />
          ASD “can cause significant social, communication, and behavioral
          challenges” <span className="text-white/70 italic">(cdc.gov)</span>.
          <br />
          <br />
          We use <span className="underline">visual aids</span>,{" "}
          <span className="underline">social stories</span>, and fun, guided
          practice to improve{" "}
          <span className="text-amber-300">
            language, play, and social understanding
          </span>
          .
          <br />
          <br />
          Every child is unique — we help them shine in their own wonderful way
          🌟.
        </p>
      </motion.div>
    </div>
  );
}
