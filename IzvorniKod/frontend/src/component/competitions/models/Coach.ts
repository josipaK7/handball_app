import {CoachRole} from "./CoachRole";
import {Club} from "./Club";

export interface Coach {
    coachId: number,
    club: Club,
    coachRole: CoachRole,
    firstName: string,
    lastName: string,
    image: string,
    originCountry: string
}