import Card, { Rank, Suit } from "../Card.tsx";
import React from "react";

interface CardData {
  id: string;
  suit: Suit;
  rank: Rank;
  faceUp?: boolean;
}

interface TableCardDeckContainerProps {
  deck: CardData[];
  faceUp?: boolean

}

const TableCardDeckContainer: React.FC<TableCardDeckContainerProps> = ({ deck, faceUp = false }) => {
  const maxOffsetX = 15;
  const maxOffsetY = 5;
  const stepX = 3;
  const stepY = 1;

  return (
    <div className="w-full my-4  h-full flex justify-center items-center relative">
      {deck.map((card, index) => (
        <div
          key={card.id}
          className={"absolute"}
          style={{
            left: `${Math.min(index * stepX, maxOffsetX)}px`,
            top: `${Math.min(index * stepY, maxOffsetY)}px`,
            transform: `rotate(${!faceUp ? '0deg' : Math.random() * 40}deg)`,
          }}
        >
          <Card
            suit={card.suit}
            rank={card.rank}
            faceUp={faceUp}
          />

        </div>
      ))}
    </div>
  );
};

export default TableCardDeckContainer;
