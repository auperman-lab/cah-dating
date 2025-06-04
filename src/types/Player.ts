import {CardData} from "./Card.ts";

export type Position = "top" | "left" | "right";


export type Player ={
  id: number,
  name: string,
  hand: CardData[]
}

export type Enemy = {
  id: number,
  name: string,
  hand: CardData[]
  position: Position
}