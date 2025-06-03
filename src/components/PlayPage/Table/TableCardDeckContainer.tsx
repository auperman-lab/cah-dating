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
}

const TableCardDeckContainer: React.FC<TableCardDeckContainerProps> = ({ deck }) => {
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
          }}
        >
          <Card
            suit={card.suit}
            rank={card.rank}
            faceUp={false}
          />

        </div>
      ))}
    </div>
  );
};

export default TableCardDeckContainer;
