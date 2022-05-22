import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Grid, Link} from "@material-ui/core";
import {Referee} from "../competitions/models/Referee";
import {Match} from "../competitions/models/Match";
import moment from "moment";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";

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
            width: '900px',
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

interface MatchProps {
    match: Match
}

function MatchesContent({match}: MatchProps) {
    const hist = useHistory();

    return (
        <Grid container spacing={1} direction={"column"}>
            <Grid item container spacing={1}>
                <Grid item container xs={10} spacing={1} direction={"column"}>
                    <Grid item container direction={"row"} spacing={3}>
                        <Grid item>
                            <Typography variant="subtitle2" gutterBottom component="span" color={"textSecondary"}>
                                {moment(match.datePlayed).format("DD.MM.YYYY HH:mm")}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2">
                                <i>{match.competition.name}</i>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={6}>
                            <Grid item xs={5}>
                                <Typography variant="body1" gutterBottom component="span" color={"primary"}>
                                    <Link component={'button'}
                                          variant={"body1"}
                                          color={'primary'}
                                          onClick={() => hist.push("/clubs/" + match.clubOne.clubId)}>
                                        <b>{match.clubOne.name}</b>
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography color={"secondary"} variant={"h5"} gutterBottom component="span">
                                    {match.clubOneGoals} : {match.clubTwoGoals}
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="body1" gutterBottom component="span" color={"primary"}>
                                    <Link component={'button'}
                                          variant={"body1"}
                                          color={'primary'}
                                          onClick={() => hist.push("/clubs/" + match.clubTwo.clubId)}>
                                        <b>{match.clubTwo.name}</b>
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container direction={"row"} spacing={1}>
                        <Grid item>
                            <Typography variant="subtitle2" gutterBottom component="span" color={"textSecondary"}>
                                Suci:
                            </Typography>
                        </Grid>
                        {match.matchReferees.map(referee => (
                            <Grid item key={referee.refereeId}>
                                <Link component={'button'}
                                      variant={"subtitle2"}
                                      color={'secondary'}
                                      onClick={() => hist.push("/referees/" + referee.refereeId)}>
                                    {referee.firstName} {referee.lastName}
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export const RefereeProfile = () => {
    const [referee, setReferee] = useState<Referee>();
    const history = useHistory();
    const refereeId = window.location.pathname.split("/")[2];
    console.log("josipalog refereeId" + refereeId);

    useEffect(() => {
        fetch("/referees/" + refereeId, {
            method: "GET",
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((referee) => {
                    console.log("JOSIPALOG dohvatili referee ", referee);
                    setReferee(referee);
                });
            }
        })
    }, [history])

    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        fetch("/matches/referee/" + refereeId, {
            method: "GET",
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((matches) => {
                    console.log("JOSIPALOG dohvatili matches za referee ", matches);
                    setMatches(matches);
                });
            }
        })
    }, [history])

    let activeFrom;
    if (referee?.activeFromDate !== undefined) {
        activeFrom = new Date(referee.activeFromDate).toLocaleDateString();
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.title} color={'secondary'}>
                    {referee?.firstName + " " + referee?.lastName}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item sm container>
                        <Grid item xs container direction="column" spacing={3}>
                            <Grid item style={{paddingLeft: '40px'}}>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>Zemlja rođenja:</b> {referee?.originCountry}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>Aktivno djeluje od:</b> {activeFrom}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" style={{paddingBottom: '10px'}}>
                                    <b>Utakmice u kojima sudjeluje:</b>
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table aria-label="collapsible table">
                                        <TableBody>
                                            {matches.map((match) => (
                                                <TableRow key={match.matchId}>
                                                    <TableCell>
                                                        <MatchesContent match={match}/>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
