import {Player} from "../../../competitions/models/Player";

export interface PlayerSaveRequest {
    playerId: number | undefined,
    club: number | undefined,
    firstName: string,
    lastName: string,
    image: string,
    dateOfBirth: Date | null,
    height: number | undefined,
    weight: number | undefined,
    preferredHand: string,
    originCountry: string,
    positions: number[];
}

export const emptyPlayerSaveRequest = () => {
    return {
        playerId: undefined,
        club: undefined,
        firstName: "",
        lastName: "",
        image: "",
        dateOfBirth: null,
        height: undefined,
        weight: undefined,
        preferredHand: "",
        originCountry: "",
        positions: [],
    };
}

export const fromPlayer = (player: Player): PlayerSaveRequest => {
    return {
        playerId: player.playerId,
        club: player.club != null ? player.club.clubId : undefined,
        firstName: player.firstName,
        lastName: player.lastName,
        image: player.image,
        dateOfBirth: player.dateOfBirth,
        height: player.height,
        weight: player.weight,
        preferredHand: player.preferredHand,
        originCountry: player.originCountry,
        positions: player.positions.map(position => position.positionId),
    };
}