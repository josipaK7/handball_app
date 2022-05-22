import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props}/>
}

interface Props {
    matchId: number,
    onSuccess?: () => void,
}

export default function ScheduledMatchDelete({matchId, onSuccess}: Props) {
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

    const deleteClub = async () => {
        const requestOptions = {
            method: "DELETE",
        };
        const response = await fetch("/matches/delete/scheduled/" + matchId, requestOptions);

        if (response.status === 200) {
            setOpen(false);
            successMessage();
            onSuccess && onSuccess();
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
        <React.Fragment>
            <div>
                <IconButton color="secondary" onClick={handleClickOpen} size={"small"}>
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
                        Obrišite utakmicu
                    </DialogTitle>
                    <DialogContent dividers>
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
                    Utakmica je uspješno obrisana.
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={2000} onClose={onCloseError}>
                <Alert onClose={onCloseError} severity="error">
                    Dogodila se pogreška prilikom brisanja utakmice. Pokušajte ponovno.
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};