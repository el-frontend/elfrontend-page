"use client"

import { cn } from "@/lib/utils"

interface WordleKeyboardProps {
  onKeyPress: (key: string) => void
  usedKeys: { [key: string]: string }
}

export default function WordleKeyboard({ onKeyPress, usedKeys }: WordleKeyboardProps) {
  const keys1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]
  const keys2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"]
  const keys3 = ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"]

  const getKeyClass = (key: string) => {
    if (key === "enter" || key === "backspace") {
      return "bg-gray-300 text-black"
    }

    const status = usedKeys[key]
    if (status === "correct") {
      return "bg-green-500 text-white"
    }
    if (status === "present") {
      return "bg-yellow-500 text-white"
    }
    if (status === "absent") {
      return "bg-gray-500 text-white"
    }

    return "bg-gray-300 text-black"
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-center gap-1 mb-1">
        {keys1.map((key) => (
          <button
            key={key}
            onClick={() => onKeyPress(key)}
            className={cn(
              "w-8 h-10 sm:w-10 sm:h-12 rounded font-bold uppercase flex items-center justify-center",
              getKeyClass(key),
            )}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-1 mb-1 px-4">
        {keys2.map((key) => (
          <button
            key={key}
            onClick={() => onKeyPress(key)}
            className={cn(
              "w-8 h-10 sm:w-10 sm:h-12 rounded font-bold uppercase flex items-center justify-center",
              getKeyClass(key),
            )}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-1">
        {keys3.map((key) => {
          let width = "w-8 sm:w-10"
          let content = key

          if (key === "enter") {
            width = "w-14 sm:w-16"
            content = "Enter"
          } else if (key === "backspace") {
            width = "w-14 sm:w-16"
            content = "⌫"
          }

          return (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={cn(
                `${width} h-10 sm:h-12 rounded font-bold flex items-center justify-center`,
                getKeyClass(key),
              )}
            >
              {content}
            </button>
          )
        })}
      </div>
    </div>
  )
}
