
import React from "react";
import {CardData} from "../../../types/Card.ts";
import Card from "../Card.tsx";


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
      {deck.map((card, index) => {
        const offsetX = Math.min(index * stepX, maxOffsetX);
        const offsetY = Math.min(index * stepY, maxOffsetY);
        const rotation = faceUp ? ((index % 2 === 0 ? 1 : -1) * (index % 10)) : 0;
          return (
            <div
              key={card.id}
              className="absolute transition-transform duration-200"
              style={{
                left: `${offsetX}px`,
                top: `${offsetY}px`,
                transform: `rotate(${rotation}deg)`,
                zIndex: index,
              }}
            >
              <Card card={{ ...card, faceUp }} />
            </div>
          );
      })}
      </div>
  );
};

export default TableCardDeckContainer;
