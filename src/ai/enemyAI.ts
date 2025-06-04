// src/ai/enemyAI.ts

import {canBeat, getCardValue, getLowestCard} from './aiUtils';
import {Enemy} from "../types/Player.ts";
import {CardData} from "../types/Card.ts";

export const chooseAttackCard = (
  enemy: Enemy,
  tableCards: CardData[],
  trumpSuit: string
): CardData | null => {
  if (tableCards.length === 0) {
    return getLowestCard(enemy.hand, trumpSuit);
  }

  const playableRanks = new Set(tableCards.map((c) => c.rank));
  const match = enemy.hand.find((card) => playableRanks.has(card.rank));
  return match || null;
};

export const chooseDefenseCard = (
  enemy: Enemy,
  attackCard: CardData,
  trumpSuit: string
): CardData | null => {
  const validDefenders = enemy.hand.filter((card) =>
    canBeat(card, attackCard, trumpSuit)
  );

  return validDefenders.sort((a, b) => {
    return (
      (a.suit === trumpSuit ? 100 : 0) + getCardValue(a) -
      ((b.suit === trumpSuit ? 100 : 0) + getCardValue(b))
    );
  })[0] || null;
};

export const shouldPickUp = (
  enemy: Enemy,
  attackCard: CardData,
  trumpSuit: string
): boolean => {
  return !enemy.hand.some((card) => canBeat(card, attackCard, trumpSuit));
};
