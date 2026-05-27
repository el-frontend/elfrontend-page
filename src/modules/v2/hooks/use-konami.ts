"use client";

import { useEffect, useRef } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonami(onTrigger: () => void) {
  const handlerRef = useRef(onTrigger);

  useEffect(() => {
    handlerRef.current = onTrigger;
  }, [onTrigger]);

  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const expected = SEQUENCE[pos];
      const got = expected.length === 1 ? e.key.toLowerCase() : e.key;
      if (got === expected) {
        pos += 1;
        if (pos === SEQUENCE.length) {
          pos = 0;
          handlerRef.current();
        }
      } else {
        pos = got === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
