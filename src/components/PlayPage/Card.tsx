import React from "react";
import {CardData, Suit} from "../../types/Card.ts";


const suitSymbols: Record<Suit, string> = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};
interface CardProp {
  card: CardData
}



const Card: React.FC<CardProp> = ({card}) => {

  return (
    <div className={`w-24 h-36 border rounded-lg shadow-md p-2 flex flex-col items-center justify-between text-xl cursor-pointer
      ${card.faceUp ? "bg-white text-black" : "bg-black text-white"}`}>
      {card.faceUp ? (
        <>
          <div className="self-start">{card.rank}</div>
          <div className="text-3xl">{suitSymbols[card.suit]}</div>
          <div className="self-end rotate-180">{card.rank}</div>
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
