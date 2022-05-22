import {
    authTokenActionTypes,
    CLEAR_AUTH_TOKEN_ERROR,
    CLEAR_AUTH_TOKEN_REQUEST,
    CLEAR_AUTH_TOKEN_SUCCESS,
    GET_AUTH_TOKEN_FROM_STORAGE,
    GET_CURRENT_USER_ERROR,
    GET_CURRENT_USER_REQUEST,
    GET_CURRENT_USER_SUCCESS,
    SAVE_AUTH_TOKEN_ERROR,
    SAVE_AUTH_TOKEN_REQUEST,
    SAVE_AUTH_TOKEN_SUCCESS
} from "../actions/authActionTypes";
import {User} from "../../component/competitions/models/User";

export interface AuthState {
    token: string | undefined,
    loggedInUser: User | undefined | null,
    error: string | undefined,
    status: string,
}

const initialAuthState = {
    token: undefined,
    loggedInUser: undefined,
    error: undefined,
    status: "idle"
} as AuthState;

export default (state: AuthState = initialAuthState, action: authTokenActionTypes) => {
    switch (action.type) {
        case SAVE_AUTH_TOKEN_REQUEST: return {...state, status: 'waiting'};
        case SAVE_AUTH_TOKEN_SUCCESS: return {...state, status: 'success', token: action.payload};
        case SAVE_AUTH_TOKEN_ERROR: return {...state, status: 'error', error: action.payload}
        case CLEAR_AUTH_TOKEN_REQUEST: return {...state, status: 'waiting'};
        case CLEAR_AUTH_TOKEN_SUCCESS: return {...state, status: 'success', token: action.payload, loggedInUser: undefined};
        case CLEAR_AUTH_TOKEN_ERROR: return {...state, status: 'error', error: action.payload}
        case GET_AUTH_TOKEN_FROM_STORAGE: return {...state, status: 'success', token: action.payload};
        case GET_CURRENT_USER_REQUEST: return {...state, status: 'waiting'};
        case GET_CURRENT_USER_SUCCESS: return {...state, status: 'success', loggedInUser: action.payload};
        case GET_CURRENT_USER_ERROR: return {...state, status: 'error', error: action.payload}
        default: return state;
    }
};
