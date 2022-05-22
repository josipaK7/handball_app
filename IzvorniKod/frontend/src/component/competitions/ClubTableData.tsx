import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {ClubTableEntry} from "./models/ClubTableEntry";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import {Link} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";

const useClubEntryStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

interface Props {
    competitionId: number
}

export const ClubTableData = ({competitionId}: Props) => {
    const [clubTableEntries, setClubTableEntries] = useState<ClubTableEntry[]>([]);
    const history = useHistory();
    const classes = useClubEntryStyles();

    useEffect(() => {
        fetch("/clubTableData/" + competitionId, {
            method: "GET",
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((clubTableEntries) => {
                    setClubTableEntries(clubTableEntries);
                });
            }
        });
    }, [history]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align={"left"}>
                            <Typography variant={"subtitle2"} color={"textSecondary"} gutterBottom component="span">
                                Naziv kluba
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant={"subtitle2"} color={"textSecondary"} gutterBottom component="span">
                                Pobjede
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant={"subtitle2"} color={"textSecondary"} gutterBottom component="span">
                                Porazi
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant={"subtitle2"} color={"textSecondary"} gutterBottom component="span">
                                Neriješeno
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant={"subtitle2"} color={"textSecondary"} gutterBottom component="span">
                                Primljeni golovi
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant={"subtitle2"} color={"textSecondary"} gutterBottom component="span">
                                Dani golovi
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant={"subtitle2"} color={"textSecondary"} gutterBottom component="span">
                                Odigrano utakmica
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant={"subtitle2"} color={"textSecondary"} gutterBottom component="span">
                                BODOVI
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clubTableEntries.map((clubTableEntry) => (
                        <TableRow key={clubTableEntry.clubId}>
                            <TableCell component="th" scope="row" align={"left"}>
                                <Link component={'button'}
                                      variant={"body2"}
                                      color={'secondary'}
                                      onClick={() => history.push("/clubs/" + clubTableEntry.clubId)}
                                      align={"left"}>
                                    {clubTableEntry.clubName}
                                </Link>
                            </TableCell>
                            <TableCell align={"center"}>{clubTableEntry.victories}</TableCell>
                            <TableCell align={"center"}>{clubTableEntry.defeats}</TableCell>
                            <TableCell align={"center"}>{clubTableEntry.draws}</TableCell>
                            <TableCell align={"center"}>{clubTableEntry.concededGoals}</TableCell>
                            <TableCell align={"center"}>{clubTableEntry.scoredGoals}</TableCell>
                            <TableCell align={"center"}>{clubTableEntry.matchesPlayed}</TableCell>
                            <TableCell align={"center"}>
                                <Typography color={"primary"} gutterBottom component="span">
                                    <Box fontWeight="fontWeightBold">
                                        {clubTableEntry.points}
                                    </Box>
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

};