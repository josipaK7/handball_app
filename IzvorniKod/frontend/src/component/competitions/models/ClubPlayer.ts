import {Position} from "./Position";

export interface ClubPlayer {
    playerId: number,
    firstName: string,
    lastName: string,
    positions: Position[];
}