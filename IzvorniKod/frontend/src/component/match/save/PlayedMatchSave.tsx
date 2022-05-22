import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import React, {useEffect, useState} from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography
} from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {KeyboardDateTimePicker} from "@material-ui/pickers";
import {Club} from "../../competitions/models/Club";
import {emptyPlayedMatchSaveRequest, fromMatch, PlayedMatchSaveRequest} from "./models/PlayedMatchSaveRequest";
import {Referee} from "../../competitions/models/Referee";
import {Player} from "../../competitions/models/Player";
import {emptyPlayerPerformanceCreateForPlayerId, PlayerPerformanceSave} from "./models/PlayerPerformanceSave";
import {useSelector} from "react-redux";
import {MainReducer} from "../../../store/reducer";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Match} from "../../competitions/models/Match";
import EditIcon from "@material-ui/icons/Edit";
import AddCircle from "@material-ui/icons/AddCircle";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        style: {
            color: 'red',
            fontSize: '1rem',
        },
        paddingBottom: {
            paddingBottom: '35px',
        },
        selectForm: {
            minWidth: 200,
        },
        contentContainer: {
            overflow: 'hidden',
        },
        dialog: {
            width: 'lg'
        }
    })
);

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props}/>
}

interface Props {
    onSuccess?: () => void,
    competitionId: number,
    match?: Match,
    onClose?: () => void,
    opened?: boolean,
}

