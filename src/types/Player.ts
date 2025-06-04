import {CardData} from "./Card.ts";

export type Player ={
  id: number,
  name: string,
  hand: CardData[]
}

export type Enemy = {
  id: number,
  name: string,
  hand: CardData[]

}