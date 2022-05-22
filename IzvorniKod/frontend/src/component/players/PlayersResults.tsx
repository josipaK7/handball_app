import React from "react";
import {Player} from "../competitions/models/Player";
import {PlayerResult} from "./PlayerResult";
import {Grid} from "@material-ui/core";

interface Props {
    players: Player[];
}

export const PlayersResults = ({players} : Props) => {

    return (
        <div>
            <Grid container direction={"row"} spacing={9}>
                {players.map((player) => (
                    <Grid item key={player.playerId}>
                        <PlayerResult player={player}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}