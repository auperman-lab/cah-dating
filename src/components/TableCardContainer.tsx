import React from "react";
import {Rank, Suit} from "./Card.tsx";
import Card from "./Card.tsx";
import {useDraggable} from "@dnd-kit/core";


interface CardData {
  id: string
  suit: Suit;
  rank: Rank;
  faceUp?: boolean;
}

interface CardContainerProps {
  cardProp: CardData;
  x: number;
  y: number;

}

const TableCardContainer: React.FC<CardContainerProps> = ({ cardProp,x,y }) => {


  const { attributes, listeners, setNodeRef } = useDraggable({
    id: cardProp.id,
    data: {
      type: "card",
      card: cardProp,
      source: "table-zone",
    },
  });

  const style: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    transition: "transform 300ms ease",
    cursor: "grab",
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Card suit={cardProp.suit} rank={cardProp.rank} faceUp={cardProp.faceUp} />
    </div>
  );
};

export default TableCardContainer;
