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
    Snackbar
} from "@material-ui/core";
import AddCircle from "@material-ui/icons/AddCircle";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {KeyboardDateTimePicker} from "@material-ui/pickers";
import {Club} from "../../competitions/models/Club";
import {Referee} from "../../competitions/models/Referee";
import {useSelector} from "react-redux";
import {MainReducer} from "../../../store/reducer";
import {
    emptyScheduledMatchSaveRequest,
    fromScheduledMatch,
    ScheduledMatchSaveRequest
} from "./models/ScheduledMatchSaveRequest";
import {ScheduledMatch} from "../../competitions/models/ScheduledMatch";
import EditIcon from "@material-ui/icons/Edit";

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
    onClose?: () => void,
    competitionId: number,
    match?: ScheduledMatch,
    opened?: boolean,
}

export default function ScheduledMatchSave({onSuccess, competitionId, match, onClose, opened}: Props) {
    const {token} = useSelector((state: MainReducer) => state.authReducer);
    // Dialog opened state
    const [open, setOpen] = useState(opened || false);
    // Our request has succeeded, used to show snackbar for success
    const [showSaveSuccessMessage, setShowSaveSuccessMessage] = useState(false);
    // Our request has failed,used to show snackbar for error
    const [showSaveFailureMessage, setShowSaveFailureMessage] = useState(false);

    const [clubs, setClubs] = useState<Club[]>([]);
    const [referees, setReferees] = useState<Referee[]>([]);

    const createInitialFormikValues = (): ScheduledMatchSaveRequest => {
        if (match) {
            return fromScheduledMatch(match);
        }
        return emptyScheduledMatchSaveRequest(competitionId);
    }

    const [initialFormikValues, setInitialFormikValues] = useState(createInitialFormikValues());


    useEffect(() => {
        console.log("smatchlog ScheduledMatchSave open changed");
        if (open) {
            init();
            setInitialFormikValues(createInitialFormikValues);
        }
    }, [open])

    const init = () => {
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

    const showSuccessMessage = () => {
        setShowSaveSuccessMessage(true);
    }

    const showErrorMessage = () => {
        setShowSaveFailureMessage(true);
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
        setShowSaveFailureMessage(false);
    }

    // @ts-ignore
    const saveScheduledMatch = async (request: ScheduledMatchSaveRequest, {resetForm, setSubmitting}) => {
        const sendRequest = {
            ...request,
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

        const response = await fetch("/matches/save/scheduled", requestOptions);

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
                        <AddCircle/> Stvori zakazanu utakmicu
                    </IconButton>
                </>
            }
            <div>
                <Snackbar open={showSaveSuccessMessage} autoHideDuration={1500} onClose={onCloseSuccess}>
                    <Alert onClose={onCloseSuccess} severity="success">
                        Zakazana utakmica je uspješno spremljena.
                    </Alert>
                </Snackbar>
                <Snackbar open={showSaveFailureMessage} autoHideDuration={2000} onClose={onCloseError}>
                    <Alert onClose={onCloseError} severity="error">
                        Dogodila se pogreška prilikom spremanja zakazane utakmice. Pokušajte ponovno.
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
                    datePlayed: Yup.date().required('Unesite datum kada je utakmica odigrana').min(new Date(), 'Unesite ispravan datum kada je utakmica odigrana').nullable(),
                })}
                onSubmit={saveScheduledMatch}
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
                                    {match ? "Uredite zakazanu utakmicu" : "Stvorite zakazanu utakmicu"}
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
                                                            formik.handleChange("clubOne")(e);
                                                            console.log("logging formik.values.clubOne after handleChange " + formik.values.clubOne);
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
                                        </Grid>


                                        <Grid container item spacing={4} className={classes.contentContainer}
                                              direction="column">
                                            <Grid item>
                                                <FormControl className={classes.selectForm}>
                                                    <InputLabel id="club-select-label">Odaberite klub
                                                        gost</InputLabel>
                                                    <Select
                                                        labelId="club-select-label"
                                                        id="clubTwo"
                                                        {...formik.getFieldProps('clubTwo')}
                                                        onChange={async (e) => {
                                                            formik.handleChange("clubTwo")(e);
                                                            console.log("logging formik.values.clubTwo after handleChange " + formik.values.clubTwo);
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
                                                    disabled={match ? true : false}
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