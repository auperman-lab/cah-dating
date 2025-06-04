import styles from './PlayPage.module.scss';
import { useState} from "react";
import CardPlayerZone from "../components/PlayPage/Player/CardPlayerZone.tsx";
import {DndContext, DragEndEvent, pointerWithin} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import TableZone from "../components/PlayPage/Table/TableZone.tsx";
import {CardData} from "../types/Card.ts";
import {usePlayer} from "../context/PlayerContext.tsx";
import {useEnemies} from "../context/EnemiesContext.tsx";


const PlayPage = () => {

  const [tableCards, setTableCards] = useState<CardData[]>([]);
  const { player, setPlayer } = usePlayer();
  const { enemies } = useEnemies();


  const getCardPos = (id: string) => player.hand.findIndex((card) => card.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;


    if (active && over && over.id === "table-zone") {
      const cardId = active.id;
      const cardIndex = getCardPos(cardId as string);

      if (cardIndex !== -1) {
        const cardToMove = player.hand[cardIndex];
        setPlayer(prev => ({
          ...prev,
          hand: prev.hand.filter(card => card.id !== cardId)
        }));
        setTableCards((prevTableCards) => [...prevTableCards, cardToMove]);
        return;
      }

      if (active.id !== over?.id && over) {
        setPlayer(prev => {
          const originalPos = getCardPos(active.id as string);
          const newPos = getCardPos(over?.id as string);
          return {
            ...prev,
            hand: arrayMove(prev.hand, originalPos, newPos)
          };
        });
      }
    }
  }

  return (
    <DndContext collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>

    <div className={styles.PlayPageWrap}>
      <div className={styles.playersColumn}>
        {enemies
          .filter(enemy => enemy.position === "left")
          .map(enemy => (
            <div key={enemy.id} className={styles.playerWrapColumn}>
              <CardPlayerZone cards={enemy.hand} angle={90} />
            </div>
          ))}
      </div>
      <div className={styles.tableColumn}>
        <div className={styles.playerblock}>
          {enemies
            .filter(enemy => enemy.position === "top")
            .map(enemy => (
              <div key={enemy.id} className={styles.playerWrap}>
                <CardPlayerZone cards={enemy.hand}/>
              </div>
            ))}
        </div>
        <div className={styles.table}>
          <TableZone droppedCards={tableCards}/>
        </div>
        <div className={styles.userblock}>
          {player && (
            <div className={styles.userWrap}>
              <CardPlayerZone cards={player.hand} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.playersColumn}>
        {enemies
          .filter(enemy => enemy.position === "right")
          .map(enemy => (
            <div key={enemy.id} className={styles.playerWrapColumn}>
              <CardPlayerZone cards={enemy.hand} angle={-90} />
            </div>
          ))}
      </div>
    </div>
    </DndContext>

  );
};

export default PlayPage;