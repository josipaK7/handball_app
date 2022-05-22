import {Club} from "./Club";

export interface Competition {
    competitionId: number,
    name: string,
    description: string,
    dateFrom: Date,
    dateTo: Date,
    image: string,
    clubs: Club[],
}