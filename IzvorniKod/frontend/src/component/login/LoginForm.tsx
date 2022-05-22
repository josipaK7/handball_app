import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../store/reducer";
import {loadCurrentUser, saveAuthToken} from "../../store/actions/authActions";
import {useHistory} from "react-router";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Button, Grid, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            '& > svg': {
                margin: theme.spacing(2),
            },
        },
        title: {
            flexGrow: 0.1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        menuGroup: {
            flexGrow: 1,
        },
        paperContent: {
            width: '400px',
            height: '400px',
            display: 'flex',
            paddingTop: '20px',
            justifyContent: 'center',
        },
        paper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        button: {
            margin: '0 auto',
            display: "flex",
        },
        style: {
            color: '#f50057',
            fontSize: '1rem',
        },

    }),
);


export const LoginForm = () => {
    const [showError, setShowError] = useState<boolean>(false);
    const [success, setSuccessMessage] = useState<boolean>();

    const {token} = useSelector((state: MainReducer) => state.authReducer);

    const dispatch = useDispatch();
    const history = useHistory();

    const classes = useStyles();

    useEffect(() => {
        redirectLoggedInUser();
    }, [])

    useEffect(() => {
        dispatch(loadCurrentUser(token));
        redirectLoggedInUser();
    }, [token])

    const redirectLoggedInUser = () => {
        if (token) {
            history.push("/");
        }
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccessMessage(false);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validateOnChange: false,
        validateOnMount: false,
        validateOnBlur: false,
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Molimo unesite e-mail.")
                .email("Neispravan oblik mail-a."),
            password: Yup.string().required("Molimo unesite lozinku."),
        }),
        onSubmit: (values) => {
            let loginInfo = {
                email: values.email,
                password: values.password,
            };
            fetch("/login", {
                method: "POST",
                body: JSON.stringify(loginInfo),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (response) {
                console.log("josipalog LOGIN RESPONSE", response);
                if (
                    response.status === 401 ||
                    response.status === 403
                ) {
                    setShowError(true);
                } else if (response.status === 200) {
                    dispatch(saveAuthToken(response.headers.get("authorization")));
                }
            });
        },
    });

    return (
        token ? <></> :
            <div className={classes.paper}>
                <Paper className={classes.paperContent}>
                    <div className="loginForm">
                        <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                                Uspješno ste se prijavili.
                            </Alert>
                        </Snackbar>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container direction="column" spacing={4}>
                                <Grid item>
                                    <Typography variant="h5" className={classes.title} component={'span'}>
                                        PRIJAVA
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography component={'span'}>
                                        <div style={{paddingBottom: '10px'}}>
                                            <TextField label="E-mail"
                                                       type={'text'}
                                                       variant="outlined"
                                                       size="small"
                                                       name={"email"}
                                                       id={"email"}
                                                       {...formik.getFieldProps('email')}/>
                                            {formik.errors.email && formik.touched.email ?
                                                <div className={classes.style}>{formik.errors.email}</div> : <></>}
                                        </div>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <div>
                                        <TextField label="Lozinka"
                                                   type={'password'}
                                                   variant="outlined"
                                                   size="small"
                                                   name={"password"}
                                                   id={"password"}
                                                   {...formik.getFieldProps('password')}/>
                                        {formik.errors.password && formik.touched.password ?
                                            <div className={classes.style}>{formik.errors.password}</div> : <></>}
                                    </div>
                                    <Typography color={'secondary'} component={'span'}>
                                        {showError &&
                                        <span className="errorText" id="error-span">Neispravan e-mail ili lozinka.</span>}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <div>
                                        <Button type={"submit"} className={classes.button}>
                                            PRIJAVI SE
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Paper>
            </div>


    );
};
