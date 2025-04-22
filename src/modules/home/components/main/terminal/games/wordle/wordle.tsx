"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import WordleBoard from "./wordle-board";
import WordleKeyboard from "./wordle-keyboard";
import { WORDS } from "./words";

export default function Wordle() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState<string[]>(Array(6).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [usedKeys, setUsedKeys] = useState<{ [key: string]: string }>({});

  // Initialize the game with a random word
  useEffect(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setSolution(randomWord.toLowerCase());
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isGameOver) return;

      if (event.key === "Enter") {
        if (currentGuess.length !== 5) {
          toast.error("Word too short. Please enter a 5-letter word");
          return;
        }

        if (!WORDS.includes(currentGuess.toUpperCase())) {
          toast.error("Word not in word list. Please enter a valid word");
          return;
        }

        const newGuesses = [...guesses];
        newGuesses[currentRow] = currentGuess;
        setGuesses(newGuesses);
        setCurrentRow(currentRow + 1);

        // Check if the guess is correct
        if (currentGuess === solution) {
          toast.success(
            `You guessed the word in ${currentRow + 1} ${currentRow === 0 ? "try" : "tries"}!`
          );
          setIsGameOver(true);
        } else if (currentRow === 5) {
          toast.error(`The word was ${solution.toUpperCase()}`);
          setIsGameOver(true);
        }

        // Update used keys
        const solutionArray = [...solution];
        const formattedGuess = [...currentGuess].map((letter, i) => {
          if (solutionArray[i] === letter) {
            return { key: letter, color: "correct" };
          } else if (solutionArray.includes(letter)) {
            return { key: letter, color: "present" };
          } else {
            return { key: letter, color: "absent" };
          }
        });

        const newKeys = { ...usedKeys };
        formattedGuess.forEach(({ key, color }) => {
          const currentColor = newKeys[key];
          if (color === "correct") {
            newKeys[key] = "correct";
            return;
          }
          if (color === "present" && currentColor !== "correct") {
            newKeys[key] = "present";
            return;
          }
          if (color === "absent" && !currentColor) {
            newKeys[key] = "absent";
            return;
          }
        });
        setUsedKeys(newKeys);
        setCurrentGuess("");
      }

      if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      if (currentGuess.length >= 5) return;

      if (/^[A-Za-z]$/.test(event.key)) {
        setCurrentGuess((prev) => prev + event.key.toLowerCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, currentRow, guesses, isGameOver, solution, usedKeys]);

  // Handle virtual keyboard input
  const handleKeyPress = (key: string) => {
    if (isGameOver) return;

    if (key === "enter") {
      if (currentGuess.length !== 5) {
        toast.error("Word too short. Please enter a 5-letter word");
        return;
      }

      if (!WORDS.includes(currentGuess.toUpperCase())) {
        toast.error("Word not in word list. Please enter a valid word");
        return;
      }

      const newGuesses = [...guesses];
      newGuesses[currentRow] = currentGuess;
      setGuesses(newGuesses);
      setCurrentRow(currentRow + 1);

      // Check if the guess is correct
      if (currentGuess === solution) {
        toast.success(
          `You guessed the word in ${currentRow + 1} ${currentRow === 0 ? "try" : "tries"}!`
        );
        setIsGameOver(true);
      } else if (currentRow === 5) {
        toast.error(`The word was ${solution.toUpperCase()}`);
        setIsGameOver(true);
      }

      // Update used keys
      const solutionArray = [...solution];
      const formattedGuess = [...currentGuess].map((letter, i) => {
        if (solutionArray[i] === letter) {
          return { key: letter, color: "correct" };
        } else if (solutionArray.includes(letter)) {
          return { key: letter, color: "present" };
        } else {
          return { key: letter, color: "absent" };
        }
      });

      const newKeys = { ...usedKeys };
      formattedGuess.forEach(({ key, color }) => {
        const currentColor = newKeys[key];
        if (color === "correct") {
          newKeys[key] = "correct";
          return;
        }
        if (color === "present" && currentColor !== "correct") {
          newKeys[key] = "present";
          return;
        }
        if (color === "absent" && !currentColor) {
          newKeys[key] = "absent";
          return;
        }
      });
      setUsedKeys(newKeys);
      setCurrentGuess("");
    } else if (key === "backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  const resetGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setSolution(randomWord.toLowerCase());
    setGuesses(Array(6).fill(""));
    setCurrentGuess("");
    setIsGameOver(false);
    setCurrentRow(0);
    setUsedKeys({});
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <WordleBoard
        guesses={guesses}
        currentGuess={currentGuess}
        currentRow={currentRow}
        solution={solution}
      />
      <WordleKeyboard onKeyPress={handleKeyPress} usedKeys={usedKeys} />

      {isGameOver && (
        <Button
          onClick={resetGame}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Play Again
        </Button>
      )}
      
    </div>
  );
}
