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
import rawCardData from './components/cards.json';
import rawEnemyCardData from './components/enemyCards.json';


interface CardData {
  id: string
  suit: Suit;
  rank: Rank;
  faceUp?: boolean;
}

function App() {
  const [cards,setCards]= useState<CardData[]>(rawCardData as CardData[]);
  const [enemyCards]= useState<CardData[]>(rawEnemyCardData as CardData[]);

  const [numPlayers] = useState(3);


  const playerZones = [
    { x: -5, y: 40, angle: 90  },
    { x: 85, y: 40, angle: -90},
    { x: 40, y: -10, angle: 180 },
    { x: 0, y: 5, angle: 135 },
    { x: 80, y: 5, angle: -135},
  ];


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


        <CardDropZone id="zone-1" cardContainerProp={cards} w={80} h={20} y={70} x={10} radius={80}/>

        {playerZones.slice(0, numPlayers).map((zone, idx) => (
          <CardDropZone
            key={`zone-${idx}`}
            id={`zone-${idx}`}
            cardContainerProp={enemyCards}
            w={20}
            h={20}
            x={zone.x}
            y={zone.y}
            angle={zone.angle}
            radius={20}
          />
        ))}


      </DndContext>
    </div>
  );
}

export default App;
