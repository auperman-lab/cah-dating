import './App.css';
import PlayPage from "./pages/PlayPage.tsx"
import {Rank, Suit} from "./components/Card.tsx";
import {useState} from "react";
import rawEnemyCardData from "./data/enemyCards.json"
import rawCardData from "./data/cards.json"


interface CardData {
  id: string
  suit: Suit;
  rank: Rank;
  faceUp?: boolean;
}

function App() {
  const [cards] = useState<CardData[]>(rawCardData as CardData[]);
  const [enemyCards] = useState<CardData[]>(rawEnemyCardData as CardData[]);

  const users = [
    {
      id: 1,
      name: 'John Doe',
      cards: cards,
      isCurrentUser: true,
    }, {
      id: 2,
      name: 'John Doe',
      cards: enemyCards
    },
    {
      id: 7,
      name: 'John Doe',
      cards: enemyCards
    },
    {
      id: 6,
      name: 'John Doe',
      cards: enemyCards
    },
    {
      id: 3,
      name: 'John Doe',
      cards: enemyCards
    }
    ,
    {
      id: 4,
      name: 'John Doe',
      cards: enemyCards
    },
    {
      id: 5,
      name: 'John Doe',
      cards: enemyCards
    }
  ]


  return (
    <div className="w-[100%] h-screen relative">
      <PlayPage users={users}></PlayPage>

      {/*<DndContext collisionDetection={pointerWithin} onDragEnd={handleDragEnd} sensors={sensors}>*/}


      {/*  <CardDropZone id="zone-1" cardContainerProp={cards} w={80} h={20} y={70} x={10} radius={80}/>*/}

      {/*  {playerZones.slice(0, numPlayers).map((zone, idx) => (*/}
      {/*    <CardDropZone*/}
      {/*      key={`zone-${idx}`}*/}
      {/*      id={`zone-${idx}`}*/}
      {/*      cardContainerProp={enemyCards}*/}
      {/*      w={20}*/}
      {/*      h={20}*/}
      {/*      x={zone.x}*/}
      {/*      y={zone.y}*/}
      {/*      angle={zone.angle}*/}
      {/*      radius={20}*/}
      {/*    />*/}
      {/*  ))}*/}


      {/*</DndContext>*/}
    </div>
  );
}

export default App;
