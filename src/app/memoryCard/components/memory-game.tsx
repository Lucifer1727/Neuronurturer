"use client";

import { useState, useEffect, useCallback } from "react";
// import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles } from "lucide-react";

// Define card types
type CardType = {
  id: number;
  imageId: string;
  flipped: boolean;
  matched: boolean;
};

// Animal emojis for the cards
const ANIMALS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

export default function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [matchedPairs, setMatchedPairs] = useState(0);
  const getCardPairsCount = useCallback(() => {
    switch (difficulty) {
      case "easy":
        return 4;
      case "medium":
        return 6;
      case "hard":
        return 8;
      default:
        return 4;
    }
  }, [difficulty]);

  const initializeGame = useCallback(() => {
    const pairsCount = getCardPairsCount();
    const selectedAnimals = ANIMALS.slice(0, pairsCount);
    let initialCards: CardType[] = [];
    selectedAnimals.forEach((animal, index) => {
      initialCards.push({
        id: index * 2,
        imageId: animal,
        flipped: false,
        matched: false,
      });
      initialCards.push({
        id: index * 2 + 1,
        imageId: animal,
        flipped: false,
        matched: false,
      });
    });
    initialCards = shuffleCards(initialCards);
    setCards(initialCards);
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setGameCompleted(false);
    setMatchedPairs(0);
  }, [getCardPairsCount]);

  // Initialize the game
  useEffect(() => {
    initializeGame();
  }, [difficulty, initializeGame]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !gameCompleted) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameCompleted]);

  // Check if game is completed
  useEffect(() => {
    if (matchedPairs === getCardPairsCount() && matchedPairs > 0) {
      setGameCompleted(true);
      setGameStarted(false);
      celebrateWin();
    }
  }, [matchedPairs, getCardPairsCount]);

  // Get number of card pairs based on difficulty

  // Shuffle cards using Fisher-Yates algorithm
  const shuffleCards = (cardsArray: CardType[]) => {
    const shuffled = [...cardsArray];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Handle card click
  const handleCardClick = (id: number) => {
    // Start the game on first card click
    if (!gameStarted && !gameCompleted) {
      setGameStarted(true);
    }

    // Ignore click if game is completed or card is already flipped/matched
    if (gameCompleted || flippedCards.length >= 2) return;

    const clickedCard = cards.find((card) => card.id === id);
    if (!clickedCard || clickedCard.flipped || clickedCard.matched) return;

    // Flip the card
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Update cards state to show the flipped card
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, flipped: true } : card
      )
    );

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setMoves((prevMoves) => prevMoves + 1);

      const firstCard = cards.find((card) => card.id === newFlippedCards[0]);
      const secondCard = cards.find((card) => card.id === newFlippedCards[1]);

      if (firstCard && secondCard && firstCard.imageId === secondCard.imageId) {
        // Match found
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, matched: true }
                : card
            )
          );
          setFlippedCards([]);
          setMatchedPairs((prev) => prev + 1);
          playMatchSound();
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === newFlippedCards[0] || card.id === newFlippedCards[1]
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Play a sound when a match is found
  const playMatchSound = () => {
    // In a real implementation, you would play a sound here
    // For now, we'll just log it
    console.log("Match found!");
  };

  // Celebrate win with confetti
  const celebrateWin = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Reset the game
  const resetGame = () => {
    initializeGame();
    setGameStarted(false);
  };

  // Get grid columns based on difficulty
  const getGridColumns = () => {
    switch (difficulty) {
      case "easy":
        return "grid-cols-2 sm:grid-cols-4";
      case "medium":
        return "grid-cols-3 sm:grid-cols-4";
      case "hard":
        return "grid-cols-4";
      default:
        return "grid-cols-2 sm:grid-cols-4";
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full p-6 bg-white rounded-lg shadow-lg border">
        {/* Game stats */}
        <div className="flex justify-between mb-4 text-lg font-semibold">
          <div>Moves: {moves}</div>
          <div>Time: {formatTime(time)}</div>
        </div>

        {/* Difficulty selector */}
        <div className="flex justify-center gap-2 mb-4">
          <Button
            variant={difficulty === "easy" ? "default" : "outline"}
            onClick={() => setDifficulty("easy")}
            disabled={gameStarted}
            size="sm"
          >
            Easy
          </Button>
          <Button
            variant={difficulty === "medium" ? "default" : "outline"}
            onClick={() => setDifficulty("medium")}
            disabled={gameStarted}
            size="sm"
          >
            Medium
          </Button>
          <Button
            variant={difficulty === "hard" ? "default" : "outline"}
            onClick={() => setDifficulty("hard")}
            disabled={gameStarted}
            size="sm"
          >
            Hard
          </Button>
        </div>

        {/* Cards grid */}
        <div className={`grid ${getGridColumns()} gap-2 mb-4`}>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="aspect-square"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="relative w-full h-full">
                {/* Card back */}
                <div
                  className={`absolute w-full h-full flex items-center justify-center 
                  bg-yellow-400 border-2 border-yellow-600 rounded-lg text-3xl 
                  ${card.flipped || card.matched ? "opacity-0" : "opacity-100"} 
                  transition-opacity duration-300 cursor-pointer`}
                >
                  ?
                </div>

                {/* Card front */}
                <div
                  className={`absolute w-full h-full flex items-center justify-center 
                  bg-white border-2 ${
                    card.matched ? "border-green-500" : "border-gray-300"
                  } 
                  rounded-lg text-4xl transform rotateY-180 
                  ${card.flipped || card.matched ? "opacity-100" : "opacity-0"} 
                  transition-opacity duration-300`}
                >
                  {card.imageId}
                  {card.matched && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-green-500 opacity-50" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Game completed message */}
        {gameCompleted && (
          <div className="text-center mb-4 p-3 bg-green-100 rounded-lg">
            <h3 className="text-xl font-bold text-green-700">Great job! 🎉</h3>
            <p className="text-green-600">
              You completed the game in {moves} moves and {formatTime(time)}!
            </p>
          </div>
        )}

        {/* Game controls */}
        <div className="flex justify-center">
          <Button
            variant="default"
            onClick={resetGame}
            className="bg-black hover:bg-gray-800 text-white"
          >
            {gameStarted ? "Stop Game" : "New Game"}
          </Button>
        </div>
      </div>

      {/* Game benefits information */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md w-full">
        <h2 className="text-xl font-bold mb-2 text-slate-800">
          Benefits for Children with ADHD
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Enhances focus and attention span</li>
          <li>Improves visual and spatial memory</li>
          <li>Develops cognitive processing speed</li>
          <li>Strengthens executive functions</li>
          <li>Provides immediate feedback and rewards</li>
        </ul>
      </div>
    </div>
  );
}
