"use client";

import { ComponentProps, useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export default function ReactConfettiComp({
  confettiDuration_ms,
  ...props
}: { confettiDuration_ms: number } & ComponentProps<typeof ReactConfetti>) {
  const [numberOfPieces, setNumberOfPieces] = useState(400);
  useEffect(() => {
    const timer = setTimeout(() => setNumberOfPieces(0), confettiDuration_ms);
    return () => clearTimeout(timer);
  }, [confettiDuration_ms]);
  return <ReactConfetti {...props} numberOfPieces={numberOfPieces} />;
}
