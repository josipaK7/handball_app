import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {Match} from "./models/Match";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {Grid, Link} from "@material-ui/core";
import {ScheduledMatch} from "./models/ScheduledMatch";
import moment from "moment";
import {useSelector} from "react-redux";
import {MainReducer} from "../../store/reducer";
import ScheduledMatchDelete from "../match/delete/ScheduledMatchDelete";
import ScheduledMatchSave from "../match/save/ScheduledMatchSave";
import Box from "@material-ui/core/Box";


interface ScheduledMatchProps {
    scheduledMatch: ScheduledMatch,
    competitionId: number,
    onMatchUpdate?: () => void,
    onMatchDelete?: () => void,
}

function ScheduledMatchContent({scheduledMatch, competitionId, onMatchUpdate, onMatchDelete}: ScheduledMatchProps) {
    const {loggedInUser} = useSelector((state: MainReducer) => state.authReducer);

    const hist = useHistory();

    return (
        <Grid container spacing={1} direction={"column"}>
            <Grid item container spacing={1}>
                <Grid item container xs={10} spacing={1} direction={"column"}>
                    <Grid item>
                        <Typography variant="subtitle2" gutterBottom component="span" color={"textSecondary"}>
                            {moment(scheduledMatch.datePlayed).format("DD.MM.YYYY HH:mm")}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={6}>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom component="span" color={"primary"}>
                                    <Box fontWeight="fontWeightBold">
                                        {scheduledMatch.clubOne.name}
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom component="span" color={"primary"}>
                                    <Box fontWeight="fontWeightBold">
                                        {scheduledMatch.clubTwo.name}
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
                        {scheduledMatch.matchReferees.map(referee => (
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
                            <ScheduledMatchDelete matchId={scheduledMatch.matchId} onSuccess={onMatchDelete}/>
                            <ScheduledMatchSave competitionId={competitionId}
                                                match={scheduledMatch}
                                                onSuccess={onMatchUpdate}/>
                        </>
                        :
                        <></>
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

interface Props {
    competitionId: number
}

export const CompetitionScheduledMatches = ({competitionId}: Props) => {
    const [scheduledMatches, setScheduledMatches] = useState<ScheduledMatch[]>([]);
    const {loggedInUser} = useSelector((state: MainReducer) => state.authReducer);
    const history = useHistory();

    const onMatchChange = () => {
        fetchCompetitionMatches();
    }

    useEffect(() => {
        fetchCompetitionMatches();
    }, [history]);

    const fetchCompetitionMatches = () => {
        fetch("/matches/competition/" + competitionId + "/scheduled", {
            method: "GET",
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((scheduledMatches) => {
                    scheduledMatches.forEach((scheduledMatch: Match) => {
                        scheduledMatch.datePlayed = new Date(scheduledMatch.datePlayed);
                    });
                    setScheduledMatches(scheduledMatches);
                });
            }
        });
    }

    return (
        <Grid container spacing={4} direction={"column"}>
            <Grid item>
                {loggedInUser && loggedInUser['admin'] ?
                    <ScheduledMatchSave competitionId={competitionId} onSuccess={onMatchChange}/>
                    :
                    <></>
                }
            </Grid>
            <Grid item>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableBody>
                            {scheduledMatches.map((scheduledMatch) => (
                                <TableRow key={scheduledMatch.matchId}>
                                    <TableCell>
                                        <ScheduledMatchContent scheduledMatch={scheduledMatch}
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