import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Grid, Link} from "@material-ui/core";
import {Club} from "../competitions/models/Club";
import {useSelector} from "react-redux";
import {MainReducer} from "../../store/reducer";
import ClubDelete from "./delete/ClubDelete";
import ClubSave from "./save/ClubSave";
import {useParams} from "react-router-dom";

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

export const ClubProfile = () => {
    const [club, setClub] = useState<Club>();
    const history = useHistory();
    const {clubId} = useParams();
    const {loggedInUser} = useSelector((state: MainReducer) => state.authReducer);
    console.log(clubId);

    const fetchClub = () => {
        fetch("/clubs/" + clubId, {
            method: "GET",
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((club) => {
                    console.log("clubslog JOSIPALOG dohvatili club ", club);
                    club.image = "data:image/jpeg;base64," + club.image;
                    setClub(club);
                });
            } else {
                history.push("/");
            }
        })
    }

    const onClubUpdate = () => {
        fetchClub();
    }

    useEffect(() => {
        fetchClub();
    }, [history]);

    let establishmentDate;
    if (club?.establishmentDate !== undefined) {
        establishmentDate = new Date(club.establishmentDate).toLocaleDateString();
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container direction={"column"} spacing={3}>
                    <Grid container direction={"row"}>
                        <Grid item xs={8} style={{paddingLeft: '10px'}}>
                            <Typography variant="h5" className={classes.title} color={"secondary"}>
                                {club?.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container direction={"row"} justifyContent={"flex-end"}>
                                <Grid item>
                                    {loggedInUser && loggedInUser['admin'] && club ?
                                        <>
                                            <ClubDelete clubId={+clubId}/>
                                        </>
                                        :
                                        <></>
                                    }
                                </Grid>
                                <Grid item>
                                    {loggedInUser && loggedInUser['admin'] && club ?
                                        <>
                                            <ClubSave club={club} onSuccess={onClubUpdate}/>
                                        </>
                                        :
                                        <></>
                                    }
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid container item spacing={3} direction={"row"}>
                        <Grid item container xs={4} direction={"row"}>
                            <Grid item xs={12}>
                                <img className={classes.img} alt="complex" src={club?.image}/>
                            </Grid>
                        </Grid>
                        <Grid item container spacing={3} direction={"column"} xs={4}>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>Datum osnutka:</b> {establishmentDate}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>Mjesto:</b> {club?.place}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>Informacije:</b> {club?.description}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>Natjecanja u kojima
                                        sudjeluje:</b> {club?.clubCompetitions.map(competition => (
                                    <div key={competition.competitionId} style={{paddingLeft: '20px'}}>
                                        <i>{competition.name}</i>
                                    </div>
                                ))}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    {club?.clubCoaches.length !== 0 ?
                                        <div>
                                            <b>Treneri: </b> {club?.clubCoaches.map(coach => (
                                                <div key={coach.coachId} style={{paddingLeft: '20px'}}>
                                                    <Link component={'button'}
                                                          variant={"subtitle1"}
                                                          color={'secondary'}
                                                    onClick={() => history.push("/coaches/" + coach.coachId)}>
                                                    {coach.firstName + " " + coach.lastName}
                                                    </Link>
                                                    {" (" + coach.coachRole.name + ")"}
                                                </div>
                                        ))}
                                        </div>
                                        :
                                        <div>
                                            <b>Trenutno klub nema trenera</b>
                                        </div>
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography gutterBottom variant="subtitle1">
                                {club?.clubPlayers.length !== 0 ?
                                    <div>
                                        <b>Igrači:</b>
                                        {club?.clubPlayers.map(player => (
                                            <div key={player.playerId}>
                                                <div key={player.playerId} style={{paddingLeft: '20px'}}>
                                                    <Link component={'button'}
                                                          variant={"subtitle1"}
                                                          color={'secondary'}
                                                          onClick={() => history.push("/players/" + player?.playerId)}>
                                                    {player.firstName + " " + player.lastName}
                                                    </Link>
                                                    {" (" + player?.positions.map((position) => (
                                                        position.name
                                                    )) + ")"}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    <div>
                                        <b>Trenutno klub nema registriranih igrača</b>
                                    </div>
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>

                    </Grid>
                </Grid>

            </Paper>
        </div>
    );
}