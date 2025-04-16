import './App.css';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import Card from "./components/Card";
import CardContainer from "./components/CardContainer";

function App() {
  const [cards, setCards] = useState([
    { id: 'card-1', x: 0, y: 0, suit: "hearts", rank: "A" },
    { id: 'card-2', x: 150, y: 0, suit: "spades", rank: "K" },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta, active } = event;
    setCards((prev) =>
      prev.map((card) =>
        card.id === active.id
          ? { ...card, x: card.x + delta.x, y: card.y + delta.y }
          : card
      )
    );
  };

  return (
    <div className="relative w-screen h-screen">
      <DndContext onDragEnd={handleDragEnd}>
        {cards.map((card) => (
          <CardContainer key={card.id} id={card.id} x={card.x} y={card.y}>
            <Card suit={card.suit} rank={card.rank} />
          </CardContainer>
        ))}
      </DndContext>
    </div>
  );
}

export default App;
