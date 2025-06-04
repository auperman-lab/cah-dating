import {useDroppable} from "@dnd-kit/core";
import React, {useEffect, useRef, useState} from "react";
import TableCardContainer from "./TableCardContainer.tsx";
import TableCardDeckContainer from "./TableCardDeckContainer.tsx";
import {useDeck} from "../../../context/DeckContext.tsx";
import {CardData} from "../../../types/Card.ts";


interface PositionedCard extends CardData {
  x: number;
  y: number;
  startX: number;
  startY: number;
  animating: boolean;
}

interface TableZoneProps {
  droppedCards: CardData[];
}

const TableZone:React.FC<TableZoneProps> =({droppedCards}) =>{

  const { setNodeRef } = useDroppable({
    id: "table-zone",
  });

  const [positionedCards, setPositionedCards] = useState<PositionedCard[]>([]);
  const [throwDeck] = useState<CardData[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { deck } = useDeck();


  useEffect(() => {
    setPositionedCards((prev) => {
      const existingIds = new Set(prev.map((c) => c.id));
      const newCards = droppedCards.filter(c => !existingIds.has(c.id));

      const containerWidth = containerRef.current ? containerRef.current.clientWidth - 50 : 0;
      const containerHeight = containerRef.current ? containerRef.current.clientHeight - 100 : 0;


      const newPositioned = newCards.map((card) => {

        const startPos = containerRef.current
          ? {
            x: containerRef.current.clientWidth / 2,
            y: containerRef.current.clientHeight,
          }
          : { x: 0, y: 0 };

        return {
          ...card,
          startX: startPos.x,
          startY: startPos.y,
          x: Math.random() *  containerWidth,
          y: Math.random() *  containerHeight,
          animating: true,
        };
      });


      return [...prev, ...newPositioned];
    });
  }, [droppedCards]);

  return (
    <div className={"w-full h-full flex justify-center items-center "}
         ref={setNodeRef}
    >
      <div className={"w-[10%] "}></div>
      <div
        ref={containerRef}
        className="w-[60%] h-[100%]  relative "

      >
        {positionedCards.map((card) =>{
          return (
            <TableCardContainer
              key={card.id}
              cardProp={card}
              x={card.x!}
              y={card.y!}
              animating={card.animating!}
              startX={card.startX!}
              startY={card.startY!}
            />
          )}
        )}
      </div>

      <div className={"w-[20%] h-full   flex flex-col"}>
        <div className={"h-[15%] "}/>
        <TableCardDeckContainer deck={deck}/>
        <TableCardDeckContainer deck={throwDeck} faceUp={true}/>
        <div className={"h-[15%] "}/>


      </div>
    </div>

  );
}

export default TableZone;