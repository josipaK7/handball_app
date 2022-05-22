import React, {useEffect, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Competition} from "./models/Competition";
import {useHistory} from "react-router";
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import {useSelector} from "react-redux";
import {MainReducer} from "../../store/reducer";
import CompetitionDelete from "./delete/CompetitionDelete";
import CompetitionSave from "./save/CompetitionSave";

interface Props {
    competitionId: number
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            '& > svg': {
                margin: theme.spacing(2),
            },
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            backgroundColor: theme.palette.background.paper,
            width: 700,
            height: 500
        },
        title: {
            flexGrow: 0.1,
            paddingBottom: '20px'
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '300px',
            maxHeight: '300px'
        },
        deleteButton: {
            paddingTop: '40px'
        }
    }),
);

export const CompetitionOverviewInformation = ({competitionId}: Props) => {
    const [competition, setCompetition] = useState<Competition>();
    const {loggedInUser} = useSelector((state: MainReducer) => state.authReducer);
    const history = useHistory();

    const onCompetitionUpdate = () => {
        fetchCompetition();
    }

    const fetchCompetition = () => {
        fetch("/competitions/" + competitionId, {
            method: "GET",
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((competition) => {
                    console.log("JOSIPALOG info ", competition.dateTo);
                    competition.image = "data:image/jpeg;base64," + competition.image;
                    setCompetition(competition);
                });
            } else {
                // Competition does not exist.
                history.push("/");
            }
        });
    }

    useEffect(() => {
        fetchCompetition();
    }, [history]);

    let dateFrom;
    if (competition?.dateFrom !== undefined) {
        dateFrom = new Date(competition.dateFrom).toLocaleDateString();
    }
    let dateTo;
    if (competition?.dateTo !== undefined) {
        dateTo = new Date(competition.dateTo).toLocaleDateString();
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container direction={"column"} spacing={4}>
                    <Grid item>
                        <Typography variant="h5" className={classes.title} color={"secondary"}>
                            {competition?.name}
                        </Typography>
                    </Grid>
                    <Grid container spacing={2} direction={"row"}>
                        <Grid item xs={6}>
                            <img className={classes.img} alt="complex" src={competition?.image}/>
                        </Grid>
                        <Grid item container xs={6} direction="column" spacing={3}>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>Početak natjecanja:</b> {dateFrom}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>Završetak natjecanja:</b> {dateTo}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>Detalji o natjecanju:</b> {competition?.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.deleteButton} direction={"row"} style={{paddingTop: '80px'}}>
                        <Grid item>
                            {loggedInUser && loggedInUser['admin'] && competition ?
                                <>
                                    <CompetitionDelete competitionId={competitionId}/>
                                </>
                                :
                                <></>
                            }
                        </Grid>
                        <Grid item>
                            {loggedInUser && loggedInUser['admin'] && competition ?
                                <>
                                    <CompetitionSave competition={competition} onSuccess={onCompetitionUpdate}/>
                                </>
                                :
                                <></>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};



