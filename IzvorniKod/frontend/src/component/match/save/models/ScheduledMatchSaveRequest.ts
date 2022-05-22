import {ScheduledMatch} from "../../../competitions/models/ScheduledMatch";

export interface ScheduledMatchSaveRequest {
    matchId: number | undefined,
    competitionId: number | undefined,
    clubOne: number | undefined,
    clubTwo: number | undefined,
    datePlayed: Date | null,
    matchReferees: number[],

}

export const emptyScheduledMatchSaveRequest = (competitionId: number) => {
    return {
        matchId: undefined,
        competitionId: competitionId,
        clubOne: undefined,
        clubTwo: undefined,
        datePlayed: null,
        matchReferees: [],
    };
}

export const fromScheduledMatch = (match: ScheduledMatch): ScheduledMatchSaveRequest => {
    return {
        matchId: match.matchId,
        competitionId: match.competition.competitionId,
        clubOne: match.clubOne.clubId,
        clubTwo: match.clubTwo.clubId,
        datePlayed: match.datePlayed,
        matchReferees: match.matchReferees.map(referee => referee.refereeId),
    };
}