import React, {useEffect, useState} from 'react';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {CompetitionSaveRequest, emptyCompetitionCreateRequest, fromCompetition} from "./model/CompetitionSaveRequest";
import Compress from "react-image-file-resizer";
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
import {Form, Formik} from "formik";
import {AddAPhotoOutlined} from "@material-ui/icons";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {KeyboardDatePicker,} from '@material-ui/pickers';
import * as Yup from 'yup';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {MainReducer} from "../../../store/reducer";
import {Club} from "../models/Club";
import {Competition} from "../models/Competition";
import EditIcon from "@material-ui/icons/Edit";
import AddCircle from "@material-ui/icons/AddCircle";

const useStyles = makeStyles(() =>
    createStyles({
        style: {
            color: 'red',
            fontSize: '1rem',
        },
        paddingBottom: {
            paddingBottom: '35px',
        },
        selectForm: {
            maxWidth: 200,
            minWidth: 200,
        },
    })
);

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props}/>
}

interface Props {
    onSuccess?: () => void,
    onClose?: () => void,
    competition?: Competition,
}

export default function CompetitionSave({competition, onSuccess, onClose}: Props) {
    const [open, setOpen] = useState(false);
    // Our request has succeeded, used to show snackbar for success
    const [success, setSuccess] = useState(false);
    // Our request has failed,used to show snackbar for error
    const [error, setError] = useState(false);
    const [newImage, setNewImage] = useState(competition ? competition.image : "");

    const {token} = useSelector((state: MainReducer) => state.authReducer);

    const [clubs, setClubs] = useState<Club[]>([]);

    const createInitialFormikValues = (): CompetitionSaveRequest => {
        if (competition) {
            const c = fromCompetition(competition);
            console.log("competitionlog createInitialFormikValues from Competition ", c);
            return c;
        }
        console.log("competitionlog createInitialFormikValues empty ");
        return emptyCompetitionCreateRequest();
    }

    const [initialFormikValues, setInitialFormikValues] = useState(createInitialFormikValues());

    const fetchAllClubs = () => {
        if (!clubs || clubs.length === 0) {
            fetch("/clubs/all", {
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

    useEffect(() => {
        if (open) {
            init();
            setInitialFormikValues(createInitialFormikValues);
        }
    }, [open]);

    const init = () => {
        console.log("competitionlog competition save init");
        fetchAllClubs();
    }

    const successMessage = () => {
        setSuccess(true);
    }

    const errorMessage = () => {
        setError(true);
    }

    const onCloseSuccess = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        // I have been informed about success, need to reset!
        setSuccess(false);
    }

    const onCloseError = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        // Reset after you have been informed so further actions can happen
        setError(false);
    }

    // @ts-ignore
    const saveCompetition = async (request: CompetitionSaveRequest, {resetForm, setSubmitting}) => {
        const sendRequest = {
            ...request,
            image: newImage.split(",")[1],
        };

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(sendRequest),
            headers: {
                authorization: token,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        };

        const response = await fetch("/competitions/save", requestOptions);

        if (response.status === 200 || response.status === 201) {
            handleClickClose();
            resetForm();
            successMessage();
            onSuccess && onSuccess();
        } else {
            errorMessage();
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
        setNewImage("");
        onClose && onClose();
    }

    const classes = useStyles();

    return (
        <>
            {competition ?
                <IconButton color="secondary" onClick={handleClickOpen}>
                    <EditIcon/>
                </IconButton>
                :
                <>
                    <IconButton color="secondary" onClick={handleClickOpen}>
                        <AddCircle/> Novo natjecanje
                    </IconButton>
                </>
            }
            <div>
                <Snackbar open={success} autoHideDuration={1500} onClose={onCloseSuccess}>
                    <Alert onClose={onCloseSuccess} severity="success">
                        Promjene su uspješno spremljene.
                    </Alert>
                </Snackbar>
                <Snackbar open={error} autoHideDuration={2000} onClose={onCloseError}>
                    <Alert onClose={onCloseError} severity="error">
                        Dogodila se pogreška prilikom spremanja natjecanja. Pokušajte ponovno.
                    </Alert>
                </Snackbar>
            </div>
            <Formik
                enableReinitialize={true}
                initialValues={initialFormikValues}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('Unesite naziv natjecanja'),
                    description: Yup.string().max(1000, 'Opis natjecanja je prevelik, mora biti manji od 1000 znakova'),
                    dateFrom: Yup.date().required('Unesite datum početka natjecanja').nullable(),
                    dateTo: Yup.date().min(
                        Yup.ref('dateFrom'),
                        "Datum završetka natjecanja ne može biti prije datuma početka"
                    ).required('Unesite datum završetka natjecanja').nullable()
                })}
                onSubmit={saveCompetition} onReset={handleClickClose}
                validateOnBlur={true}
                validateOnChange={true}
                validateOnMount={true}>
                {(formik) => {
                    return (
                        <Dialog open={open} onClose={(event, reason) => {
                            if (reason === 'backdropClick') {
                                return false;
                            }
                            handleClickClose();
                            formik.handleReset();
                        }} aria-labelledby="form-dialog-title">
                            <Form>
                                <DialogTitle id="form-dialog-title">
                                    Stvorite novo natjecanje
                                </DialogTitle>
                                <DialogContent>
                                    <Grid>
                                        <Grid item className={classes.paddingBottom}>
                                            <TextField label="Naziv"
                                                       variant="outlined"
                                                       size="small"
                                                       name={"name"}
                                                       id={"name"}
                                                       {...formik.getFieldProps('name')}/>
                                            {formik.errors.name && formik.touched.name ?
                                                <div className={classes.style}>{formik.errors.name}</div> : <></>}
                                        </Grid>
                                        <Grid item>
                                            <TextareaAutosize aria-label="minimum height"
                                                              cols={50}
                                                              minRows={3}
                                                              placeholder="Opis natjecanja"
                                                              {...formik.getFieldProps('description')}/>
                                            {formik.errors.description && formik.touched.description ? <div
                                                className={classes.style}>{formik.errors.description}</div> : <></>}
                                        </Grid>
                                        <Grid item>
                                            <KeyboardDatePicker
                                                autoOk
                                                variant="inline"
                                                format="DD.MM.YYYY"
                                                margin="normal"
                                                id="dateFrom"
                                                name="dateFrom"
                                                label="Datum početka"
                                                value={formik.values.dateFrom}
                                                onChange={value => formik.setFieldValue("dateFrom", value)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                            {formik.errors.dateFrom && formik.touched.dateFrom ?
                                                <div className={classes.style}>{formik.errors.dateFrom}</div> : <></>}
                                        </Grid>
                                        <Grid item className={classes.paddingBottom}>
                                            <KeyboardDatePicker
                                                autoOk
                                                variant="inline"
                                                format="DD.MM.YYYY"
                                                margin="normal"
                                                id="dateTo"
                                                name="dateTo"
                                                label="Datum završetka"
                                                value={formik.values.dateTo}
                                                onChange={value => formik.setFieldValue("dateTo", value)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                            {formik.errors.dateTo && formik.touched.dateTo ?
                                                <div className={classes.style}>{formik.errors.dateTo}</div> : <></>}
                                        </Grid>

                                        <Grid item className={classes.paddingBottom}>
                                            <FormControl className={classes.selectForm}>
                                                <InputLabel id="club-select-label">Odaberite klubove</InputLabel>
                                                <Select
                                                    labelId="club-select-label"
                                                    id="clubIds"
                                                    name={"clubIds"}
                                                    multiple
                                                    {...formik.getFieldProps('clubIds')}
                                                    onChange={(event) => {
                                                        const valueToSet = (event === null || event.target.value === null) ? [] : event.target.value;
                                                        formik.setFieldValue("clubIds", valueToSet)
                                                    }}>
                                                    {clubs.map((club: Club) => (
                                                        <MenuItem key={club.clubId} value={club.clubId}>
                                                            {club.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item>
                                            {newImage ?
                                                <div>
                                                    <img
                                                        style={{display: "block"}}
                                                        src={newImage}
                                                        alt="Slika natjecanja"
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
}