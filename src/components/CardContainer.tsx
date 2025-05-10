import React, { useState} from "react";
import {Rank, Suit} from "./Card.tsx";
import Card from "./Card.tsx";
import {useSortable} from "@dnd-kit/sortable";

interface CardContainerProps {
  cardProp: {
    id: string;
    suit: Suit;
    rank: Rank;
    faceUp?: boolean;
  };
  index: number;
  total: number;
}

const CardContainer: React.FC<CardContainerProps> = ({ cardProp, index, total }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: cardProp.id,
    data: {
      type: "card",
    },
  });

  const [isHovered, setIsHovered] = useState(false);
  const scale = isHovered ? 1.1 : 1;

  const dragX = transform?.x ?? 0;
  const dragY = transform?.y ?? 0;

  const middle = (total - 1) / 2;
  const angle = (index - middle) * 3; // this is your angular spread
  const radius = 1200; // larger radius = flatter curve
  const rad = (angle * Math.PI) / 180;

  const offsetX = radius * Math.sin(rad);
  const offsetY = radius * (1 - Math.cos(rad));


  const style: React.CSSProperties = {
    position: "absolute",
    transform: `translate(${dragX+offsetX}px, ${dragY + offsetY}px) rotate(${angle}deg) scale(${scale})`,
    left: `45%`,
    transformOrigin: "bottom center",
    transition: "transform 300ms ease",
    zIndex: isHovered ? 10 : 1,
    cursor: "grab",
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...attributes}
      {...listeners}
    >
      <Card suit={cardProp.suit} rank={cardProp.rank} faceUp={cardProp.faceUp} />
    </div>
  );
};

export default CardContainer;
