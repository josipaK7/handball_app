import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Grid, Link} from "@material-ui/core";
import {Coach} from "../competitions/models/Coach";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            '& > svg': {
                margin: theme.spacing(2),
            },
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            backgroundColor: theme.palette.background.paper,
            width: '800px',
            height: 'fullHeight'
        },
        title: {
            flexGrow: 0.1,
            paddingBottom: '20px'
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '300px',
            maxHeight: '300px'
        },
    }),
);

export const CoachProfile = () => {
    const [coach, setCoach] = useState<Coach>();
    const history = useHistory();
    const coachId = window.location.pathname.split("/")[2];
    console.log("josipalog coachId" + coachId);

    useEffect(() => {
        fetch("/coaches/" + coachId, {
            method: "GET",
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((coach) => {
                    console.log("JOSIPALOG dohvatili coach image ", coach.image);
                    coach.image = "data:image/jpeg;base64," + coach.image;
                    setCoach(coach);
                });
            }
        })
    }, [history])

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container direction={"column"} spacing={1}>
                    <Grid item xs={12} style={{paddingLeft: '10px'}}>
                        <Typography variant="h5" className={classes.title} color={"secondary"}>
                            {coach?.firstName} {coach?.lastName}
                        </Typography>
                    </Grid>
                    <Grid item container spacing={3} direction={"row"} justifyContent={"center"}>
                        <Grid item xs={5}>
                            <img className={classes.img} alt={"coach-img"} src={coach?.image}/>
                        </Grid>
                        <Grid item container spacing={3} direction={"column"} xs={7}>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>Zemlja rođenja:</b> {coach?.originCountry}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>Trenutni klub:</b>
                                    <div key={coach?.club.clubId} style={{paddingLeft: '20px'}}>
                                        <Link
                                            component={'button'}
                                            variant={"subtitle1"}
                                            color={'secondary'}
                                            onClick={() => history.push("/clubs/" + coach?.club?.clubId)}>
                                            {coach?.club.name}
                                        </Link>
                                    </div>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>Uloga:</b> {coach?.coachRole.name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    );
}
