"use client";

import MemoryGame from "./components/memory-game";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-yellow-400">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-4 text-slate-800">
          Memory Card Game
        </h1>
        <p className="text-center mb-6 text-slate-700">
          Find matching pairs to improve focus and memory!
        </p>
        <MemoryGame />
      </div>
    </main>
  );
}
