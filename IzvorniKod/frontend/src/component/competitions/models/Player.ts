import {Club} from "./Club";
import {Position} from "./Position";

export interface Player {
    playerId: number,
    club: Club,
    firstName: string,
    lastName: string,
    image: string,
    dateOfBirth: Date,
    height: number,
    weight: number,
    preferredHand: string,
    originCountry: string,
    positions: Position[];
}