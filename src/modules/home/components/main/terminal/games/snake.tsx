"use client";

import { Button } from "@/components/ui/button";
import {
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    DoorOpen,
    Pause,
    Play,
    RefreshCw,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useWindowSize } from "usehooks-ts";

// Game constants
const GRID_SIZE = 20;
const GAME_SPEED = 100;
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

interface SnakeGameProps {
  onExit: () => void;
}

export default function SnakeGame({ onExit }: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [nextDirection, setNextDirection] = useState(DIRECTIONS.RIGHT);

  const { width } = useWindowSize();

  // Initialize canvas and game
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load high score from localStorage
      const savedHighScore = localStorage.getItem("snakeHighScore");
      if (savedHighScore) {
        setHighScore(Number.parseInt(savedHighScore));
      }
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size based on parent container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        const size = Math.min(
          container.clientWidth,
          width > 400 ? width - 40 : 450
        );
        canvas.width = size;
        canvas.height = size;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || paused) return;

    const gameLoop = setInterval(() => {
      moveSnake();
    }, GAME_SPEED);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, paused, snake, food, direction, nextDirection]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;

    // Clear canvas
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines (subtle)
    ctx.strokeStyle = "#333333";
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Draw food
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#F0DB4F";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("JS", food.x * cellSize + 10, food.y * cellSize + 10);
    ctx.beginPath();
    
    ctx.fill();

    // Draw snake
    snake.forEach((segment, index) => {
      // Head is a different color
      if (index === 0) {
        ctx.fillStyle = "#4ADE80";
      } else {
        // Gradient from head to tail
        const greenValue = Math.max(80 - index * 3, 40);
        ctx.fillStyle = `rgb(74, ${greenValue + 100}, 80)`;
      }

      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize,
        cellSize
      );

      // Add eyes to the head
      if (index === 0) {
        ctx.fillStyle = "#000";

        // Position eyes based on direction
        const eyeSize = cellSize / 8;

        let leftEyeX = 0,
          leftEyeY = 0,
          rightEyeX = 0,
          rightEyeY = 0;

        if (direction === DIRECTIONS.RIGHT) {
          leftEyeX = (segment.x + 0.75) * cellSize;
          leftEyeY = (segment.y + 0.25) * cellSize;
          rightEyeX = (segment.x + 0.75) * cellSize;
          rightEyeY = (segment.y + 0.75) * cellSize;
        } else if (direction === DIRECTIONS.LEFT) {
          leftEyeX = (segment.x + 0.25) * cellSize;
          leftEyeY = (segment.y + 0.25) * cellSize;
          rightEyeX = (segment.x + 0.25) * cellSize;
          rightEyeY = (segment.y + 0.75) * cellSize;
        } else if (direction === DIRECTIONS.UP) {
          leftEyeX = (segment.x + 0.25) * cellSize;
          leftEyeY = (segment.y + 0.25) * cellSize;
          rightEyeX = (segment.x + 0.75) * cellSize;
          rightEyeY = (segment.y + 0.25) * cellSize;
        } else if (direction === DIRECTIONS.DOWN) {
          leftEyeX = (segment.x + 0.25) * cellSize;
          leftEyeY = (segment.y + 0.75) * cellSize;
          rightEyeX = (segment.x + 0.75) * cellSize;
          rightEyeY = (segment.y + 0.75) * cellSize;
        }

        ctx.beginPath();
        ctx.arc(leftEyeX, leftEyeY, eyeSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(rightEyeX, rightEyeY, eyeSize, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw game over screen
    if (gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ffffff";
      ctx.font = "24px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 20);

      ctx.font = "16px sans-serif";
      ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
      ctx.fillText(
        `High Score: ${highScore}`,
        canvas.width / 2,
        canvas.height / 2 + 35
      );
    }
  }, [snake, food, gameOver, score, highScore, direction]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted && !gameOver) {
        setGameStarted(true);
      }

      if (paused && e.key !== " ") return;

      switch (e.key) {
        case "ArrowUp":
          if (direction !== DIRECTIONS.DOWN) {
            setNextDirection(DIRECTIONS.UP);
          }
          break;
        case "ArrowDown":
          if (direction !== DIRECTIONS.UP) {
            setNextDirection(DIRECTIONS.DOWN);
          }
          break;
        case "ArrowLeft":
          if (direction !== DIRECTIONS.RIGHT) {
            setNextDirection(DIRECTIONS.LEFT);
          }
          break;
        case "ArrowRight":
          if (direction !== DIRECTIONS.LEFT) {
            setNextDirection(DIRECTIONS.RIGHT);
          }
          break;
        case " ":
          if (gameOver) {
            resetGame();
          } else {
            setPaused(!paused);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, gameOver, paused, direction]);

  // Move snake
  const moveSnake = () => {
    setDirection(nextDirection);

    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    head.x += nextDirection.x;
    head.y += nextDirection.y;

    // Check for collision with walls
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      handleGameOver();
      return;
    }

    // Check for collision with self
    for (let i = 0; i < newSnake.length; i++) {
      if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
        handleGameOver();
        return;
      }
    }

    // Add new head
    newSnake.unshift(head);

    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
      // Generate new food
      generateFood(newSnake);

      // Increase score
      const newScore = score + 10;
      setScore(newScore);

      // Update high score if needed
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("snakeHighScore", newScore.toString());
      }

      // Show toast for score milestones
      if (newScore % 50 === 0) {
        toast(`You've reached ${newScore} points!`);
      }
    } else {
      // Remove tail if no food was eaten
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  // Generate food at random position
  const generateFood = (currentSnake: { x: number; y: number }[]) => {
    let newFood;
    let foodOnSnake;

    do {
      foodOnSnake = false;
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };

      // Check if food is on snake
      for (const segment of currentSnake) {
        if (segment.x === newFood.x && segment.y === newFood.y) {
          foodOnSnake = true;
          break;
        }
      }
    } while (foodOnSnake);

    setFood(newFood);
  };

  // Handle game over
  const handleGameOver = () => {
    setGameOver(true);
    setGameStarted(false);

    // Update high score if needed
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("snakeHighScore", score.toString());
    }
  };

  // Reset game
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    generateFood([{ x: 10, y: 10 }]);
    setDirection(DIRECTIONS.RIGHT);
    setNextDirection(DIRECTIONS.RIGHT);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    setPaused(false);
  };

  // Handle direction button clicks
  const handleDirectionClick = (newDirection: typeof DIRECTIONS.UP) => {
    // Don't allow reversing direction
    if (
      (newDirection === DIRECTIONS.UP && direction !== DIRECTIONS.DOWN) ||
      (newDirection === DIRECTIONS.DOWN && direction !== DIRECTIONS.UP) ||
      (newDirection === DIRECTIONS.LEFT && direction !== DIRECTIONS.RIGHT) ||
      (newDirection === DIRECTIONS.RIGHT && direction !== DIRECTIONS.LEFT)
    ) {
      setNextDirection(newDirection);

      if (!gameStarted && !gameOver) {
        setGameStarted(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
        <div className="flex justify-between mb-2">
          <div className="text-white">Score: {score}</div>
          <div className="text-white">High Score: {highScore}</div>
        </div>

        <div className="relative border-4 border-gray-700 rounded">
          <canvas
            ref={canvasRef}
            className="block bg-gray-900"
            width={400}
            height={400}
          />

          {!gameStarted && !gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white">
              <h2 className="text-2xl font-bold mb-4">Snake Game</h2>
              <p className="mb-4">Use arrow keys or buttons to play</p>
              <Button
                onClick={() => setGameStarted(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                Start Game
              </Button>
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div></div>
          <Button
            variant="outline"
            className="p-2 text-primary"
            onClick={() => handleDirectionClick(DIRECTIONS.UP)}
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
          <div></div>

          <Button
            variant="outline"
            className="p-2 text-primary"
            onClick={() => handleDirectionClick(DIRECTIONS.LEFT)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            className="p-2 text-primary"
            onClick={() => {
              if (gameOver) {
                resetGame();
              } else {
                setPaused(!paused);
              }
            }}
          >
            {gameOver ? (
              <RefreshCw className="h-6 w-6" />
            ) : paused ? (
              <Play className="h-6 w-6" />
            ) : (
              <Pause className="h-6 w-6" />
            )}
          </Button>

          <Button
            variant="outline"
            className="p-2 text-primary"
            onClick={() => handleDirectionClick(DIRECTIONS.RIGHT)}
          >
            <ArrowRight className="h-6 w-6" />
          </Button>

          <div></div>
          <Button
            variant="outline"
            className="p-2 text-primary"
            onClick={() => handleDirectionClick(DIRECTIONS.DOWN)}
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
          <div></div>
          <div></div>
          <Button
            variant="outline"
            className="p-2 text-primary"
            onClick={() => onExit()}
          >
            <DoorOpen className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="text-primary text-sm max-w-md text-center">
        <h3 className="font-bold mb-2">How to Play:</h3>
        <p>
          Use the arrow keys or buttons to control the snake. Eat the JS food
          to grow longer and earn points. Avoid hitting the walls or yourself!
        </p>
        <p className="mt-2">
          Press Space or the center button to pause/resume the game.
        </p>
      </div>
    </div>
  );
}
