import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {MainReducer} from "../../store/reducer";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Player} from "../competitions/models/Player";
import {useHistory} from "react-router";
import {useFormik} from "formik";
import PlayerSave from "./save/PlayerSave";
import {TextField} from "@material-ui/core";
import {PlayersResults} from "./PlayersResults";

const useStyles = makeStyles(() =>
    createStyles({
        paper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '35px',
            paddingBottom: '35px',
        },
    })
);

export const Players = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [allPlayers, setAllPlayers] = useState<Player[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const history = useHistory();

    const {loggedInUser} = useSelector((state: MainReducer) => state.authReducer);

    const fetchAllPlayers = () => {
        setLoading(true);
        fetch("/players/all", {
            method: "GET",
        }).then(function (response) {
            setLoading(false);
            if (response.status === 200) {
                response.json().then((players) => {
                    players.forEach((player: Player) => {
                        player.image = "data:image/jpeg;base64," + player.image;
                    });
                    setAllPlayers(players);
                });
            }
        })
    };


    const onPlayerCreate = () => {
        fetchAllPlayers();
    };

    useEffect(() => {
        fetchAllPlayers();
    }, [history]);

    useEffect(() => {
            dataRequest(searchQuery);
        }, [allPlayers]
    );

    function dataRequest(searchText: string) {
        let split: RegExpMatchArray | null = searchText.match(/[^\s+]+/g);
        const matchingPlayers = allPlayers.filter((player) => {
            if (!split?.length) return true;
            return split?.every(word => {
                return player.firstName.toLowerCase().includes(word.toLowerCase()) ||
                    player.lastName.toLowerCase().includes(word.toLowerCase());
            });
        });
        setPlayers(matchingPlayers);
    }

    const form = useFormik({
        initialValues: {
            searchText: "",
        },
        onSubmit: (values) => {
            dataRequest(values.searchText);
        },
    });

    function searchChange(search: any) {
        form.handleChange(search);
        setSearchQuery(search.target.value);
        dataRequest(search.target.value);
    }

    const classes = useStyles();

    return (
        <div>
            {loggedInUser && loggedInUser['admin'] ?
                <div>
                    <PlayerSave onSuccess={onPlayerCreate}/>
                </div>
                :
                <></>
            }
            <form onSubmit={form.handleChange}>
                <div className={classes.paper}>
                    <TextField type="text"
                               label={'Pretražite igrače'}
                               name="searchText"
                               id="searchText"
                               variant={'outlined'}
                               style={{width: 500}}
                               placeholder={"Pretražite igrače"}
                               onChange={(search) => searchChange(search)} value={form.values.searchText}
                    />
                </div>
            </form>
            {!loading && !players.length ? (
                <div>
                    Ne postoji niti jedan igrač koji odgovara pretrazi.
                </div>
            ) : (
                <PlayersResults players={players}/>
            )}
        </div>

    );
};