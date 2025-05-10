import './App.css';
import {
  DndContext,
  pointerWithin,
  DragEndEvent,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  useSensor
} from '@dnd-kit/core';
import CardDropZone from "./components/CardDropZone.tsx";
import {Suit, Rank} from "./components/Card.tsx"
import {arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {useState} from "react";

interface CardData {
  id: string
  suit: Suit;
  rank: Rank;
  faceUp?: boolean;
}

function App() {
  const [cards,setCards]= useState<CardData[]>([
    { suit: "hearts", rank: "A", id: "A-hearts" },
    { suit: "hearts", rank: "A", id: "A1-hearts" },
    { suit: "hearts", rank: "A", id: "A2-hearts" },
    { suit: "hearts", rank: "A", id: "A9-hearts" },
    { suit: "hearts", rank: "A", id: "A7-hearts" },
    { suit: "hearts", rank: "A", id: "A5-hearts" },
    { suit: "hearts", rank: "A", id: "A6-hearts" },
    { suit: "hearts", rank: "A", id: "A4-hearts" },
    { suit: "hearts", rank: "A", id: "A3-hearts" },
    { suit: "spades", rank: "K", id: "K-spades" },]);

  const getCardPos = (id:string) => cards.findIndex((card) => card.id === id);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) return;

    setCards((card) => {
      const originalPos = getCardPos(active.id as string);
      const newPos = getCardPos(over?.id as string);

      return arrayMove(card, originalPos, newPos);
    });
  };


  return (
    <div className="w-[100%] h-screen relative">
      <DndContext collisionDetection={pointerWithin} onDragEnd={handleDragEnd} sensors={sensors}>


        <CardDropZone id="zone-1" cardContainerProp={cards} w={80} h={20} y={70} x={10}/>

      </DndContext>
    </div>
  );
}

export default App;
