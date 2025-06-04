import {CardData, Rank} from "../types/Card.ts";


const rankValues: Record<Rank, number> = {
  "2": 2,  "3": 3,  "4": 4,  "5": 5,
  "6": 6,  "7": 7,  "8": 8,  "9": 9,
  "10": 10, "J": 11, "Q": 12, "K": 13, "A": 14,
};

export const isTrump = (card: CardData, trumpSuit: string): boolean =>
  card.suit === trumpSuit;

export const getCardValue = (card: CardData): number =>
  rankValues[card.rank];

export const canBeat = (
  defender: CardData,
  attacker: CardData,
  trumpSuit: string
): boolean => {
  if (isTrump(defender, trumpSuit) && !isTrump(attacker, trumpSuit)) return true;
  if (
    defender.suit === attacker.suit &&
    getCardValue(defender) > getCardValue(attacker)
  ) {
    return true;
  }
  return false;
};

export const getLowestCard = (hand: CardData[], trumpSuit: string): CardData | null => {
  if (!hand.length) return null;

  const sorted = [...hand].sort((a, b) => {
    const aTrump = isTrump(a, trumpSuit);
    const bTrump = isTrump(b, trumpSuit);
    if (aTrump && !bTrump) return 1;
    if (!aTrump && bTrump) return -1;
    return getCardValue(a) - getCardValue(b);
  });

  return sorted[0] || null;
};
