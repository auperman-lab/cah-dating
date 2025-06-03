import React, {useEffect, useRef, useState} from "react";
import CardPlayerContainer from "./CardPlayerContainer.tsx";
import {Rank, Suit} from "../Card.tsx";

interface CardData {
  id: string
  suit: Suit;
  rank: Rank;
  faceUp?: boolean;
}

interface Player {
  id: number,
  name: string,
  cards: CardData[],
  isCurrentUser?: boolean,
}



interface CardDropZoneProps {
  player: Player;
  cards: CardData[]
  angle?: number;
}

const CardPlayerZone: React.FC<CardDropZoneProps> = ({ player,cards, angle= null }) => {
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState<number>(0);
  const [parentHeight, setParentHeight] = useState<number>(0);

  useEffect(() => {
    function updateParentWidth() {
      if (dropZoneRef.current) {
        setParentWidth(dropZoneRef.current.offsetWidth);
        setParentHeight(dropZoneRef.current.offsetHeight);
      }
    }

    setTimeout(updateParentWidth, 50);
    setTimeout(updateParentWidth, 50);
    window.addEventListener('resize', updateParentWidth);
    return () => {
      window.removeEventListener('resize', updateParentWidth);
    };
  }, []);


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
          {cards.map((card, index) => {
            return (
              <CardPlayerContainer
                key={card.id}
                cardProp={card}
                index={index}
                total={cards.length}
                parentWidth={angle ? parentHeight : parentWidth}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CardPlayerZone;
