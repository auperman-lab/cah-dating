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
    <div className="w-[100%] h-screen relative">
      <DndContext collisionDetection={pointerWithin}>

        {cards.map((card:CardData) => (
          <CardContainer key={`${card.rank}-${card.suit}`} cardProp={card}/>
        ))}

        <CardDropZone id="zone-1" w={80} h={20} y={70} x={10}/>

      </DndContext>
    </div>
  );
}

export default App;
