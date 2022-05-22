import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {Match} from "./models/Match";
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Grid, Link} from "@material-ui/core";
import moment from "moment";
import {useSelector} from "react-redux";
import {MainReducer} from "../../store/reducer";
import PlayedMatchDelete from "../match/delete/PlayedMatchDelete";
import PlayedMatchSave from "../match/save/PlayedMatchSave";
import {PlayerPerformance} from "./models/PlayerPerformance";

interface PlayedMatchProps {
    playedMatch: Match,
    competitionId: number,
    onMatchUpdate?: () => void,
    onMatchDelete?: () => void,
}

interface MatchClubPerformanceProps {
    matchId: number,
    clubName: string,
    playerPerformances: PlayerPerformance[],
}

const MatchClubPerformance = ({matchId, clubName, playerPerformances}: MatchClubPerformanceProps) => {

    const hist = useHistory();

    return (
        <Box margin={0}>
            <Typography variant="subtitle2" gutterBottom component="span">
                <Box fontWeight="fontWeightBold">
                    {clubName}
                </Box>
            </Typography>
            <Table size="small" padding={"normal"}>
                <TableHead>
                    <TableRow key={matchId}>
                        <TableCell>
                            <Typography variant={"subtitle2"} color={"textSecondary"} gutterBottom component="span">
                                Ime i prezime
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant={"subtitle2"} color={"textSecondary"} gutterBottom component="span">
                                Golovi
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant={"subtitle2"} color={"textSecondary"} gutterBottom component="span">
                                Asistencije
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant={"subtitle2"} color={"textSecondary"} gutterBottom component="span">
                                2 minute isključenja
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant={"subtitle2"} color={"textSecondary"} gutterBottom component="span">
                                Obrane
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant={"subtitle2"} color={"textSecondary"} gutterBottom component="span">
                                Izgubljene lopte
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant={"subtitle2"} color={"textSecondary"} gutterBottom component="span">
                                Ukradene lopte
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {playerPerformances.map(playerMatchPerformance => (
                        <TableRow key={playerMatchPerformance.player.playerId}>
                            <TableCell component="th" scope="row">
                                <Link component={'button'}
                                      variant={"subtitle1"}
                                      color={'secondary'}
                                      onClick={() => hist.push("/players/" + playerMatchPerformance.player?.playerId)}>
                                    {playerMatchPerformance.player.firstName} {playerMatchPerformance.player.lastName}
                                </Link>
                            </TableCell>
                            <TableCell align="right">{playerMatchPerformance.goals}</TableCell>
                            <TableCell align="right">{playerMatchPerformance.assists}</TableCell>
                            <TableCell
                                align="right">{playerMatchPerformance.suspensions}</TableCell>
                            <TableCell
                                align="right">{playerMatchPerformance.defenses}</TableCell>
                            <TableCell
                                align="right">{playerMatchPerformance.turnovers}</TableCell>
                            <TableCell align="right">{playerMatchPerformance.stolen}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}

function PlayedMatchContent({playedMatch, competitionId, onMatchUpdate, onMatchDelete}: PlayedMatchProps) {
    const [open, setOpen] = React.useState(false);
    const {loggedInUser} = useSelector((state: MainReducer) => state.authReducer);

    const hist = useHistory();

    return (
        <Grid container spacing={1} direction={"column"}>
            <Grid item container spacing={1}>
                <Grid item container xs={10} spacing={1} direction={"column"}>
                    <Grid item>
                        <Typography variant="subtitle2" gutterBottom component="span" color={"textSecondary"}>
                            {moment(playedMatch.datePlayed).format("DD.MM.YYYY HH:mm")}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={6}>
                            <Grid item xs={5}>
                                <Typography variant="body1" gutterBottom component="span" color={"primary"}>
                                    <Box fontWeight="fontWeightBold">
                                        {playedMatch.clubOne.name}
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography color={"secondary"} variant={"h5"} gutterBottom component="span">
                                    {playedMatch.clubOneGoals} : {playedMatch.clubTwoGoals}
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="body1" gutterBottom component="span" color={"primary"}>
                                    <Box fontWeight="fontWeightBold">
                                        {playedMatch.clubTwo.name}
                                    </Box>
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
                        {playedMatch.matchReferees.map(referee => (
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
                <Grid item xs={2} container justifyContent={"flex-end"}>
                    {loggedInUser && loggedInUser['admin'] ?
                        <>
                            <PlayedMatchDelete matchId={playedMatch.matchId} onSuccess={onMatchDelete}/>
                            <PlayedMatchSave competitionId={competitionId}
                                             match={playedMatch}
                                             onSuccess={onMatchUpdate}/>
                        </>
                        :
                        <></>
                    }
                </Grid>
            </Grid>
            <Grid item>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </IconButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <MatchClubPerformance matchId={playedMatch.matchId}
                                          clubName={playedMatch.clubOne.name}
                                          playerPerformances={playedMatch.clubOnePlayerMatchPerformance}/>
                    <MatchClubPerformance matchId={playedMatch.matchId}
                                          clubName={playedMatch.clubTwo.name}
                                          playerPerformances={playedMatch.clubTwoPlayerMatchPerformance}/>
                </Collapse>
            </Grid>

        </Grid>
    );
}

interface Props {
    competitionId: number
}

export const CompetitionPlayedMatches = ({competitionId}: Props) => {
    const [playedMatches, setPlayedMatches] = useState<Match[]>([]);
    const history = useHistory();
    const {loggedInUser} = useSelector((state: MainReducer) => state.authReducer);

    const onMatchChange = () => {
        fetchCompetitionMatches();
    }

    useEffect(() => {
        fetchCompetitionMatches();
    }, [history]);

    const fetchCompetitionMatches = () => {
        fetch("/matches/competition/" + competitionId + "/played", {
            method: "GET",
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((playedMatches) => {
                    playedMatches.forEach((playedMatch: Match) => {
                        playedMatch.datePlayed = new Date(playedMatch.datePlayed);
                    });
                    setPlayedMatches(playedMatches);
                });
            }
        });
    }

    return (
        <Grid container spacing={4} direction={"column"}>
            <Grid item>
                {loggedInUser && loggedInUser['admin'] ?
                    <PlayedMatchSave competitionId={competitionId} onSuccess={onMatchChange}/>
                    :
                    <></>
                }
            </Grid>
            <Grid item>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableBody>
                            {playedMatches.map((playedMatch) => (
                                <TableRow key={playedMatch.matchId}>
                                    <TableCell>
                                        <PlayedMatchContent playedMatch={playedMatch}
                                                            competitionId={competitionId}
                                                            onMatchUpdate={onMatchChange}
                                                            onMatchDelete={onMatchChange}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}