export default function PlayedMatchSave({onSuccess, competitionId, match, onClose, opened}: Props) {
    const {token} = useSelector((state: MainReducer) => state.authReducer);
    // Dialog opened state
    const [open, setOpen] = useState(opened || false);
    // Our request has succeeded, used to show snackbar for success
    const [showSaveSuccessMessage, setShowSaveSuccessMessage] = useState(false);
    // Our request has failed,used to show snackbar for error
    const [showSaveFailureMessage, setShowFailureMessage] = useState(false);

    const [clubs, setClubs] = useState<Club[]>([]);
    const [referees, setReferees] = useState<Referee[]>([]);

    const createInitialFormikValues = (): PlayedMatchSaveRequest => {
        if (match) {
            return fromMatch(match);
        }
        return emptyPlayedMatchSaveRequest(competitionId);
    }

    const [initialFormikValues, setInitialFormikValues] = useState(createInitialFormikValues());

    useEffect(() => {
        console.log("matchlog PlayedMatchSaveDialog open changed");
        if (open) {
            init();
            setInitialFormikValues(createInitialFormikValues);
        }
    }, [open])

    const init = () => {
        console.log("matchlog PlayedMatchSaveDialog init");
        fetchCompetitionClubs();
        fetchAllReferees();
    }

    const fetchCompetitionClubs = () => {
        if (!clubs || clubs.length === 0) {
            fetch("/clubs/competition/" + competitionId, {
                method: "GET",
            }).then(function (response) {
                if (response.status === 200) {
                    response.json().then((clubs) => {
                        setClubs(clubs);
                    });
                }
            })
        }
    }

    const fetchAllReferees = () => {
        if (!referees || referees.length === 0) {
            fetch("/referees/all", {
                method: "GET",
            }).then(function (response) {
                if (response.status === 200) {
                    response.json().then((referees) => {
                        setReferees(referees);
                    });
                }
            })
        }
    }

    const fetchClubPlayers = async (clubId: number) => {
        let result = await fetch("/players/club/" + clubId, {
            method: "GET",
        });
        const json = await result.json().then((players) => {
            players.forEach((player: Player) => {
                player.image = "data:image/jpeg;base64," + player.image;
            });
            return players;
        });
        return json;
    }

    const createPlayerPerformanceForPlayers = (players: Player[]): PlayerPerformanceSave[] => {
        const playerPerformanceArray = [];
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            const playerPerformanceForPlayer = emptyPlayerPerformanceCreateForPlayerId(player);
            playerPerformanceArray.push(playerPerformanceForPlayer);
        }
        return playerPerformanceArray;
    }

    const showSuccessMessage = () => {
        setShowSaveSuccessMessage(true);
    }

    const showErrorMessage = () => {
        setShowFailureMessage(true);
    }

    const onCloseSuccess = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        // I have been informed about success, need to reset!
        setShowSaveSuccessMessage(false);
    }

    const onCloseError = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        // Reset after you have been informed so further actions can happen
        setShowFailureMessage(false);
    }

    // @ts-ignore
    const savePlayedMatch = async (request: PlayedMatchSaveRequest, {resetForm, setSubmitting}) => {
        const sendRequest = {
            ...request,
            clubOnePlayerMatchPerformance: request.clubOnePlayerMatchPerformance.map(
                playerPerformance => {
                    return {
                        ...playerPerformance,
                        player: {
                            playerId: playerPerformance.player.playerId
                        },
                    };
                }
            ),
            clubTwoPlayerMatchPerformance: request.clubTwoPlayerMatchPerformance.map(
                playerPerformance => {
                    return {
                        ...playerPerformance,
                        player: {
                            playerId: playerPerformance.player.playerId
                        },
                    };
                }
            ),
        };
        console.log("josipalog save player request", sendRequest);

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(sendRequest),
            headers: {
                authorization: token,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        };

        const response = await fetch("/matches/save/played", requestOptions);

        if (response.status === 200 || response.status === 201) {
            handleClickClose();
            resetForm();
            showSuccessMessage();
            onSuccess && onSuccess();
        } else {
            showErrorMessage();
        }
        setSubmitting(false);
    }

    const handleClickOpen = () => {
        // Opens dialog.
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
        onClose && onClose();
    }

    const classes = useStyles();

    return (
        <div>
            {match ?
                <IconButton color="secondary" onClick={handleClickOpen} size={"small"}>
                    <EditIcon/>
                </IconButton>
                :
                <>
                    <IconButton color="secondary" onClick={handleClickOpen} size={"small"}>
                        <AddCircle/> Stvori utakmicu
                    </IconButton>
                </>
            }
            <div>
                <Snackbar open={showSaveSuccessMessage} autoHideDuration={1500} onClose={onCloseSuccess}>
                    <Alert onClose={onCloseSuccess} severity="success">
                        Odigrana utakmica je uspješno spremljena.
                    </Alert>
                </Snackbar>
                <Snackbar open={showSaveFailureMessage} autoHideDuration={2000} onClose={onCloseError}>
                    <Alert onClose={onCloseError} severity="error">
                        Dogodila se pogreška prilikom spremanja odigrane utakmice. Pokušajte ponovno.
                    </Alert>
                </Snackbar>
            </div>
            <Formik
                enableReinitialize={true}
                initialValues={initialFormikValues}
                validationSchema={Yup.object().shape({
                    clubOne: Yup.string().required('Odaberite klub domaćin'),
                    clubTwo: Yup.string().required('Odaberite klub gost'),
                    clubOneGoals: Yup.number().min(0, 'Mora biti pozitivan broj').max(70, 'Broj golova mora biti realan'),
                    clubTwoGoals: Yup.number().min(0, 'Mora biti pozitivan broj').max(70, 'Broj golova mora biti realan'),
                    datePlayed: Yup.date().required('Unesite datum kada je utakmica odigrana').max(new Date(), 'Unesite datum kada je utakmica odigrana').nullable(),
                })}
                onSubmit={savePlayedMatch}
                validateOnBlur={true}
                validateOnChange={true}
                validateOnMount={true}>
                {(formik) => {
                    return (
                        <Dialog open={open}
                                onClose={(event, reason) => {
                                    if (reason === 'backdropClick') {
                                        return false;
                                    }
                                    handleClickClose();
                                    formik.handleReset();
                                }}
                                aria-labelledby="form-dialog-title"
                                className={classes.dialog} fullWidth
                                maxWidth={"lg"}>
                            <Form>
                                <DialogTitle id="form-dialog-title">
                                    {match ? "Uredite odigranu utakmicu" : "Stvorite odigranu utakmicu"}
                                </DialogTitle>
                                <DialogContent className={classes.contentContainer}>
                                    <Grid container spacing={4} direction="column" className={classes.contentContainer}>

                                        <Grid container item spacing={4} className={classes.contentContainer}
                                              direction="column">
                                            <Grid item>
                                                <FormControl className={classes.selectForm}>
                                                    <InputLabel id="club-select-label">Odaberite klub
                                                        domaćin</InputLabel>
                                                    <Select
                                                        disabled={match ? true : false}
                                                        labelId="club-select-label"
                                                        id="clubOne"
                                                        {...formik.getFieldProps('clubOne')}
                                                        onChange={async (e) => {
                                                            const valueToSet = e?.target?.value;
                                                            formik.handleChange("clubOne")(e);
                                                            console.log("logging formik.values.clubOne after handleChange " + formik.values.clubOne);
                                                            if (valueToSet) {
                                                                const players = await fetchClubPlayers(valueToSet as number);
                                                                const playersPerformance = createPlayerPerformanceForPlayers(players);
                                                                console.log("logging setting club one players to " + playersPerformance);
                                                                formik.setFieldValue("clubOnePlayerMatchPerformance",
                                                                    playersPerformance);
                                                                console.log("logging AFTER setting club one players " + formik.values.clubOnePlayerMatchPerformance);
                                                            }

                                                        }}>
                                                        {clubs.map((club: Club) => (
                                                            <MenuItem key={club.clubId} value={club.clubId}>
                                                                {club.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    {formik.errors.clubOne && formik.touched.clubOne ? <div
                                                        className={classes.style}>{formik.errors.clubOne}</div> : <></>}
                                                </FormControl>
                                            </Grid>
                                            {formik.values.clubOnePlayerMatchPerformance &&
                                            formik.values.clubOnePlayerMatchPerformance.length > 0 ?
                                                <Grid item>
                                                    <Accordion>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon/>}
                                                            id="player-match-performance-home-id">
                                                            <Typography variant={"caption"}
                                                                        color={"secondary"}>
                                                                Statistika igrača kluba domaćina
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Grid item container direction="column" spacing={2}>
                                                                {formik.values.clubOnePlayerMatchPerformance.map(
                                                                    (playerPerformanceCreate: PlayerPerformanceSave, index: number) => (
                                                                        <Grid item container spacing={2} direction="row"
                                                                              className={classes.root}
                                                                              key={playerPerformanceCreate.player.playerId}>
                                                                            <Grid item xs={2}>
                                                                                <Typography variant={"subtitle2"}>
                                                                                    {playerPerformanceCreate.player.firstName} {playerPerformanceCreate.player.lastName}
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid container item xs={10} spacing={1}
                                                                                  direction={"row"}>
                                                                                <Grid item xs={2}>
                                                                                    <TextField label="Golovi"
                                                                                               variant="outlined"
                                                                                               size="small"
                                                                                               id={`clubOnePlayerMatchPerformance.${index}.goals`}
                                                                                               InputProps={{
                                                                                                   style: {textAlign: "right"}
                                                                                               }}
                                                                                               {...formik.getFieldProps(`clubOnePlayerMatchPerformance.${index}.goals`)}/>
                                                                                </Grid>
                                                                                <Grid item xs={2}>
                                                                                    <TextField label="Asistencije"
                                                                                               variant="outlined"
                                                                                               size="small"
                                                                                               id={`clubOnePlayerMatchPerformance.${index}.assists`}
                                                                                               {...formik.getFieldProps(`clubOnePlayerMatchPerformance.${index}.assists`)}/>
                                                                                </Grid>
                                                                                <Grid item xs={2}>
                                                                                    <TextField
                                                                                        label="2 minute isključenja"
                                                                                        variant="outlined"
                                                                                        size="small"
                                                                                        id={`clubOnePlayerMatchPerformance.${index}.suspensions`}
                                                                                        {...formik.getFieldProps(`clubOnePlayerMatchPerformance.${index}.suspensions`)}/>
                                                                                </Grid>
                                                                                <Grid item xs={2}>
                                                                                    <TextField label="Obrane"
                                                                                               variant="outlined"
                                                                                               size="small"
                                                                                               id={`clubOnePlayerMatchPerformance.${index}.defenses`}
                                                                                               {...formik.getFieldProps(`clubOnePlayerMatchPerformance.${index}.defenses`)}/>
                                                                                </Grid>
                                                                                <Grid item xs={2}>
                                                                                    <TextField label="Izgubljene lopte"
                                                                                               variant="outlined"
                                                                                               size="small"
                                                                                               id={`clubOnePlayerMatchPerformance.${index}.turnovers`}
                                                                                               {...formik.getFieldProps(`clubOnePlayerMatchPerformance.${index}.turnovers`)}/>
                                                                                </Grid>
                                                                                <Grid item xs={2}>
                                                                                    <TextField label="Ukradene lopte"
                                                                                               variant="outlined"
                                                                                               size="small"
                                                                                               id={`clubOnePlayerMatchPerformance.${index}.stolen`}
                                                                                               {...formik.getFieldProps(`clubOnePlayerMatchPerformance.${index}.stolen`)}/>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    ))}
                                                            </Grid>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </Grid>
                                                :
                                                <></>
                                            }
                                        </Grid>


                                        <Grid container item spacing={4} className={classes.contentContainer}
                                              direction="column">
                                            <Grid item>
                                                <FormControl className={classes.selectForm}>
                                                    <InputLabel id="club-select-label">Odaberite klub
                                                        gost</InputLabel>
                                                    <Select
                                                        disabled={match ? true : false}
                                                        labelId="club-select-label"
                                                        id="clubTwo"
                                                        {...formik.getFieldProps('clubTwo')}
                                                        onChange={async (e) => {
                                                            const valueToSet = e?.target?.value;
                                                            formik.handleChange("clubTwo")(e);
                                                            console.log("logging formik.values.clubTwo after handleChange " + formik.values.clubTwo);
                                                            if (valueToSet) {
                                                                const players = await fetchClubPlayers(valueToSet as number);
                                                                const playersPerformance = createPlayerPerformanceForPlayers(players);
                                                                console.log("logging setting club one players to " + playersPerformance);
                                                                formik.setFieldValue("clubTwoPlayerMatchPerformance",
                                                                    playersPerformance);
                                                                console.log("logging AFTER setting club one players " + formik.values.clubTwoPlayerMatchPerformance);
                                                            }

                                                        }}>
                                                        {clubs.map((club: Club) => (
                                                            <MenuItem key={club.clubId} value={club.clubId}>
                                                                {club.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    {formik.errors.clubTwo && formik.touched.clubTwo ? <div
                                                        className={classes.style}>{formik.errors.clubTwo}</div> : <></>}
                                                </FormControl>
                                            </Grid>

                                            {formik.values.clubTwoPlayerMatchPerformance &&
                                            formik.values.clubTwoPlayerMatchPerformance.length > 0 ?
                                                <Grid item>
                                                    <Accordion>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon/>}
                                                            id="player-match-performance-home-id">
                                                            <Typography variant={"caption"}
                                                                        color={"secondary"}>
                                                                Statistika igrača kluba gost
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Grid item container direction="column" spacing={2}>
                                                                {formik.values.clubTwoPlayerMatchPerformance.map(
                                                                    (playerPerformanceCreate: PlayerPerformanceSave, index: number) => (
                                                                        <Grid item container spacing={2} direction="row"
                                                                              className={classes.root}
                                                                              key={playerPerformanceCreate.player.playerId}>
                                                                            <Grid item xs={2}>
                                                                                <Typography variant={"subtitle2"}>
                                                                                    {playerPerformanceCreate.player.firstName} {playerPerformanceCreate.player.lastName}
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid container item xs={10} spacing={1}
                                                                                  direction={"row"}>
                                                                                <Grid item xs={2}>
                                                                                    <TextField label="Golovi"
                                                                                               variant="outlined"
                                                                                               size="small"
                                                                                               id={`clubTwoPlayerMatchPerformance.${index}.goals`}
                                                                                               InputProps={{
                                                                                                   style: {textAlign: "right"}
                                                                                               }}
                                                                                               {...formik.getFieldProps(`clubTwoPlayerMatchPerformance.${index}.goals`)}/>
                                                                                </Grid>
                                                                                <Grid item xs={2}>
                                                                                    <TextField label="Asistencije"
                                                                                               variant="outlined"
                                                                                               size="small"
                                                                                               id={`clubTwoPlayerMatchPerformance.${index}.assists`}
                                                                                               {...formik.getFieldProps(`clubTwoPlayerMatchPerformance.${index}.assists`)}/>
                                                                                </Grid>
                                                                                <Grid item xs={2}>
                                                                                    <TextField
                                                                                        label="2 minute isključenja"
                                                                                        variant="outlined"
                                                                                        size="small"
                                                                                        id={`clubTwoPlayerMatchPerformance.${index}.suspensions`}
                                                                                        {...formik.getFieldProps(`clubTwoPlayerMatchPerformance.${index}.suspensions`)}/>
                                                                                </Grid>
                                                                                <Grid item xs={2}>
                                                                                    <TextField label="Obrane"
                                                                                               variant="outlined"
                                                                                               size="small"
                                                                                               id={`clubTwoPlayerMatchPerformance.${index}.defenses`}
                                                                                               {...formik.getFieldProps(`clubTwoPlayerMatchPerformance.${index}.defenses`)}/>
                                                                                </Grid>
                                                                                <Grid item xs={2}>
                                                                                    <TextField label="Izgubljene lopte"
                                                                                               variant="outlined"
                                                                                               size="small"
                                                                                               id={`clubTwoPlayerMatchPerformance.${index}.turnovers`}
                                                                                               {...formik.getFieldProps(`clubTwoPlayerMatchPerformance.${index}.turnovers`)}/>
                                                                                </Grid>
                                                                                <Grid item xs={2}>
                                                                                    <TextField label="Ukradene lopte"
                                                                                               variant="outlined"
                                                                                               size="small"
                                                                                               id={`clubTwoPlayerMatchPerformance.${index}.stolen`}
                                                                                               {...formik.getFieldProps(`clubTwoPlayerMatchPerformance.${index}.stolen`)}/>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    ))}
                                                            </Grid>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </Grid>
                                                :
                                                <></>
                                            }

                                        </Grid>

                                        <Grid container item spacing={4}>
                                            <Grid item>
                                                <TextField label="Golovi domaćin"
                                                           variant="outlined"
                                                           size="small"
                                                           name={"clubOneGoals"}
                                                           id={"clubOneGoals"}
                                                           {...formik.getFieldProps('clubOneGoals')}/>
                                                {formik.errors.clubOneGoals && formik.touched.clubOneGoals ? <div
                                                    className={classes.style}>{formik.errors.clubOneGoals}</div> : <></>}
                                            </Grid>
                                            <Grid item>
                                                <TextField label="Golovi gost"
                                                           variant="outlined"
                                                           size="small"
                                                           name={"clubTwoGoals"}
                                                           id={"clubTwoGoals"}
                                                           {...formik.getFieldProps('clubTwoGoals')}/>
                                                {formik.errors.clubTwoGoals && formik.touched.clubTwoGoals ? <div
                                                    className={classes.style}>{formik.errors.clubTwoGoals}</div> : <></>}
                                            </Grid>
                                        </Grid>


                                        <Grid item>
                                            <KeyboardDateTimePicker
                                                autoOk
                                                variant="inline"
                                                format="DD.MM.YYYY HH:mm"
                                                ampm={false}
                                                margin="normal"
                                                id="datePlayed"
                                                name="datePlayed"
                                                label="Datum i vrijeme"
                                                value={formik.values.datePlayed}
                                                onChange={value => formik.setFieldValue("datePlayed", value)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                            {formik.errors.datePlayed && formik.touched.datePlayed ? <div
                                                className={classes.style}>{formik.errors.datePlayed}</div> : <></>}
                                        </Grid>

                                        <Grid item>
                                            <FormControl fullWidth>
                                                <InputLabel id="referee-select-label">Odaberite suce
                                                    utakmice</InputLabel>
                                                <Select
                                                    labelId="referee-select-label"
                                                    id="matchReferees"
                                                    name={"matchReferees"}
                                                    multiple
                                                    autoWidth
                                                    {...formik.getFieldProps('matchReferees')}
                                                    onChange={(event) => {
                                                        const valueToSet = (event === null || event.target.value === null) ? [] : event.target.value;
                                                        formik.setFieldValue("matchReferees", valueToSet)
                                                    }}>
                                                    {referees.map((referee: Referee) => (
                                                        <MenuItem key={referee.refereeId} value={referee.refereeId}>
                                                            {referee.firstName + " " + referee.lastName}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                    </Grid>
                                </DialogContent>

                                <DialogActions>
                                    <Button onClick={() => {
                                        handleClickClose();
                                        formik.handleReset();
                                    }} color="primary">
                                        ODUSTANI
                                    </Button>
                                    <Button type="submit" color="secondary"
                                            disabled={formik.isSubmitting}>
                                        SPREMI
                                    </Button>
                                </DialogActions>
                            </Form>
                        </Dialog>
                    );
                }}
            </Formik>
        </div>
    );
};