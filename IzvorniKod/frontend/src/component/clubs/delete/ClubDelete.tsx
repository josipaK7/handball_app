import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar} from "@material-ui/core";
import {useHistory} from "react-router";
import DeleteIcon from "@material-ui/icons/Delete";


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props}/>
}

interface Props {
    clubId: number,
}

export default function ClubDelete({clubId}: Props) {
    const [open, setOpen] = useState(false);
    // Our request has succeeded, used to show snackbar for success
    const [success, setSuccess] = useState(false);
    // Our request has failed,used to show snackbar for error
    const [error, setError] = useState(false);

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

    const history = useHistory();

    const deleteClub = async () => {
        const requestOptions = {
            method: "DELETE",
        };
        const response = await fetch("/clubs/delete/" + clubId, requestOptions);

        if (response.status === 200) {
            successMessage();
            history.push("/");
        } else {
            errorMessage();
        }
    }

    const handleClickOpen = () => {
        // Opens dialog.
        setOpen(true);
    }

    const handleClickClose = () => {
        // Close dialog.
        setOpen(false);
    }

    return (
        <>
            <div>
                <IconButton color="secondary" onClick={handleClickOpen}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <div>
                <Dialog open={open} onClose={(event, reason) => {
                    if (reason === 'backdropClick') {
                        return false;
                    }
                    handleClickClose();
                }} aria-labelledby="form-dialog-title">
                    <DialogTitle id="confirmation-dialog-title">
                        Obrišite klub
                    </DialogTitle>
                    <DialogContent dividers>
                        Ako obrišete klub, obrisat će se sve utakmice u kojima klub sudjeluje i bit ćete preusmjereni na
                        početnu stranicu.
                        Jeste li sigurni?
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClickClose} color="primary">
                            ODUSTANI
                        </Button>
                        <Button onClick={deleteClub} color="primary">
                            OBRIŠI
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Snackbar open={success} autoHideDuration={1500} onClose={onCloseSuccess}>
                <Alert onClose={onCloseSuccess} severity="success">
                    Klub je uspješno obrisan.
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={2000} onClose={onCloseError}>
                <Alert onClose={onCloseError} severity="error">
                    Dogodila se pogreška prilikom brisanja kluba. Pokušajte ponovno.
                </Alert>
            </Snackbar>
        </>
    );
};