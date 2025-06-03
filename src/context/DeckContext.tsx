import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import fulldeck from "../data/deck.ts";
import { Rank, Suit } from "../components/PlayPage/Card.tsx";

// Type for a single card
export interface CardData {
  id: string;
  suit: Suit;
  rank: Rank;
  faceUp?: boolean;
}

// Reducer action types
type DeckAction =
  | { type: "INIT_DECK"; payload: CardData[] }
  | { type: "GIVE_CARD" }
  | { type: "SHUFFLE" }
  | { type: "RESET" };

// Context state
interface DeckContextType {
  deck: CardData[];
  giveCard: () => CardData | null;
  shuffleDeck: () => void;
  resetDeck: () => void;
}

// Context creation
const DeckContext = createContext<DeckContextType | undefined>(undefined);

const DECK_STORAGE_KEY = "deck";

// Reducer implementation
const deckReducer = (state: CardData[], action: DeckAction): CardData[] => {
  switch (action.type) {
    case "INIT_DECK":
      return action.payload;

    case "GIVE_CARD":
      return state.slice(1);

    case "SHUFFLE":
      return [...state].sort(() => Math.random() - 0.5);

    case "RESET":
      return fulldeck.sort(() => Math.random() - 0.5) as CardData[];

    default:
      return state;
  }
};

// Provider props
interface DeckProviderProps {
  children: ReactNode;
}

export const DeckProvider = ({ children }: DeckProviderProps) => {
  const [deck, dispatch] = useReducer(deckReducer, []);

  useEffect(() => {
    const stored = localStorage.getItem(DECK_STORAGE_KEY);
    if (stored) {
      dispatch({ type: "INIT_DECK", payload: JSON.parse(stored) });
    } else {
      dispatch({ type: "RESET" });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck));
  }, [deck]);

  const giveCard = (): CardData | null => {
    if (deck.length === 0) return null;
    const card = deck[0];
    dispatch({ type: "GIVE_CARD" });
    return card;
  };

  const shuffleDeck = () => {
    dispatch({ type: "SHUFFLE" });
  };

  const resetDeck = () => {
    dispatch({ type: "RESET" });
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
