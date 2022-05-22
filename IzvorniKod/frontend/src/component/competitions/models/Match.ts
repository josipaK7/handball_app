import {Club} from "./Club";
import {Competition} from "./Competition";
import {Referee} from "./Referee";
import {PlayerPerformance} from "./PlayerPerformance";

export interface Match {
    matchId: number,
    clubOne: Club,
    clubTwo: Club,
    competition: Competition,
    clubOneGoals: number,
    clubTwoGoals: number,
    datePlayed: Date,
    matchReferees: Referee[],
    clubOnePlayerMatchPerformance: PlayerPerformance[],
    clubTwoPlayerMatchPerformance: PlayerPerformance[];
}