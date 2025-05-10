import React, {useEffect, useState} from "react";
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
  radius: number;
}

const CardContainer: React.FC<CardContainerProps> = ({ cardProp, index, total, radius }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: cardProp.id,
    data: {
      type: "card",
    },
  });

  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const scale = isHovered ? 1.1 : 1;

  const dragX = transform?.x ?? 0;
  const dragY = transform?.y ?? 0;

  const middle = (total - 1) / 2;
  const angle = (index - middle) * 3; // this is your angular spread

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // larger radius = flatter curve
  const r = radius * windowWidth * 0.01;

  const rad = (angle * Math.PI) / 180;

  const offsetX = r * Math.sin(rad);
  const offsetY = r * (1 - Math.cos(rad));

  // console.log("r", r);
  // console.log("radius", radius);
  // console.log("width", window.screen.width);

  const style: React.CSSProperties = {
    position: "absolute",
    transform: `translate(${dragX+offsetX}px, ${dragY + offsetY}px) rotate(${angle}deg) scale(${scale})`,
    left: `38%`,
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
