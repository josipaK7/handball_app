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
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField
} from "@material-ui/core";
import AddCircle from "@material-ui/icons/AddCircle";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {Club} from "../../competitions/models/Club";
import {useSelector} from "react-redux";
import {MainReducer} from "../../../store/reducer";
import {Player} from "../../competitions/models/Player";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {AddAPhotoOutlined} from "@material-ui/icons";
import Compress from "react-image-file-resizer";
import {emptyPlayerSaveRequest, fromPlayer, PlayerSaveRequest} from "./models/PlayerSaveRequest";
import {Position} from "../../competitions/models/Position";
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
        },
        paddingTop: {
            paddingTop: '10px'
        }
    })
);

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props}/>
}

interface Props {
    onSuccess?: () => void,
    onClose?: () => void,
    player?: Player,
}

export default function PlayerSave({onSuccess, onClose, player}: Props) {
    const {token} = useSelector((state: MainReducer) => state.authReducer);
    const [open, setOpen] = useState(false);
    // Our request has succeeded, used to show snackbar for success
    const [showSaveSuccessMessage, setShowSaveSuccessMessage] = useState(false);
    // Our request has failed,used to show snackbar for error
    const [showSaveErrorMessage, setShowSaveErrorMessage] = useState(false);

    const [newImage, setNewImage] = useState(player ? player.image : "");

    const [clubs, setClubs] = useState<Club[]>([]);
    const [positions, setPositions] = useState<Position[]>([]);

    const createInitialFormikValues = (): PlayerSaveRequest => {
        if (player) {
            const initialPlayerSaveRequest = fromPlayer(player);
            console.log("savelog initial player save request exists", initialPlayerSaveRequest);
            return initialPlayerSaveRequest;
        }
        return emptyPlayerSaveRequest();
    }

    const [initialFormikValues, setInitialFormikValues] = useState(createInitialFormikValues());

    console.log("josipalog intial formik values player club " + initialFormikValues.club);

    useEffect(() => {
        if (open) {
            init();
            setInitialFormikValues(createInitialFormikValues);
        }
    }, [open]);

    const init = () => {
        loadPositions();
        loadClubs();
    };

    const loadPositions = () => {
        fetch("/positions/all", {
            method: "GET",
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((positions) => {
                    console.log("JOSIPALOG dohvatili positions ", positions);
                    setPositions(positions);
                })
            }
        })
    };

    const loadClubs = () => {
        fetch("/clubs/all", {
            method: "GET",
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((clubs) => {
                    console.log("JOSIPALOG dohvatili clubs ", clubs);
                    setClubs(clubs);
                });
            }
        })
    };

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
    const savePlayer = async (request: PlayerSaveRequest, {resetForm, setSubmitting}) => {
        const sendRequest = {
            ...request,
            image: newImage.split(",")[1],
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

        const response = await fetch("/players/save", requestOptions);

        if (response.status === 200 || response.status === 201) {
            setOpen(false);
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
            {player ?
                <IconButton color="secondary" onClick={handleClickOpen} size={"medium"}>
                    <EditIcon/>
                </IconButton>
                :
                <>
                    <IconButton color="secondary" onClick={handleClickOpen} size={"medium"}>
                        <AddCircle/> Stvorite novog igrača
                    </IconButton>
                </>
            }
            <div>
                <Snackbar open={showSaveSuccessMessage} autoHideDuration={1500} onClose={onCloseSuccess}>
                    <Alert onClose={onCloseSuccess} severity="success">
                        Promjene igrača su uspješno spremljene.
                    </Alert>
                </Snackbar>
                <Snackbar open={showSaveErrorMessage} autoHideDuration={2000} onClose={onCloseError}>
                    <Alert onClose={onCloseError} severity="error">
                        Dogodila se pogreška prilikom spremanja igrača. Pokušajte ponovno.
                    </Alert>
                </Snackbar>
            </div>
            <Formik
                enableReinitialize={true}
                initialValues={initialFormikValues}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().required('Unesite ime igrača'),
                    lastName: Yup.string().required('Unesite prezime igrača'),
                    dateOfBirth: Yup.date().required('Unesi datum rođenja igrača').nullable(),
                    height: Yup.number().required('Unesite visinu igrača (cm)').min(0, 'Visina mora biti pozitivna').max(300, 'Visina ne smije biti nemoguća'),
                    weight: Yup.number().required('Unesite težinu igrača (kg)').min(0, 'Težina mora biti pozitivna').max(400, 'Težina ne smije biti nemoguća'),
                    originCountry: Yup.string().required('Unesite državu rođenja'),
                    club: Yup.number().nullable(),
                    positions: Yup.array().notRequired(),
                })}
                onSubmit={savePlayer}
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
                                className={classes.dialog} fullWidth>
                            <Form>
                                <DialogTitle id="form-dialog-title">
                                    {player ? "Uredite igrača" : "Stvorite novog igrača"}
                                </DialogTitle>
                                <DialogContent className={classes.contentContainer}>
                                    <Grid container spacing={4} direction="column" className={classes.contentContainer}>
                                        <Grid container item className={classes.contentContainer} direction="row">
                                            <Grid item xs={6}>
                                                <TextField label="Ime"
                                                           variant="outlined"
                                                           size="small"
                                                           name={"firstName"}
                                                           id={"firstName"}
                                                           {...formik.getFieldProps('firstName')}/>
                                                {formik.errors.firstName && formik.touched.firstName ?
                                                    <div
                                                        className={classes.style}>{formik.errors.firstName}</div> : <></>}
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField label="Prezime"
                                                           variant="outlined"
                                                           size="small"
                                                           name={"lastName"}
                                                           id={"lastName"}
                                                           {...formik.getFieldProps('lastName')}/>
                                                {formik.errors.lastName && formik.touched.lastName ?
                                                    <div
                                                        className={classes.style}>{formik.errors.lastName}</div> : <></>}
                                            </Grid>
                                        </Grid>

                                        <Grid container item spacing={4} className={classes.contentContainer}>
                                            <Grid item>
                                                <KeyboardDatePicker
                                                    autoOk
                                                    variant="inline"
                                                    format="DD.MM.YYYY"
                                                    margin="normal"
                                                    id="dateOfBirth"
                                                    name="dateOfBirth"
                                                    label="Datum rođenja"
                                                    value={formik.values.dateOfBirth}
                                                    onChange={value => formik.setFieldValue("dateOfBirth", value)}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                                {formik.errors.dateOfBirth && formik.touched.dateOfBirth ? <div
                                                    className={classes.style}>{formik.errors.dateOfBirth}</div> : <></>}
                                            </Grid>
                                            <Grid item xs={6}>

                                            </Grid>
                                        </Grid>
                                        <Grid item container spacing={4} className={classes.contentContainer}>
                                            <Grid item>
                                                <TextField label="Država rođenja"
                                                           variant="outlined"
                                                           size="small"
                                                           name={"originCountry"}
                                                           id={"originCountry"}
                                                           {...formik.getFieldProps('originCountry')}/>
                                                {formik.errors.originCountry && formik.touched.originCountry ? <div
                                                    className={classes.style}>{formik.errors.originCountry}</div> : <></>}
                                            </Grid>
                                        </Grid>
                                        <Grid container item spacing={4} className={classes.contentContainer}>
                                            <Grid item>
                                                <TextField
                                                    label="Visina"
                                                    id="height"
                                                    InputProps={{
                                                        endAdornment: <InputAdornment
                                                            position="end">cm</InputAdornment>,
                                                    }}
                                                    variant="outlined"
                                                    {...formik.getFieldProps('height')}/>
                                                {formik.errors.height && formik.touched.height ?
                                                    <div className={classes.style}>{formik.errors.height}</div> : <></>}
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    label="Težina"
                                                    id="weight"
                                                    InputProps={{
                                                        endAdornment: <InputAdornment
                                                            position="end">kg</InputAdornment>,
                                                    }}
                                                    variant="outlined"
                                                    {...formik.getFieldProps('weight')}/>
                                                {formik.errors.weight && formik.touched.weight ?
                                                    <div className={classes.style}>{formik.errors.weight}</div> : <></>}
                                            </Grid>
                                        </Grid>
                                        <Grid container item spacing={4} className={classes.contentContainer}>
                                            <Grid item>
                                                <FormControl className={classes.selectForm}>
                                                    <InputLabel id="club-select-label">Odaberite klub</InputLabel>
                                                    <Select
                                                        labelId="club-select-label"
                                                        id="club"
                                                        name={"club"}
                                                        {...formik.getFieldProps('club')}
                                                        onChange={(event) => {
                                                            const valueToSet = (event === null || event.target.value === null) ? [] : event.target.value;
                                                            formik.setFieldValue("club", valueToSet)
                                                        }}>
                                                        {clubs.map((club: Club) => (
                                                            <MenuItem key={club.clubId} value={club.clubId}>
                                                                {club.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid container item spacing={4} className={classes.contentContainer}>
                                            <Grid item>
                                                <FormControl className={classes.selectForm}>
                                                    <InputLabel id="position-select-label">Odaberite
                                                        poziciju</InputLabel>
                                                    <Select
                                                        labelId="position-select-label"
                                                        id="positions"
                                                        name={"positions"}
                                                        multiple
                                                        {...formik.getFieldProps('positions')}
                                                        onChange={(event) => {
                                                            const valueToSet = (event === null || event.target.value === null) ? [] : event.target.value;
                                                            formik.setFieldValue("positions", valueToSet)
                                                        }}>
                                                        {positions.map((position: Position) => (
                                                            <MenuItem key={position.positionId}
                                                                      value={position.positionId}>
                                                                {position.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item>
                                                <FormControl className={classes.selectForm}>
                                                    <InputLabel id="preferred-hand-label">Odaberite ruku</InputLabel>
                                                    <Select
                                                        labelId="preferred-hand-label"
                                                        id="preferredHand"
                                                        name={"positions"}
                                                        {...formik.getFieldProps('preferredHand')}>
                                                        <MenuItem value={"desna ruka"}>desna ruka</MenuItem>
                                                        <MenuItem value={"lijeva ruka"}>lijeva ruka</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            {newImage ?
                                                <div>
                                                    <img
                                                        style={{display: "block"}}
                                                        src={newImage}
                                                        alt="Slika igrača"
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
                        </Dialog>
                    );
                }}
            </Formik>
        </>
    );
};