import React from "react";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import CardContainer from "./CardContainer.tsx";
import {Rank, Suit} from "./Card.tsx";

interface CardDropZoneProps {
  id: string;
  cardContainerProp: {
    id: string
    suit: Suit;
    rank: Rank;
    faceUp?: boolean;
  }[];
  x?: number;
  y?: number;
  w: number;
  h: number;
}

const CardDropZone: React.FC<CardDropZoneProps> = ({ cardContainerProp, w, h, x = 0, y = 0 }) => {



  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: `${w}%`,
        height: `${h}%`,
      }}
      className="bg-gray-400 rounded-lg shadow-lg p-[20px]"
    >
      <SortableContext items={cardContainerProp} strategy={horizontalListSortingStrategy}>
        {cardContainerProp.map((card, index) => {

          return (
            <CardContainer
              key={card.id}
              cardProp={card}
              index={index}
              total={cardContainerProp.length}

            />
          );
        })}
      </SortableContext>
    </div>
  );
};

export default CardDropZone;
