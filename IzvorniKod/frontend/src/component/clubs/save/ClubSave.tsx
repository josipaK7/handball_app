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
    TextareaAutosize,
    TextField
} from "@material-ui/core";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {Club} from "../../competitions/models/Club";
import {useSelector} from "react-redux";
import {MainReducer} from "../../../store/reducer";
import {Coach} from "../../competitions/models/Coach";
import {Competition} from "../../competitions/models/Competition";
import {Player} from "../../competitions/models/Player";
import {ClubSaveRequest, emptyClubSaveRequest, fromClub} from "./models/ClubSaveRequest";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {AddAPhotoOutlined} from "@material-ui/icons";
import Compress from "react-image-file-resizer";
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
    onClose?: () => void,
    club?: Club,
}

export default function ClubSave({onSuccess, onClose, club}: Props) {
    const {token} = useSelector((state: MainReducer) => state.authReducer);
    const [open, setOpen] = useState(false);
    // Our request has succeeded, used to show snackbar for success
    const [showSaveSuccessMessage, setShowSaveSuccessMessage] = useState(false);
    // Our request has failed,used to show snackbar for error
    const [showSaveErrorMessage, setShowSaveErrorMessage] = useState(false);

    const [newImage, setNewImage] = useState(club ? club.image : "");

    const [clubCoaches, setClubCoaches] = useState<Coach[]>([]);
    const [clubCompetitions, setClubCompetitions] = useState<Competition[]>([]);
    const [clubPlayers, setClubPlayers] = useState<Player[]>([]);

    const createInitialFormikValues = (): ClubSaveRequest => {
        if (club) {
            const initialClubSaveRequest = fromClub(club);
            console.log("clubslog initial club save request exists", initialClubSaveRequest);
            return initialClubSaveRequest;
        }
        return emptyClubSaveRequest();
    }

    const [initialFormikValues, setInitialFormikValues] = useState(createInitialFormikValues());

    useEffect(() => {
        if (open) {
            console.log("clubslog ClubSave open , club = ", club);
            init();
            setInitialFormikValues(createInitialFormikValues);
        }
    }, [open]);

    const init = () => {
        loadCoaches();
        loadCompetitions();
        loadPlayers();
    }

    const loadCoaches = () => {
        fetch("/coaches/allFreeCoaches", {
            method: "GET",
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((clubCoaches) => {
                    console.log("JOSIPALOG dohvatili coaches ", clubCoaches);
                    if (club) {
                        setClubCoaches(clubCoaches.concat(club.clubCoaches));
                    } else {
                        setClubCoaches(clubCoaches);
                    }
                })
            }
        })
    }

    const loadCompetitions = () => {
        fetch("/competitions/all", {
            method: "GET",
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((clubCompetitions) => {
                    console.log("JOSIPALOG dohvatili competitions ", clubCompetitions);
                    setClubCompetitions(clubCompetitions);
                })
            }
        })
    }

    const loadPlayers = () => {
        fetch("/players/allFreePlayers", {
            method: "GET",
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((clubPlayers) => {
                    console.log("JOSIPALOG dohvatili players bla", clubPlayers);
                    if (club) {
                        setClubPlayers(clubPlayers.concat(club.clubPlayers))
                    } else {
                        setClubPlayers(clubPlayers);
                    }
                })
            }
        })
    }

    const showSuccessMessage = () => {
        setShowSaveSuccessMessage(true);
    }

    const showErrorMessage = () => {
        setShowSaveErrorMessage(true);
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
        setShowSaveErrorMessage(false);
    }

    // @ts-ignore
    const saveClub = async (request: ClubSaveRequest, {resetForm, setSubmitting}) => {

        console.log("clublog newImage ", newImage);

        const sendRequest = {
            ...request,
            image: newImage.split(",")[1],
        };
        console.log("josipalog save club request", sendRequest);

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(sendRequest),
            headers: {
                authorization: token,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        };

        const response = await fetch("/clubs/save", requestOptions);

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

    const showImage = (event: any) => {
        if (!event) return;
        let file = event.target.files[0];
        console.log(file);
        Compress.imageFileResizer(
            file, 300, 300, "JPEG", 100, 0, (uri) => {
                console.log(uri)

                let reader = new FileReader();
                if (uri !== undefined)
                    reader.readAsDataURL(uri as Blob);

                reader.onload = function (newImage) {
                    setNewImage(newImage?.target?.result as string);

                };
            }, "blob"
        );
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
        <>
            {club ?
                <IconButton color="secondary" onClick={handleClickOpen} size={"medium"}>
                    <EditIcon/>
                </IconButton>
                :
                <>
                    <IconButton color="secondary" onClick={handleClickOpen} size={"medium"}>
                        <AddCircle/> Stvorite novi klub
                    </IconButton>
                </>
            }
            <div>
                <Snackbar open={showSaveSuccessMessage} autoHideDuration={1500} onClose={onCloseSuccess}>
                    <Alert onClose={onCloseSuccess} severity="success">
                        Promjene su uspješno spremljene.
                    </Alert>
                </Snackbar>
                <Snackbar open={showSaveErrorMessage} autoHideDuration={2000} onClose={onCloseError}>
                    <Alert onClose={onCloseError} severity="error">
                        Dogodila se pogreška prilikom spremanja kluba. Pokušajte ponovno.
                    </Alert>
                </Snackbar>
            </div>
            <Formik
                enableReinitialize={true}
                initialValues={initialFormikValues}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('Unesite ime kluba'),
                    description: Yup.string().max(1000, 'Opis kluba je prevelik, mora biti manji od 1000 znakova'),
                    place: Yup.string().required('Unesite mjesto kluba'),
                    establishmentDate: Yup.date().required('Unesite datum osnutka kluba').nullable(),
                    clubCoaches: Yup.array().notRequired(),
                    clubCompetitions: Yup.string().notRequired(),
                    clubPlayers: Yup.array().notRequired(),
                })}
                onSubmit={saveClub}
                validateOnBlur={true}
                validateOnChange={true}
                validateOnMount={true}>
                {(formik) => {
                    return <Dialog open={open}
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
                                {club ? "Uredite klub" : "Stvorite novi klub"}
                            </DialogTitle>
                            <DialogContent>
                                <Grid container className={classes.contentContainer} direction="column" spacing={3}>

                                    <Grid item>
                                        <TextField label="Ime kluba"
                                                   variant="outlined"
                                                   size="small"
                                                   id={"name"}
                                                   {...formik.getFieldProps('name')}/>
                                        {formik.errors.name && formik.touched.name ?
                                            <div className={classes.style}>{formik.errors.name}</div> : <></>}
                                    </Grid>

                                    <Grid item>
                                        <TextareaAutosize aria-label="minimum height"
                                                          cols={50}
                                                          minRows={3}
                                                          placeholder="Informacije o klubu"
                                                          {...formik.getFieldProps('description')}/>
                                        {formik.errors.description && formik.touched.description ? <div
                                            className={classes.style}>{formik.errors.description}</div> : <></>}
                                    </Grid>

                                    <Grid item>
                                        <TextField label="Mjesto"
                                                   variant="outlined"
                                                   size="small"
                                                   id={"place"}
                                                   {...formik.getFieldProps('place')}/>
                                        {formik.errors.place && formik.touched.place ? <div
                                            className={classes.style}>{formik.errors.place}</div> : <></>}
                                    </Grid>

                                    <Grid item>
                                        <KeyboardDatePicker
                                            autoOk
                                            variant="inline"
                                            format="DD.MM.YYYY"
                                            margin="normal"
                                            id="establishmentDate"
                                            name="establishmentDate"
                                            label="Datum osnutka"
                                            value={formik.values.establishmentDate}
                                            onChange={value => formik.setFieldValue("establishmentDate", value)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                        {formik.errors.establishmentDate && formik.touched.establishmentDate ? <div
                                            className={classes.style}>{formik.errors.establishmentDate}</div> : <></>}
                                    </Grid>
                                    <Grid item>
                                        <FormControl className={classes.selectForm}>
                                            <InputLabel id="coach-select-label">Odaberite trenere</InputLabel>
                                            <Select
                                                labelId="coach-select-label"
                                                id="clubCoaches"
                                                name={"clubCoaches"}
                                                multiple
                                                autoWidth
                                                {...formik.getFieldProps('clubCoaches')}
                                                onChange={(event) => {
                                                    const valueToSet = event === null || event.target.value === null ? [] : event.target.value;
                                                    formik.setFieldValue("clubCoaches", valueToSet)
                                                }}>
                                                {clubCoaches.map((coach: Coach) => <MenuItem key={coach.coachId}
                                                                                             value={coach.coachId}>
                                                    {coach.firstName + " " + coach.lastName}
                                                </MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item>
                                        <FormControl className={classes.selectForm}>
                                            <InputLabel id="competition-select-label">Odaberite natjecanja</InputLabel>
                                            <Select
                                                labelId="competition-select-label"
                                                id="clubCompetitions"
                                                multiple
                                                {...formik.getFieldProps('clubCompetitions')}
                                                onChange={(event) => {
                                                    const valueToSet = event === null || event.target.value === null ? [] : event.target.value;
                                                    formik.setFieldValue("clubCompetitions", valueToSet)
                                                }}>
                                                {clubCompetitions.map((competition: Competition) => <MenuItem
                                                    key={competition.competitionId} value={competition.competitionId}>
                                                    {competition.name}
                                                </MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item>
                                        <FormControl className={classes.selectForm}>
                                            <InputLabel id="players-select-label">Odaberite igrače</InputLabel>
                                            <Select
                                                labelId="players-select-label"
                                                id="clubPlayers"
                                                multiple
                                                {...formik.getFieldProps('clubPlayers')}
                                                onChange={(event) => {
                                                    const valueToSet = event === null || event.target.value === null ? [] : event.target.value;
                                                    formik.setFieldValue("clubPlayers", valueToSet)
                                                }}>
                                                {clubPlayers.map((player: Player) => <MenuItem key={player.playerId}
                                                                                               value={player.playerId}>
                                                    {player.firstName + " " + player.lastName}
                                                </MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item>
                                        {newImage ?
                                            <div>
                                                <img
                                                    style={{display: "block"}}
                                                    src={newImage}
                                                    alt="Slika kluba"
                                                />
                                                <span className={"remove-picture"}
                                                      onClick={() => setNewImage("")}>
                                                    <DeleteForeverIcon/>
                                                </span>

                                            </div>
                                            :
                                            <>
                                                <label htmlFor="icon-button-file">
                                                    <IconButton color="primary" aria-label="upload picture"
                                                                component="span">
                                                        <AddAPhotoOutlined/>
                                                    </IconButton>
                                                    <input accept={"image/*"}
                                                           id={"icon-button-file"}
                                                           type="file"
                                                           hidden
                                                           onChange={(event) => {
                                                               showImage(event)
                                                               event.target.value = ""
                                                           }}
                                                    />
                                                </label>
                                            </>
                                        }
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
                    </Dialog>;
                }}
            </Formik>
        </>
    );
};