// context/PlayerContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Player } from "../types/Player.ts";
import { CardData } from "../types/Card";

const PLAYER_STORAGE_KEY = "player-data";

interface PlayerContextType {
  player: Player;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
  addCardToHand: (card: CardData) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [player, setPlayer] = useState<Player>(() => {
    // const stored = localStorage.getItem(PLAYER_STORAGE_KEY);
    return { id: 1, name: "Player 1", hand: [] };
  });

  useEffect(() => {
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(player));
  }, [player]);

  const addCardToHand = (card: CardData) => {
    setPlayer((prev) => {
      const alreadyInHand = prev.hand.some((c) => c.id === card.id);
      if (alreadyInHand) return prev;

      return { ...prev, hand: [...prev.hand, card] };
    });
  };

  return (
    <PlayerContext.Provider value={{ player, setPlayer, addCardToHand }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within PlayerProvider");
  return context;
};
