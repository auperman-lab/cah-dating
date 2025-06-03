import React, {useState} from "react";
import {Rank, Suit} from "../Card.tsx";
import Card from "../Card.tsx";
import {useDraggable} from "@dnd-kit/core";


interface CardData {
  id: string
  suit: Suit;
  rank: Rank;
  faceUp?: boolean;
}

interface CardContainerProps {
  cardProp: CardData;
  index: number;
  total: number;
  parentWidth: number; // New prop for parent container width

}

const CardPlayerContainer: React.FC<CardContainerProps> = ({ cardProp, index, total, parentWidth }) => {


  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: cardProp.id,
    data: {
      type: "card",
      card: cardProp,
      source: "player-hand", // Indicate where the card came from
    },
  });

  const [isHovered, setIsHovered] = useState(false);

  const scale = isHovered ? 1.1 : 1;
  const dragX = transform?.x ?? 0;
  const dragY = transform?.y ?? 0;
  const middle = (total - 1) / 2;
  const angle = (index - middle) * 3; // this is your angular spread
  // larger radius = parentWidth  = flatter curve
  const rad = (angle * Math.PI) / 180;

  const offsetX = parentWidth * Math.sin(rad);
  const offsetY = parentWidth * (1 - Math.cos(rad));



  const style: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "40%",
    transform: `translate(-50%, -50%) translate(${dragX + offsetX}px, ${dragY + offsetY}px) rotate(${angle}deg) scale(${scale})`,
    transformOrigin: "bottom center",
    transition: "transform 300ms ease",
    zIndex: isHovered ? 1 : 1,
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

export default CardPlayerContainer;
