import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

interface CardContainerProps {
  id: string;
  x: number;
  y: number;
  children: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ id, x, y, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const [isHovered, setIsHovered] = useState(false);

  const scale = isHovered ? 1.1 : 1;

  const style: React.CSSProperties = {
    position: "absolute",
    transform: `translate(${x + (transform?.x || 0)}px, ${y + (transform?.y || 0)}px) scale(${scale})`,
    transition: "transform 0.2s ease",
    zIndex: isHovered ? 10 : "auto",
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
      {children}
    </div>
  );
};

export default CardContainer;
