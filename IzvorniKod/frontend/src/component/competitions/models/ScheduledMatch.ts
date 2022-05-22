import {Club} from "./Club";
import {Competition} from "./Competition";
import {Referee} from "./Referee";

export interface ScheduledMatch {
    matchId: number,
    clubOne: Club,
    clubTwo: Club,
    competition: Competition,
    datePlayed: Date,
    matchReferees: Referee[];
}