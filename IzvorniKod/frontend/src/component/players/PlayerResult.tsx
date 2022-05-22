import React from "react";
import {Player} from "../competitions/models/Player";
import {useHistory} from "react-router";
import {Avatar, createStyles, Grid, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {makeStyles, Theme} from "@material-ui/core/styles";

interface Props {
    player: Player
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "&:hover": {
                transform: "scale(1.10)",
                cursor: "pointer"
            }
        },
        item: {
            maxWidth: 100,
        },
        large: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },

    }),
);

export const PlayerResult = ({player}: Props) => {
    const history = useHistory();


    const classes = useStyles();

    return(
        <Grid container direction={"column"} className={classes.root} onClick={() => history.push("/players/" + player.playerId)}>
            <Grid item>
                <Avatar alt={player.firstName + " " + player.lastName} src={player.image} className={classes.large}/>
            </Grid>
            <Grid item className={classes.item}>
                <Typography variant="body2" gutterBottom component="span" color={"textSecondary"}>
                    <Box fontWeight="fontWeightBold">
                        {player.firstName} {player.lastName}
                    </Box>
                </Typography>
            </Grid>

        </Grid>
    );
}