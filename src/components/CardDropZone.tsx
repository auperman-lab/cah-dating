import React, {useEffect, useRef, useState} from "react";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import CardContainer from "./CardContainer.tsx";
import {Rank, Suit} from "./Card.tsx";

interface Player {
  id: number,
  name: string,
  cards: CardData[],
  isCurrentUser?: boolean,
}

interface CardData {
  id: string
  suit: Suit;
  rank: Rank;
  faceUp?: boolean;
}

interface CardDropZoneProps {
  player: Player;
  angle?: number;
}

const CardDropZone: React.FC<CardDropZoneProps> = ({ player, angle= null }) => {
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState<number>(0);
  const [parentHeight, setParentHeight] = useState<number>(0);

  useEffect(() => {
    function updateParentWidth() {
      if (dropZoneRef.current) {
        setParentWidth(dropZoneRef.current.offsetWidth);
        setParentHeight(dropZoneRef.current.offsetHeight);
        console.log(dropZoneRef.current.offsetWidth);
      }
    }

    setTimeout(updateParentWidth, 50);
    setTimeout(updateParentWidth, 50);
    window.addEventListener('resize', updateParentWidth);
    return () => {
      window.removeEventListener('resize', updateParentWidth);
    };
  }, []);

  console.log("angle", angle)

  return (
    <div
      ref={dropZoneRef}
      style={{
        position: "relative",
        width: `100%`,
        height: `100%`,
      }}
    >
      <div
        style={{
          ...(angle
            ? {
              width: `${parentHeight}px`,
              height: `${parentWidth}px`,
              transform: `rotate(${angle}deg)`,
              transformOrigin: "center",
              transformBox: "fill-box",
              position: "absolute",
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
            }
            : {}),
        }}
      >

        <SortableContext items={player.cards} strategy={horizontalListSortingStrategy}>
          {player.cards.map((card, index) => {

            return (
              <CardContainer
                key={card.id}
                cardProp={card}
                index={index}
                total={player.cards.length}
                parentWidth={angle ? parentHeight : parentWidth}
              />
            );
          })}
        </SortableContext>
      </div>
    </div>
  );
};

export default CardDropZone;
