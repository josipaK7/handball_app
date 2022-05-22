import React, {useEffect, useState} from "react";
import {Player} from "../competitions/models/Player";
import {useHistory} from "react-router";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Grid, Link} from "@material-ui/core";
import {useSelector} from "react-redux";
import {MainReducer} from "../../store/reducer";
import PlayerDelete from "./delete/PlayerDelete";
import PlayerSave from "./save/PlayerSave";

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
            height: 'fullHeight',
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
        bottom: {
            paddingBottom: '10px'
        }
    }),
);

export const PlayerProfile = () => {
    const [player, setPlayer] = useState<Player>();
    const history = useHistory();
    const {loggedInUser} = useSelector((state: MainReducer) => state.authReducer);
    const playerId = window.location.pathname.split("/")[2];
    console.log(playerId);

    const fetchPlayer = () => {
        fetch("/players/" + playerId, {
            method: "GET",
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((player) => {
                    console.log("JOSIPALOG dohvatili player ", player);
                    player.image = "data:image/jpeg;base64," + player.image;
                    setPlayer(player);
                });
            } else {
                history.push("/");
            }
        })
    }

    const onPlayerUpdate = () => {
        fetchPlayer();
    }

    useEffect(() => {
        fetchPlayer();
    }, [history]);

    let dateOfBirth;
    if (player?.dateOfBirth !== undefined) {
        dateOfBirth = new Date(player.dateOfBirth).toLocaleDateString();
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container direction={"column"} spacing={3}>
                    <Grid container direction={"row"}>
                        <Grid item xs={8} style={{paddingLeft: '10px'}}>
                            <Typography variant="h5" className={classes.title} color={"secondary"}>
                                {player?.firstName + " " + player?.lastName}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container direction={"row"} justifyContent={"flex-end"}>
                                <Grid item>
                                    {loggedInUser && loggedInUser['admin'] && player ?
                                        <>
                                            <PlayerDelete playerId={+playerId}/>
                                        </>
                                        :
                                        <></>
                                    }
                                </Grid>
                                <Grid item>
                                    {loggedInUser && loggedInUser['admin'] && player ?
                                        <>
                                            <PlayerSave player={player} onSuccess={onPlayerUpdate}/>
                                        </>
                                        :
                                        <></>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container item spacing={3} direction={"row"}>
                        <Grid item xs={5}>
                            <img className={classes.img} alt={"player-img"} src={player?.image}/>
                        </Grid>
                        <Grid item container spacing={3} direction={"column"} xs={7}>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1" className={classes.bottom}>
                                    <b>Datum rođenja:</b> {dateOfBirth}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" className={classes.bottom}>
                                    <b>Država rođenja:</b> {player?.originCountry}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" className={classes.bottom}>
                                    <b>Visina:</b> {player?.height}cm
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" className={classes.bottom}>
                                    <b>Težina:</b> {player?.weight}kg
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" className={classes.bottom}>
                                    <b>Trenutni klub:</b>
                                    {player?.club != null ?
                                        <div key={player?.playerId} style={{paddingLeft: '20px'}}>
                                                <Link
                                                    component={'button'}
                                                    variant={"subtitle1"}
                                                    color={'secondary'}
                                                    onClick={() => history.push("/clubs/" + player?.club.clubId)}>
                                                    {player?.club.name}
                                                </Link>
                                        </div>
                                    :
                                    <> bez kluba</>
                                    }

                                </Typography>
                                <Typography gutterBottom variant="subtitle1" className={classes.bottom}>
                                    <b>Pozicija:</b> {player?.positions.map((position, index) => (
                                    index < player.positions.length - 1 ? position.name + ", " : position.name
                                ))}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" className={classes.bottom}>
                                    <b>Dominantna ruka:</b> {player?.preferredHand}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

        </div>
    );
}