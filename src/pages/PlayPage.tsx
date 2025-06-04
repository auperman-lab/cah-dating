import styles from './PlayPage.module.scss';
import React, { useState} from "react";
import CardPlayerZone from "../components/PlayPage/Player/CardPlayerZone.tsx";
import {DndContext, DragEndEvent, pointerWithin} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import TableZone from "../components/PlayPage/Table/TableZone.tsx";
import {Player} from "../types/Player.ts";
import {CardData} from "../types/Card.ts";



interface Props {
  players: Player[]
  currentPlayer: Player
}

const PlayPage: React.FC<Props> = ({ players, currentPlayer }) => {

  const left: Player[] = [];
  const right: Player[] = [];
  const top: Player[] = [];
  let currentUser: Player = currentPlayer;
  const [cards, setCards] = useState<CardData[]>(currentPlayer.cards)
  const [tableCards, setTableCards] = useState<CardData[]>([]);

  const getCardPos = (id:string) => cards.findIndex((card) => card.id === id);


  function splitPlayers(userArray:Player[]) {
    const others = userArray.filter(user => !user.isCurrentUser);
    others.forEach((player, index) => {
      if (index % 3 === 0) top.push(player);
      else if (index % 3 === 1) right.push(player);
      else left.push(player);
    });
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;


    if (active && over && over.id === "table-zone") {
      const cardId = active.id;
      const cardIndex = getCardPos(cardId as string);

    if (cardIndex !== -1) {
       const cardToMove = cards[cardIndex];
          setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
          setTableCards((prevTableCards) => [...prevTableCards, cardToMove]);
      }
       return;
    }

    if (active.id !== over?.id && over) {
      setCards((cards) => {
          const originalPos = getCardPos(active.id as string);
          const newPos = getCardPos(over?.id as string);
          return arrayMove(cards, originalPos, newPos);
        });
       }
};

  splitPlayers(players);

  // useEffect(() => {
  //   console.log("deck", deck)
  // }, [deck]);

  return (
    <DndContext collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>

    <div className={styles.PlayPageWrap}>
      <div className={styles.playersColumn}>
        {left.map(player => (
          <div key={player.id} className={styles.playerWrapColumn}>
            <CardPlayerZone cards={player.cards} angle={90} />
          </div>
          ))}
      </div>
      <div className={styles.tableColumn}>
        <div className={styles.playerblock}>
          {top.map(player => (
            <div key={player.id} className={styles.playerWrap}>
              <CardPlayerZone cards={player.cards}></CardPlayerZone>
            </div>
            ))}
        </div>
        <div className={styles.table}>
          <TableZone droppedCards={tableCards}/>
        </div>
        <div className={styles.userblock}>
          {currentUser && <div className={styles.userWrap}>
            <CardPlayerZone cards={cards} />

          </div>}
        </div>
      </div>
      <div className={styles.playersColumn}>
        {right.map(player => (
          <div key={player.id} className={styles.playerWrapColumn}>
            <CardPlayerZone cards={player.cards} angle={-90} />
          </div>
        ))}
      </div>
    </div>
    </DndContext>

  );
};

export default PlayPage;