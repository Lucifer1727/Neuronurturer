"use client";

import React from "react";
import Cards from "./ui/cards";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function Banner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-400 to-yellow-300 p-6">
      <motion.div
        className="bg-[#4E1F00] w-full max-w-5xl px-6 py-10 sm:px-10 sm:py-12 rounded-2xl shadow-lg shadow-black/30 text-white"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold text-center mb-10 text-shadow-white text-shadow-sm"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Skills We Develop
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { text: "Cognitive\nSkills", link: "/cognitive" },
            { text: "Emotional\nSkills", link: "/emotional" },
            { text: "Social\nSkills", link: "/social" },
            { text: "Academic\nSkills", link: "/academic" },
            { text: "Motor\nSkills", link: "/motor" },
          ].map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Cards
                text={
                  <>
                    {item.text.split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </>
                }
                links={item.link}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
