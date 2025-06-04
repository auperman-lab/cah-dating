import {createContext, useContext, useEffect, ReactNode, useState} from "react";
import fulldeck from "../data/deck.ts";
import {CardData} from "../types/Card.ts";

interface DeckContextType {
  deck: CardData[];
  giveCard: (callback: (card: CardData | null) => void) => void;
  shuffleDeck: () => void;
  resetDeck: () => void;
}

const DeckContext = createContext<DeckContextType | undefined>(undefined);

const DECK_STORAGE_KEY = "deck";


interface DeckProviderProps {
  children: ReactNode;
}

export const DeckProvider = ({ children }: DeckProviderProps) => {

  const [deck, setDeck] = useState<CardData[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(DECK_STORAGE_KEY);
    if (stored && JSON.parse(stored) === null) {
      setDeck(JSON.parse(stored));
    } else {
      console.log("heuououoeoue")
      const shuffled = [...fulldeck].sort(() => Math.random() - 0.5);
      setDeck(shuffled as CardData[]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck));
  }, [deck]);

  const giveCard = (callback: (card: CardData | null) => void) => {
    setDeck(prevDeck => {
      if (prevDeck.length === 0) {
        callback(null);
        return prevDeck;
      }

      const [card, ...rest] = prevDeck;
      callback(card);
      return rest;
    });
  };
  const shuffleDeck = () => {
    setDeck(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  const resetDeck = () => {
    const shuffled = [...fulldeck].sort(() => Math.random() - 0.5);
    setDeck(shuffled as CardData[]);
  };
  return (
    <DeckContext.Provider value={{ deck, giveCard, shuffleDeck, resetDeck }}>
      {children}
    </DeckContext.Provider>
  );
};

export const useDeck = (): DeckContextType => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDeck must be used within a DeckProvider");
  }
  return context;
};
