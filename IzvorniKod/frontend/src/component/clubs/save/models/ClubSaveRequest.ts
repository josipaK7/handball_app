import {Club} from "../../../competitions/models/Club";

export interface ClubSaveRequest {
    clubId: number | undefined,
    name: string,
    description: string,
    image: string,
    place: string,
    establishmentDate: Date | null,
    clubCoaches: number[],
    clubCompetitions: number[],
    clubPlayers: number[],
}

export const emptyClubSaveRequest = () => {
    return {
        clubId: undefined,
        name: "",
        description: "",
        image: "",
        place: "",
        establishmentDate: null,
        clubCoaches: [],
        clubCompetitions: [],
        clubPlayers: [],
    };
}

export const fromClub = (club: Club): ClubSaveRequest => {
    return {
        clubId: club.clubId,
        name: club.name,
        description: club.description,
        image: club.image,
        place: club.place,
        establishmentDate: club.establishmentDate,
        clubCoaches: club.clubCoaches.map(coach => coach.coachId),
        clubCompetitions: club.clubCompetitions.map(competition => competition.competitionId),
        clubPlayers: club.clubPlayers.map(player => player.playerId),
    };
}