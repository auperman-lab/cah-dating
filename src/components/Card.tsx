// src/components/Card.tsx
import React, {useState} from "react";

export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

interface CardProps {
  suit: Suit;
  rank: Rank;
  faceUp?: boolean;
}

const suitSymbols: Record<Suit, string> = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

const Card: React.FC<CardProps> = ({ suit, rank, faceUp = true,  }) => {
  const [isFaceUp, setIsFaceUp] = useState(faceUp)

  const flipCard = ()=>{
    setIsFaceUp(prev => !prev);
  }

  return (
    <div
      className={`w-24 h-36 border rounded-lg shadow-md p-2 flex flex-col items-center justify-between text-xl cursor-pointer ${
        isFaceUp ? "bg-white text-black" : "bg-black text-white"
      }`}
      onClick={flipCard}
    >
      {isFaceUp ? (
        <>
          <div className="self-start">{rank}</div>
          <div className="text-3xl">{suitSymbols[suit]}</div>
          <div className="self-end rotate-180">{rank}</div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
          🂠
        </div>
      )}
    </div>
  );
};

export default Card;
