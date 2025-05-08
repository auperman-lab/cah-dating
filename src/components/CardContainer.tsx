import React, {useState} from "react";
import {useDndMonitor, useDraggable} from "@dnd-kit/core";
import {Rank, Suit} from "./Card.tsx";
import Card from "./Card.tsx";

interface CardContainerProps {
  x?: number;
  y?: number;
  cardProp: {
    suit: Suit;
    rank: Rank;
    faceUp?: boolean;
  };
}


const CardContainer: React.FC<CardContainerProps> = ({x = 0, y = 0, cardProp}) => {

  const id = `${cardProp.rank}-${cardProp.suit}`;

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id,
    data: {
      type: "card",
    },
  });
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: x, y: y });



  useDndMonitor({
    onDragEnd(event) {
      const { delta, active, over } = event;

      if (over && over.data.current?.accepts?.includes(active.data.current?.type)) {
        console.log(`${active.id} dropped in ${over.id}`);

      } else {
        console.log("drag event: ", delta, active, over);
      }


      if (event.active.id === id && event.delta) {
        setPosition((prev) => ({
          x: prev.x + event.delta.x,
          y: prev.y + event.delta.y,
        }));
      }
    },
  });

  const scale = isHovered ? 1.1 : 1;

  const style: React.CSSProperties = {
    position: "absolute",
    transform: `translate(${position.x + (transform?.x || 0)}px, ${position.y + (transform?.y || 0)}px) scale(${scale})`,
    transition: "transform 0.2s ease",
    zIndex: isHovered ? 10 : 1,
    cursor: "grab"

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
      <Card suit={cardProp.suit} rank={cardProp.rank} faceUp={cardProp.faceUp}/>
    </div>
  );
};

export default CardContainer;
