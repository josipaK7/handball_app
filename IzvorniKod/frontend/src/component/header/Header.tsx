import React, {useEffect} from "react";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {ButtonGroup, IconButton} from "@material-ui/core";
import {useHistory} from "react-router";
import SportsHandballIcon from '@material-ui/icons/SportsHandball';
import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../store/reducer";
import {clearAuth} from "../../store/actions/authActions";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            '& > svg': {
                margin: theme.spacing(2),
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 0.1,
        },
        menuGroup: {
            flexGrow: 1,
        }

    }),
);

export const Header = () => {
    const history = useHistory();
    const classes = useStyles();

    const {token, loggedInUser} = useSelector((state: MainReducer) => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("josipalog auth state changed, logged in user = ", loggedInUser);
        console.log("josipalog auth state changed, token = ", token);
    }, [loggedInUser, token]);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" onClick={() => history.push("/")}>
                        <SportsHandballIcon fontSize="large"/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Rukometna euforija
                    </Typography>
                    <ButtonGroup variant="text" color={"inherit"} aria-label="Menu" className={classes.menuGroup}
                                 size={"large"}>
                        <Button onClick={() => history.push("/clubs")}>Klubovi</Button>
                        <Button onClick={() => history.push("/players")}>Igrači</Button>
                    </ButtonGroup>
                    {!token ?
                        <Button color="inherit" onClick={() => history.push("/signin")}>Login</Button>
                        :
                        <Button color="inherit" onClick={() => {
                            dispatch(clearAuth());
                            console.log("josipalog CLEAR");
                            history.push("/");
                        }}>
                            Logout
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

