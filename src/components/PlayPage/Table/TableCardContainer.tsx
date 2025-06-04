import React, {useEffect, useState} from "react";
import Card from "../Card.tsx";
import {useDraggable} from "@dnd-kit/core";
import {CardData} from "../../../types/Card.ts";

interface CardContainerProps {
  cardProp: CardData;
  x: number;
  y: number;
  startX?: number;
  startY?: number;
  animating?: boolean;
}

const TableCardContainer: React.FC<CardContainerProps> = ({ cardProp,x,y, animating, startX, startY }) => {


  const { attributes, listeners, setNodeRef } = useDraggable({
    id: cardProp.id,
    data: {
      type: "card",
      card: cardProp,
      source: "table-zone",
    },
  });
  const [animationDone, setAnimationDone] = useState(false);


  const style: React.CSSProperties = {
    position: "absolute",
    left: animationDone ? x : startX,
    top: animationDone ? y : startY,
    transform: animationDone ? `rotate(${Math.random() * 40}deg)` : "rotate(360deg)",
    transition: "left 0.6s ease, top 0.6s ease, transform 0.6s ease",
    cursor: "grab",
    touchAction: "none",
  };

  useEffect(() => {
    if (animating) {
      const timeout = setTimeout(() => setAnimationDone(true), 10);
      return () => clearTimeout(timeout);
    } else {
      setAnimationDone(true);
    }
  }, [animating]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Card card={cardProp}/>
    </div>
  );
};

export default TableCardContainer;
