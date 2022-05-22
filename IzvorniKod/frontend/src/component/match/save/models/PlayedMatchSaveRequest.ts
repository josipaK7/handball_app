import {fromPlayerPerformance, PlayerPerformanceSave} from "./PlayerPerformanceSave";
import {Match} from "../../../competitions/models/Match";

export interface PlayedMatchSaveRequest {
    matchId: number | undefined,
    competitionId: number | undefined,
    clubOne: number | undefined,
    clubTwo: number | undefined,
    clubOneGoals: number | undefined,
    clubTwoGoals: number | undefined,
    datePlayed: Date | null,
    matchReferees: number[],
    clubOnePlayerMatchPerformance: PlayerPerformanceSave[],
    clubTwoPlayerMatchPerformance: PlayerPerformanceSave[],
}
export const emptyPlayedMatchSaveRequest = (competitionId: number) => {
    return {
        matchId: undefined,
        competitionId: competitionId,
        clubOne: undefined,
        clubTwo: undefined,
        clubOneGoals: undefined,
        clubTwoGoals: undefined,
        datePlayed: null,
        matchReferees: [],
        clubOnePlayerMatchPerformance: [],
        clubTwoPlayerMatchPerformance: [],
    };
}

export const fromMatch = (match: Match): PlayedMatchSaveRequest => {
    return {
        matchId: match.matchId,
        competitionId: match.competition.competitionId,
        clubOne: match.clubOne.clubId,
        clubTwo: match.clubTwo.clubId,
        clubOneGoals: match.clubOneGoals,
        clubTwoGoals: match.clubTwoGoals,
        datePlayed: match.datePlayed,
        matchReferees: match.matchReferees.map(referee => referee.refereeId),
        clubOnePlayerMatchPerformance: match.clubOnePlayerMatchPerformance.map(
            playerMatchPerformance => fromPlayerPerformance(playerMatchPerformance)
        ),
        clubTwoPlayerMatchPerformance: match.clubTwoPlayerMatchPerformance.map(
            playerMatchPerformance => fromPlayerPerformance(playerMatchPerformance)
        )
    };
}