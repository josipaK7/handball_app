import React from "react";
import {Club} from "../competitions/models/Club";
import {ClubResult} from "./ClubResult";
import {Grid} from "@material-ui/core";

interface Props {
    clubs: Club[];
}

export const ClubsResult = ({clubs}: Props) => {

    return (
        <div>
            <Grid container direction={"row"} spacing={10}>
                {clubs.map((club) => (
                    <Grid item key={club.clubId}>
                        <ClubResult club={club}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}