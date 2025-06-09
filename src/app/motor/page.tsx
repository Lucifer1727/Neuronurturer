"use client";

import React from "react";
import { motion } from "framer-motion";
import { GiRunningShoe } from "react-icons/gi";

export default function MotorSkills() {
  return (
    <div className="flex items-center justify-center w-screen h-screen p-6 bg-amber-400 bg-gradient-to-b from-amber-400 via-yellow-400 to-amber-400">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#4E1F00] text-white rounded-2xl shadow-xl shadow-black/30 px-10 py-8 max-w-4xl flex flex-col items-center justify-center text-center gap-6"
      >
        <div className="flex items-center gap-2 text-5xl font-bold text-white drop-shadow-sm">
          <GiRunningShoe className="text-amber-300 animate-bounce-slow" />
          <h1 className="font-extrabold">Motor Skills</h1>
        </div>

        <p className="text-lg leading-relaxed font-medium text-white/90 max-w-2xl">
          We strengthen both{" "}
          <span className="text-amber-300">fine and gross motor skills</span>.
          Children may struggle with small tasks like cutting or writing, or
          bigger movements like jumping or balancing.
          <br />
          <br />
          Our program includes{" "}
          <span className="text-amber-300">playful exercises</span> like
          obstacle courses, climbing, ball games, and coordination drills. These
          activities are designed to improve strength, balance, and hand-eye
          coordination — giving children the tools to move confidently and focus
          better in class.
        </p>
      </motion.div>
    </div>
  );
}
