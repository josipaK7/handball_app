import {combineReducers} from "redux";
import authReducer from "./reducers/authReducer";

export const mainReducer = combineReducers(
    {
        authReducer
    }
);

export type MainReducer = ReturnType<typeof mainReducer>;