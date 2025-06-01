import {useDroppable} from "@dnd-kit/core";
import {Rank, Suit} from "./Card.tsx";
import React, {useEffect, useState} from "react";
import TableCardContainer from "./TableCardContainer.tsx";

interface CardData {
  id: string
  suit: Suit;
  rank: Rank;
  faceUp?: boolean;
}

interface PositionedCard extends CardData {
  x: number;
  y: number;
}




interface TableZoneProps {
  droppedCards: CardData[];
}

const TableZone:React.FC<TableZoneProps> =({droppedCards}) =>{

  const { setNodeRef } = useDroppable({
    id: "table-zone",
  });

  const [positionedCards, setPositionedCards] = useState<PositionedCard[]>([]);

  useEffect(() => {
    setPositionedCards((prev) => {
      const existingIds = new Set(prev.map((c) => c.id));
      const newCards = droppedCards.filter(c => !existingIds.has(c.id));

      const newPositioned = newCards.map((card) => ({
        ...card,
        x: Math.random() * 400,
        y: Math.random() * 400,
      }));

      return [...prev, ...newPositioned];
    });
  }, [droppedCards]);

  return (
    <div className={"w-full h-full flex justify-center items-center mx-10 my-auto "}
         ref={setNodeRef}
    >
      <div className="w-[80%] h-[100%] relative border">
        {positionedCards.map((card) =>{
          return (
            <TableCardContainer  key={card.id} cardProp={card} x={card.x!} y={card.y!}/>
        )}
        )}
      </div>
      <div ></div>
    </div>

  );
}

export default TableZone;