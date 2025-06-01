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

  const players = [
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

  const currentPlayer ={
    id: 1,
    name: 'John Doe',
    cards: cards,
    isCurrentUser: true,
  }


  return (
    <div className="w-[100%] h-screen relative">
      <PlayPage players={players} currentPlayer={currentPlayer }></PlayPage>
    </div>
  );
}

export default App;
