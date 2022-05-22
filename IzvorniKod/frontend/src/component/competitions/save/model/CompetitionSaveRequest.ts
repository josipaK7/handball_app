import {Competition} from "../../models/Competition";

export interface CompetitionSaveRequest {
    competitionId: number|null,
    name: string,
    description: string,
    dateFrom: Date | null,
    dateTo: Date | null,
    clubIds: number[],
    image?: [];
}

export const emptyCompetitionCreateRequest = () => {
    return {
        competitionId: null,
        name: "",
        description: "",
        dateFrom: null,
        dateTo: null,
        clubIds: [],
    };
}

export const fromCompetition = (competition: Competition) => {
    return {
        competitionId: competition.competitionId,
        name: competition.name,
        description: competition.description,
        dateFrom: competition.dateFrom,
        dateTo: competition.dateTo,
        clubIds: competition.clubs.map(club => club.clubId),
    };
}