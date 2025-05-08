import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface CardDropZoneProps {
  id: string;
  children?: React.ReactNode;
}

const CardDropZone: React.FC<CardDropZoneProps> = ({ id, children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      accepts: ["card"],
    },
  });


  return (
    <div
      ref={setNodeRef}
      className={`w-[300px] h-[400px] bg-blue flex items-center justify-center border-2 transition-all duration-200 mx-auto my-5 p-2 ${
        isOver ? "border-green-500 bg-green-50" : "border-gray-400 border-dashed"
      }`}
    >
      {children || "Drop cards here"}
    </div>
  );

};

export default CardDropZone;
