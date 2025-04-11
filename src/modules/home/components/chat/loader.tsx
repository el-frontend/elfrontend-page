"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface DegradingTextLoaderProps {
  text?: string
  className?: string
  speed?: number
  loop?: boolean
}

export function ChatLoader({
  text = "Loading",
  className,
  speed = 100,
  loop = true,
}: DegradingTextLoaderProps) {
  const [characters, setCharacters] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isReversing, setIsReversing] = useState(false)

  useEffect(() => {
    setCharacters(text.split(""))
  }, [text])

  useEffect(() => {
    if (characters.length === 0) return

    const timer = setTimeout(() => {
      if (!isReversing) {
        if (currentIndex < characters.length) {
          setCurrentIndex(currentIndex + 1)
        } else if (loop) {
          setIsComplete(true)
          setTimeout(() => {
            setIsReversing(true)
          }, speed * 3)
        }
      } else {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1)
        } else {
          setIsReversing(false)
          setIsComplete(false)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [characters, currentIndex, speed, loop, isReversing])

  return (
    <div className={cn("flex items-center justify-center", className)} aria-label={`${text} loading animation`}>
      <div className="flex overflow-hidden">
        {characters.map((char, index) => (
          <span
            key={index}
            className={cn(
              "transition-all duration-500",
              index < currentIndex ? "opacity-100" : "opacity-0",
              isComplete && "opacity-90",
              index < currentIndex - 3
                ? "blur-[0.5px] text-muted-foreground"
                : index < currentIndex - 2
                  ? "blur-[1px] text-muted-foreground/80"
                  : index < currentIndex - 1
                    ? "blur-[1.5px] text-muted-foreground/70"
                    : "",
            )}
            style={{
              transform: index < currentIndex - 3 ? `translateY(${(index % 2) * 1}px)` : "none",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  )
}
