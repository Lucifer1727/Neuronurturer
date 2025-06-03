"use client";

import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import memorycard from "../Images/Games/memorycard.png";
import alphabet from "../Images/Games/Alphabet.png";
import slidePuzzle from "../Images/Games/Slide Puzzle.png";
import piano from "../Images/Games/Piano.png";
import bubble from "../Images/Games/NUmbubble.png";
import paint from "../Images/Games/paint.png";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";

export const RevealBento = () => {
  const imageCards = [
    {
      src: memorycard,
      caption:
        "Memory card games boost focus, attention, and memory. They enhance cognitive speed, visual/spatial skills, and teamwork. These games also uplift self-esteem and motivation, offering a fun path to learning.",
      navigation: "/memoryCard",
    },
    {
      src: alphabet,
      caption:
        "This number puzzle game enhances focus, memory, and numeracy for kids with ADHD, ASD, and dyslexia. Clean design, color cues, and progressive challenges promote cognitive skills and confidence.",
      navigation: "/numberPuzzle",
    },
    {
      src: slidePuzzle,
      caption:
        "Slide puzzle games boost focus, attention, and memory. They improve problem-solving and spatial reasoning, sharpening cognitive skills and enhancing learning motivation.",
      navigation: "/slidePuzzle",
    },
    {
      src: piano,
      caption:
        "Piano games enhance focus, memory, and creativity. They support ADHD, ASD, and dyslexia by improving cognitive skills and providing a fun, engaging way to learn.",
      navigation: "/piano",
    },
    {
      src: bubble,
      caption:
        "Bubble games enhance focus, memory, and creativity. They support ADHD, ASD, and dyslexia by improving cognitive skills and providing a fun, engaging way to learn.",
      navigation: "/bubble",
    },
    {
      src: paint,
      caption:
        "Creative Paint Studio is an inclusive paint app for kids with ADHD, ASD, and dyslexia. It builds focus, fine motor skills, and confidence through guided drawing and creative exploration.",
      navigation: "/paintApp",
    },
  ];
  const router = useRouter();
  return (
    <div className="min-h-screen bg-amber-300 px-4 py-12 mx-4 rounded-lg">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {imageCards.map((card, idx) => (
          <Block
            key={idx}
            className="flex flex-col items-center justify-between"
          >
            <div className="flex items-center justify-center mb-4 w-[200px] h-[150px]">
              <Image
                src={card.src}
                width={200}
                height={150}
                alt={card.caption}
                className="rounded-md mb-2"
              />
            </div>
            <p>{card.caption}</p>
            {card.navigation && (
              <Button
                variant="secondary"
                size="icon"
                className="w-full mt-4 bg-amber-300 font-semibold"
                onClick={() => router.push(card.navigation)}
              >
                <ChevronRightIcon />
                Play
              </Button>
            )}
          </Block>
        ))}
      </motion.div>
    </div>
  );
};

type BlockProps = {
  className?: string;
  [key: string]: unknown;
};

const Block: React.FC<BlockProps> = ({ className, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "rounded-lg border border-purple-900 bg-zinc-900 p-6 text-[#EAEAEA] font-semibold",
        className
      )}
      {...rest}
    />
  );
};

export default RevealBento;
