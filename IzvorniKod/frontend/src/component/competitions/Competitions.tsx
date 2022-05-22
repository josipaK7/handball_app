import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import Typography from '@material-ui/core/Typography';
import {Card, CardActionArea, CardContent, CardMedia, Grid} from "@material-ui/core";
import {useSelector} from "react-redux";
import {Competition} from "./models/Competition";
import {makeStyles} from '@material-ui/core/styles';
import CompetitionSave from "./save/CompetitionSave";
import {MainReducer} from "../../store/reducer";


interface CompetitionContentProp {
    competition: Competition,
}

const CompetitionContent = ({competition}: CompetitionContentProp) => {

    const useStyles = makeStyles({
        root: {
            width: 250,
        },
        media: {
            height: 250,
        },
    });

    const classes = useStyles();
    const history = useHistory();

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => history.push("/competition/" + competition.competitionId)}>
                <CardMedia
                    component={"img"}
                    className={classes.media}
                    image={competition.image}
                    title={competition.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {competition.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export const Competitions = () => {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const {loggedInUser} = useSelector((state: MainReducer) => state.authReducer);
    const history = useHistory();

    const onCompetitionCreate = () => {
        fetchAllCompetitions();
    }

    const fetchAllCompetitions = () => {
        fetch("/competitions/all", {
            method: "GET",
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((competitions) => {
                    console.log("JOSIPALOG dohvatili competitions ", competitions);
                    competitions.forEach((competition: Competition) => {
                        competition.image = "data:image/jpeg;base64," + competition.image;
                    });
                    setCompetitions(competitions);
                });
            }
        });
    }

    useEffect(() => {
        fetchAllCompetitions();
    }, [history]);

    return (
        <div>
            {loggedInUser && loggedInUser['admin'] ?
                <CompetitionSave onSuccess={onCompetitionCreate}/>
                :
                <></>
            }
            <Grid container spacing={2} alignContent={"center"} justifyContent={"center"}>
                {competitions.map((competition) => (
                    <Grid item key={competition.competitionId}>
                        <CompetitionContent competition={competition}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}