import {Player} from "./Player";

export interface PlayerPerformance {
    player: Player,
    goals: number,
    assists: number,
    suspensions: number,
    defenses: number,
    turnovers: number,
    stolen: number;
}