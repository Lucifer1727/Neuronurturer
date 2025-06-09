"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";

export default function SocialSkills() {
  return (
    <div className="flex items-center justify-center w-screen h-screen p-6 bg-amber-400 bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-400">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#4E1F00] text-white rounded-2xl shadow-xl shadow-black/30 px-10 py-8 max-w-4xl flex flex-col items-center justify-center text-center gap-6"
      >
        <div className="flex items-center gap-2 text-5xl font-bold text-white drop-shadow-sm">
          <FaUsers className="text-amber-300 animate-bounce-slow" />
          <h1 className="font-extrabold">Social Skills</h1>
        </div>

        <p className="text-lg leading-relaxed font-medium text-white/90 max-w-2xl">
          We nurture{" "}
          <span className="text-amber-300">
            communication, empathy, and teamwork
          </span>
          . Children learn to make eye contact, take turns, share, and
          understand others’ feelings.
          <br />
          <br />
          For those with ASD and related challenges{" "}
          <span className="text-white/70 italic">
            (like those noted by cdc.gov)
          </span>
          , we use{" "}
          <span className="text-amber-300">role-play, social stories</span>, and
          fun group games to develop confidence in making friends and solving
          conflicts.
          <br />
          <br />
          These joyful experiences help children feel{" "}
          <span className="italic text-white">
            seen, accepted, and connected
          </span>
          .
        </p>
      </motion.div>
    </div>
  );
}
