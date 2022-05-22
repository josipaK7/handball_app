import React from "react";
import {Club} from "../competitions/models/Club";
import {useHistory} from "react-router";
import {Avatar, createStyles, Grid, Typography} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

interface Props {
    club: Club
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

export const ClubResult = ({club}: Props) => {
    const history = useHistory();

    const classes = useStyles();

    return(
        <Grid container direction={"column"} className={classes.root}
              onClick={() => history.push("/clubs/" + club.clubId)}>
            <Grid item>
                <Avatar alt={club.name} src={club.image} className={classes.large}/>
            </Grid>
            <Grid item className={classes.item} >
                <Typography variant="body2" gutterBottom component="span" color={"textSecondary"}>
                    <Box fontWeight="fontWeightBold">
                        {club.name}
                    </Box>
                </Typography>
            </Grid>

        </Grid>
    );
}