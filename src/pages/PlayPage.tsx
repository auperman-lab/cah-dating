import styles from './PlayPage.module.scss';
import React from "react";

interface Player {
  id: number,
  name: string,
  cards: string[],
  isCurrentUser?: boolean,
}

interface Props {
  users: Player[]
}

const PlayPage: React.FC<Props> = ({ users }) => {

  const left: Player[] = [];
  const right: Player[] = [];
  const top: Player[] = [];
  let currentUser: Player | undefined; // It's possible there's no currentUser

  function splitPlayers(userArray:Player[]) {
    currentUser = userArray.find(user => user.isCurrentUser);
    const others = userArray.filter(user => !user.isCurrentUser);
    others.forEach((player, index) => {
      if (index % 3 === 0) left.push(player);
      else if (index % 3 === 1) right.push(player);
      else top.push(player);
    });
    console.log("left", left);
    console.log("right", right);
    console.log("top", top);
    console.log("currentUser", currentUser);
  }

  splitPlayers(users);

  return (
    <div className={styles.PlayPageWrap}>
      <div className={styles.playersColumn}>
        {left.map(player => (
          <div key={player.id} className={styles.playerWrapColumn}>{player.name}</div>
          ))}
      </div>
      <div className={styles.tableColumn}>
        <div className={styles.playerblock}>
          {top.map(player => (
            <div key={player.id} className={styles.playerWrap}>{player.name}</div>
            ))}
        </div>
        <div className={styles.table}></div>
        <div className={styles.userblock}>
          {currentUser && <div className={styles.userWrap}>{currentUser.name} (You)</div>} {/* Render currentUser */}
        </div>
      </div>
      <div className={styles.playersColumn}>
        {right.map(player => (
          <div key={player.id} className={styles.playerWrapColumn}>{player.name}</div>
        ))}
      </div>
    </div>
  );
};

export default PlayPage;