import { cn } from "@/lib/utils"

interface WordleBoardProps {
  guesses: string[]
  currentGuess: string
  currentRow: number
  solution: string
}

export default function WordleBoard({ guesses, currentGuess, currentRow, solution }: WordleBoardProps) {
  return (
    <div className="grid grid-rows-6 gap-1 mb-4">
      {guesses.map((guess, i) => {
        // Current row with active typing
        if (i === currentRow && currentGuess) {
          const letters = currentGuess.split("")
          const remainingCells = Array(5 - letters.length).fill("")

          return (
            <div key={i} className="grid grid-cols-5 gap-1">
              {letters.map((letter, j) => (
                <div
                  key={j}
                  className="w-14 h-14 border-2 border-gray-400 flex items-center justify-center text-2xl font-bold uppercase"
                >
                  {letter}
                </div>
              ))}
              {remainingCells.map((_, j) => (
                <div
                  key={j + letters.length}
                  className="w-14 h-14 border-2 border-gray-300 flex items-center justify-center text-2xl font-bold"
                />
              ))}
            </div>
          )
        }

        // Completed row with a guess
        if (guess) {
          const solutionArray = [...solution]

          return (
            <div key={i} className="grid grid-cols-5 gap-1">
              {guess.split("").map((letter, j) => {
                let bgColor = "bg-gray-500" // absent
                const textColor = "text-white"
                let borderColor = "border-gray-500"

                if (solutionArray[j] === letter) {
                  bgColor = "bg-green-500" // correct
                  borderColor = "border-green-500"
                } else if (solutionArray.includes(letter)) {
                  bgColor = "bg-yellow-500" // present
                  borderColor = "border-yellow-500"
                }

                return (
                  <div
                    key={j}
                    className={cn(
                      "w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold uppercase transition-colors",
                      bgColor,
                      textColor,
                      borderColor,
                    )}
                  >
                    {letter}
                  </div>
                )
              })}
            </div>
          )
        }

        // Empty row
        return (
          <div key={i} className="grid grid-cols-5 gap-1">
            {Array(5)
              .fill(null)
              .map((_, j) => (
                <div
                  key={j}
                  className="w-14 h-14 border-2 border-gray-300 flex items-center justify-center text-2xl font-bold"
                />
              ))}
          </div>
        )
      })}
    </div>
  )
}
