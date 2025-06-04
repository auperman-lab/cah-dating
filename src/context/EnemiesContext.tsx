// context/EnemiesContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Enemy } from "../types/Player.ts";
import { CardData } from "../types/Card";

const ENEMIES_STORAGE_KEY = "enemies-data";

interface EnemiesContextType {
  enemies: Enemy[];
  setEnemies: React.Dispatch<React.SetStateAction<Enemy[]>>;
  addCardToEnemy: (enemyId: number, card: CardData) => void;
}

const EnemiesContext = createContext<EnemiesContextType | undefined>(undefined);

export const EnemiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enemies, setEnemies] = useState<Enemy[]>(() => {
    const stored = localStorage.getItem(ENEMIES_STORAGE_KEY);
    return stored
      ? JSON.parse(stored)
      : [
        { id: 1, name: "Enemy 1", hand: [], position: "top"},
        { id: 2, name: "Enemy 2", hand: [], position: "top" },
        { id: 3, name: "Enemy 3", hand: [], position: "left" },
        { id: 4, name: "Enemy 4", hand: [], position: "left" },
        { id: 5, name: "Enemy 5", hand: [], position: "right" },
        { id: 6, name: "Enemy 6", hand: [], position: "right" },
      ];
  });

  useEffect(() => {
    localStorage.setItem(ENEMIES_STORAGE_KEY, JSON.stringify(enemies));
  }, [enemies]);

  const addCardToEnemy = (enemyId: number, card: CardData) => {
    setEnemies((prev) =>
      prev.map((enemy) =>
        enemy.id === enemyId ? { ...enemy, hand: [...enemy.hand, card] } : enemy
      )
    );
  };

  return (
    <EnemiesContext.Provider value={{ enemies, setEnemies, addCardToEnemy }}>
      {children}
    </EnemiesContext.Provider>
  );
};

export const useEnemies = () => {
  const context = useContext(EnemiesContext);
  if (!context) throw new Error("useEnemies must be used within EnemiesProvider");
  return context;
};
