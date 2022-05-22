import {Coach} from "./Coach";
import {Competition} from "./Competition";
import {ClubPlayer} from "./ClubPlayer";

export interface Club {
    clubId: number,
    name: string,
    description: string,
    image: string,
    place: string,
    establishmentDate: Date,
    clubCoaches: Coach[],
    clubCompetitions: Competition[],
    clubPlayers: ClubPlayer[];
}