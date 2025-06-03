"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { CheckCircle, RotateCcw, Star, Trophy } from "lucide-react";

interface PuzzleCell {
  id: number;
  value: number | null;
  isFixed: boolean;
  isCorrect: boolean;
}

export default function NumberPuzzleGame() {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [puzzle, setPuzzle] = useState<PuzzleCell[]>([]);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completedPuzzles, setCompletedPuzzles] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  const gridSize = difficulty === "easy" ? 4 : difficulty === "medium" ? 6 : 9;

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameActive) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive]);

  // Generate a new puzzle
  const generatePuzzle = () => {
    const size = gridSize;
    const totalCells = size * size;
    const newPuzzle: PuzzleCell[] = [];

    // Create a simple number sequence puzzle
    const targetSequence = Array.from({ length: totalCells }, (_, i) => i + 1);

    // Determine how many cells to hide based on difficulty
    const hiddenCells =
      difficulty === "easy"
        ? Math.floor(totalCells * 0.3)
        : difficulty === "medium"
        ? Math.floor(totalCells * 0.5)
        : Math.floor(totalCells * 0.7);

    const hiddenIndices = new Set<number>();
    while (hiddenIndices.size < hiddenCells) {
      hiddenIndices.add(Math.floor(Math.random() * totalCells));
    }

    for (let i = 0; i < totalCells; i++) {
      newPuzzle.push({
        id: i,
        value: hiddenIndices.has(i) ? null : targetSequence[i],
        isFixed: !hiddenIndices.has(i),
        isCorrect: !hiddenIndices.has(i),
      });
    }

    setPuzzle(newPuzzle);
    setSelectedCell(null);
    setShowSuccess(false);
    setTimeElapsed(0);
    setIsGameActive(true);
  };

  // Start new game
  useEffect(() => {
    generatePuzzle();
  }, [difficulty]);

  // Handle cell input
  const handleCellInput = (cellId: number, value: string) => {
    const numValue = Number.parseInt(value);
    if (isNaN(numValue) || numValue < 1 || numValue > gridSize * gridSize)
      return;

    const newPuzzle = puzzle.map((cell) => {
      if (cell.id === cellId && !cell.isFixed) {
        const correctValue = cellId + 1;
        return {
          ...cell,
          value: numValue,
          isCorrect: numValue === correctValue,
        };
      }
      return cell;
    });

    setPuzzle(newPuzzle);

    // Check if puzzle is complete
    const isComplete = newPuzzle.every((cell) => cell.isCorrect);
    if (isComplete) {
      setShowSuccess(true);
      setIsGameActive(false);
      setCompletedPuzzles((prev) => prev + 1);
      setScore(
        (prev) =>
          prev +
          (difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30)
      );
    }
  };

  // Handle number pad input
  const handleNumberInput = (number: number) => {
    if (selectedCell !== null) {
      handleCellInput(selectedCell, number.toString());
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-purple-800">
              Number Sequence Puzzle
            </CardTitle>
            <p className="text-center text-gray-600">
              Complete the number sequence to boost numeracy and cognitive
              skills!
            </p>
          </CardHeader>
        </Card>

        {/* Stats and Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold text-purple-700">{score}</div>
              <div className="text-sm text-gray-600">Score</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-purple-700">
                {completedPuzzles}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-700">
                {formatTime(timeElapsed)}
              </div>
              <div className="text-sm text-gray-600">Time</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) =>
                    setDifficulty(e.target.value as "easy" | "medium" | "hard")
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="easy">Easy (4×4)</option>
                  <option value="medium">Medium (6×6)</option>
                  <option value="hard">Hard (9×9)</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h3 className="text-lg font-bold text-green-800">
                Puzzle Complete!
              </h3>
              <p className="text-green-700">
                Great job! You completed the sequence in{" "}
                {formatTime(timeElapsed)}.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Puzzle Grid */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  Fill in the missing numbers (1 to {gridSize * gridSize})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="grid gap-2 mx-auto"
                  style={{
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    maxWidth: `${gridSize * 60}px`,
                  }}
                >
                  {puzzle.map((cell) => (
                    <div
                      key={cell.id}
                      className={`
                aspect-square border-2 rounded-lg flex items-center justify-center text-lg font-bold cursor-pointer transition-all
                ${
                  cell.isFixed
                    ? "bg-purple-100 border-purple-300 text-purple-800"
                    : selectedCell === cell.id
                    ? "bg-blue-100 border-blue-400"
                    : cell.value && cell.isCorrect
                    ? "bg-green-100 border-green-300 text-green-800"
                    : cell.value && !cell.isCorrect
                    ? "bg-red-100 border-red-300 text-red-800"
                    : "bg-white border-gray-300 hover:border-blue-300"
                }
              `}
                      onClick={() => !cell.isFixed && setSelectedCell(cell.id)}
                    >
                      {cell.value || ""}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Number Pad and Controls */}
          <div className="space-y-4">
            {/* Number Pad */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Number Pad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 9 }, (_, i) => i + 1).map((number) => (
                    <Button
                      key={number}
                      variant="outline"
                      className="aspect-square text-lg font-bold hover:bg-purple-100"
                      onClick={() => handleNumberInput(number)}
                      disabled={selectedCell === null}
                    >
                      {number}
                    </Button>
                  ))}
                </div>
                {gridSize > 3 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {Array.from(
                      { length: gridSize * gridSize - 9 },
                      (_, i) => i + 10
                    ).map((number) => (
                      <Button
                        key={number}
                        variant="outline"
                        className="aspect-square text-lg font-bold hover:bg-purple-100"
                        onClick={() => handleNumberInput(number)}
                        disabled={selectedCell === null}
                      >
                        {number}
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Controls */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button
                  onClick={generatePuzzle}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  New Puzzle
                </Button>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Instructions:</strong>
                  </p>
                  <p>• Click on empty cells to select them</p>
                  <p>• Use the number pad to fill in missing numbers</p>
                  <p>• Complete the sequence from 1 to {gridSize * gridSize}</p>
                  <p>• Green cells are correct, red cells need fixing</p>
                </div>
              </CardContent>
            </Card>

            {/* Educational Benefits */}
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <h4 className="font-bold text-blue-800 mb-2">
                  Educational Benefits:
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Enhances numeracy skills</li>
                  <li>• Improves pattern recognition</li>
                  <li>• Develops spatial reasoning</li>
                  <li>• Boosts working memory</li>
                  <li>• Increases focus and attention</li>
                  <li>• Builds executive functioning</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
