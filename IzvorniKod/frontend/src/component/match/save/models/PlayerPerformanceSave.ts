import {Player} from "../../../competitions/models/Player";
import {PlayerPerformance} from "../../../competitions/models/PlayerPerformance";

export interface PlayerPerformanceSave {
    player: Player,
    goals: number,
    assists: number,
    suspensions: number,
    defenses: number,
    turnovers: number,
    stolen: number;
}

export const emptyPlayerPerformanceCreateForPlayerId = (player: Player): PlayerPerformanceSave => {
    return {
        player: player,
        goals: 0,
        assists: 0,
        suspensions: 0,
        defenses: 0,
        turnovers: 0,
        stolen: 0,
    }
}

export const fromPlayerPerformance = (playerPerformance: PlayerPerformance): PlayerPerformanceSave => {
    return {
        player: playerPerformance.player,
        goals: playerPerformance.goals,
        assists: 0,
        suspensions: playerPerformance.suspensions,
        defenses: playerPerformance.defenses,
        turnovers: playerPerformance.turnovers,
        stolen: playerPerformance.stolen,
    };
}