import React, {useEffect, useState} from "react";
import {Club} from "../competitions/models/Club";
import {ClubsResult} from "./ClubsResult";
import {useSelector} from "react-redux";
import {MainReducer} from "../../store/reducer";
import {useFormik} from "formik";
import {TextField} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router";
import ClubSave from "./save/ClubSave";

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

export const Clubs = () => {
    const [clubs, setClubs] = useState<Club[]>([]);
    const [allClubs, setAllClubs] = useState<Club[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const history = useHistory();

    const {loggedInUser} = useSelector((state: MainReducer) => state.authReducer);

    const fetchAllClubs = () => {
        setLoading(true);
        fetch("/clubs/all", {
            method: "GET",
        }).then(function (response) {
            setLoading(false);
            if (response.status === 200) {
                response.json().then((clubs) => {
                    clubs.forEach((club: Club) => {
                        club.image = "data:image/jpeg;base64," + club.image;
                    });
                    setAllClubs(clubs);
                });
            }
        })
    };

    const onClubCreate = () => {
        fetchAllClubs();
    }

    useEffect(() => {
        fetchAllClubs();
    }, [history]);

    useEffect(() => {
            dataRequest(searchQuery);
        }, [allClubs]
    );

    function dataRequest(searchText: string) {
        const matchingClubs = allClubs.filter((club) => {
            if (!searchText) return true;
            return club.name.toLowerCase().includes(searchText.toLowerCase());
        });
        setClubs(matchingClubs);
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
                    <ClubSave onSuccess={onClubCreate}/>
                </div>
                :
                <></>
            }
            <form onSubmit={form.handleChange}>
                <div className={classes.paper}>
                    <TextField type="text"
                               label={'Pretražite klubove'}
                               name="searchText"
                               id="searchText"
                               variant={'outlined'}
                               style={{width: 500}}
                               placeholder={"Pretražite klubove"}
                               onChange={(search) => searchChange(search)} value={form.values.searchText}
                    />
                </div>
            </form>
            {!loading && !clubs.length ? (
                <div>
                    Ne postoji niti jedan klub koji odgovara pretrazi.
                </div>
            ) : (
                <ClubsResult clubs={clubs}/>
            )}
        </div>
    );
}