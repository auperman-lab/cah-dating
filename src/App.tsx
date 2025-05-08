import './App.css';
import {DndContext, pointerWithin} from '@dnd-kit/core';
import CardContainer from "./components/CardContainer";
import CardDropZone from "./components/CardDropZone.tsx";
import {Suit, Rank} from "./components/Card.tsx"

interface CardData {
  suit: Suit;
  rank: Rank;
  faceUp?: boolean;
}

function App() {
  const cards:CardData[]= ([
    { suit: "hearts", rank: "A" },
    { suit: "spades", rank: "K" },
  ]);


  return (
    <div className="relative w-screen h-screen">
      <DndContext collisionDetection={pointerWithin}>

        {cards.map((card:CardData) => (
          <CardContainer key={`${card.rank}-${card.suit}`} cardProp={card}/>
        ))}


        <CardDropZone id="zone-1" >
        </CardDropZone >

        <CardDropZone id="zone-2" >
        </CardDropZone >


      </DndContext>
    </div>
  );
}

export default App;
