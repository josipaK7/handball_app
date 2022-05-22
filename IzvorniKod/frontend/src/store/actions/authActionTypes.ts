import {User} from "../../component/competitions/models/User";

export const SAVE_AUTH_TOKEN_REQUEST = "SAVE_AUTH_TOKEN_REQUEST";
export const SAVE_AUTH_TOKEN_SUCCESS = "SAVE_AUTH_TOKEN_SUCCESS";
export const SAVE_AUTH_TOKEN_ERROR = "SAVE_AUTH_TOKEN_ERROR";

export const CLEAR_AUTH_TOKEN_REQUEST = "CLEAR_AUTH_TOKEN_REQUEST";
export const CLEAR_AUTH_TOKEN_SUCCESS = "CLEAR_AUTH_TOKEN_SUCCESS";
export const CLEAR_AUTH_TOKEN_ERROR = "CLEAR_AUTH_TOKEN_ERROR";

export const GET_AUTH_TOKEN_FROM_STORAGE = "GET_AUTH_TOKEN_FROM_STORAGE";

export const GET_CURRENT_USER_REQUEST = "GET_CURRENT_USER_REQUEST";
export const GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS";
export const GET_CURRENT_USER_ERROR = "GET_CURRENT_USER_ERROR";

interface saveAuthTokenRequest {
    type: typeof SAVE_AUTH_TOKEN_REQUEST,
    payload: undefined
}

interface saveAuthTokenSuccess {
    type: typeof SAVE_AUTH_TOKEN_SUCCESS,
    payload: string | undefined | null
}

interface saveAuthTokenError {
    type: typeof SAVE_AUTH_TOKEN_ERROR,
    payload: string | undefined
}

interface clearAuthTokenRequest {
    type: typeof CLEAR_AUTH_TOKEN_REQUEST,
    payload: undefined
}

interface clearAuthTokenSuccess {
    type: typeof CLEAR_AUTH_TOKEN_SUCCESS,
    payload: undefined
}

interface clearAuthTokenError {
    type: typeof CLEAR_AUTH_TOKEN_ERROR,
    payload: string | undefined
}

interface getAuthTokenFromStorage {
    type: typeof GET_AUTH_TOKEN_FROM_STORAGE,
    payload: string | undefined | null // token
}

interface getCurrentUserRequest {
    type: typeof GET_CURRENT_USER_REQUEST,
    payload: undefined
}

interface getCurrentUserSuccess {
    type: typeof GET_CURRENT_USER_SUCCESS,
    payload: User | undefined | null // user
}

interface getCurrentUserError {
    type: typeof GET_CURRENT_USER_ERROR,
    payload: undefined | string
}

export type authTokenActionTypes = saveAuthTokenRequest | saveAuthTokenSuccess | saveAuthTokenError | clearAuthTokenRequest
    | clearAuthTokenSuccess | clearAuthTokenError | getAuthTokenFromStorage | getCurrentUserRequest
    | getCurrentUserSuccess | getCurrentUserError;