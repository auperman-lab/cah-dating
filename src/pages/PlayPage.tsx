import styles from './PlayPage.module.scss';
import React, {useState} from "react";
import {Rank, Suit} from "../components/Card.tsx";
import CardDropZone from "../components/CardDropZone";
import {DndContext, DragEndEvent, pointerWithin} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";

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

    if (active.id === over?.id) return;

    setCards((card) => {
      const originalPos = getCardPos(active.id as string);
      const newPos = getCardPos(over?.id as string);

      return arrayMove(card, originalPos, newPos);
    });
  };

  splitPlayers(players);

  return (
    <div className={styles.PlayPageWrap}>
      <div className={styles.playersColumn}>
        {left.map(player => (
          <div key={player.id} className={styles.playerWrapColumn}>
            <CardDropZone player={player} angle={90} />
          </div>
          ))}
      </div>
      <div className={styles.tableColumn}>
        <div className={styles.playerblock}>
          {top.map(player => (
            <div key={player.id} className={styles.playerWrap}>
              <CardDropZone   player={player}></CardDropZone>
            </div>
            ))}
        </div>
        <div className={styles.table}></div>
        <div className={styles.userblock}>
          {currentUser && <div className={styles.userWrap}>
            <DndContext collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>
              <CardDropZone player={currentUser}></CardDropZone>
            </DndContext>
          </div>}
        </div>
      </div>
      <div className={styles.playersColumn}>
        {right.map(player => (
          <div key={player.id} className={styles.playerWrapColumn}>
            <CardDropZone player={player} angle={-90} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayPage;