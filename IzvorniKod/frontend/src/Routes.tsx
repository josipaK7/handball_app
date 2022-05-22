import React, {useEffect} from "react";
import {Route, Switch} from "react-router";
import {Competitions} from "./component/competitions/Competitions";
import {CompetitionOverview} from "./component/competitions/CompetitionOverview";
import {Header} from "./component/header/Header";
import {Container} from "@material-ui/core";
import {Players} from "./component/players/Players";
import {PlayerProfile} from "./component/players/PlayerProfile";
import {ClubProfile} from "./component/clubs/ClubProfile";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {LoginForm} from "./component/login/LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {loadCurrentUser, loadTokenFromStorage} from "./store/actions/authActions";
import {MainReducer} from "./store/reducer";
import {CoachProfile} from "./component/coaches/CoachProfile";
import {RefereeProfile} from "./component/referees/RefereeProfile";
import moment from "moment";
import "moment/locale/hr";
import {Clubs} from "./component/clubs/Clubs";

export const Routes = () => {
    const dispatch = useDispatch();
    const {token} = useSelector((state: MainReducer) => state.authReducer);

    useEffect(() => {
        dispatch(loadTokenFromStorage());
    }, [])

    useEffect(() => {
        dispatch(loadCurrentUser(token));
    }, [token])

    return (
        <div>
            <Header/>
            <Container maxWidth={"lg"}>
                <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment} locale={"hr"}>
                    <div className="body-page">
                        <Switch>
                            <Route path="/" component={Competitions} exact={true}/>
                            <Route path="/competition/:competitionId" component={CompetitionOverview} exact={true}/>
                            <Route path="/clubs" component={Clubs} exact={true}/>
                            <Route path="/signin" component={LoginForm} exact={true}/>
                            <Route path="/players" component={Players} exact={true}/>
                            <Route path="/players/:playerId" component={PlayerProfile} exact={true}/>
                            <Route path="/clubs/:clubId" component={ClubProfile} exact={true}/>
                            <Route path="/coaches/:coachId" component={CoachProfile} exact={true}/>
                            <Route path="/referees/:refereeId" component={RefereeProfile} exact={true}/>
                        </Switch>
                    </div>
                </MuiPickersUtilsProvider>
            </Container>
        </div>
    );

}