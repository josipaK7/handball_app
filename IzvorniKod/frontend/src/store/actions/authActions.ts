import {Dispatch} from "react";
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
} from "./authActionTypes";
import {User} from "../../component/competitions/models/User";

export const saveAuthTokenRequest = () : authTokenActionTypes => ( {
    type: SAVE_AUTH_TOKEN_REQUEST,
    payload: undefined
});

export const saveAuthTokenSuccess = (token: string | undefined | null) : authTokenActionTypes => ( {
    type: SAVE_AUTH_TOKEN_SUCCESS,
    payload: token
});

export const saveAuthTokenError = (error: string | undefined) : authTokenActionTypes => ( {
    type: SAVE_AUTH_TOKEN_ERROR,
    payload: error
});

export const clearAuthTokenRequest = () : authTokenActionTypes => ( {
    type: CLEAR_AUTH_TOKEN_REQUEST,
    payload: undefined
});

export const clearAuthTokenSuccess = () : authTokenActionTypes => ( {
    type: CLEAR_AUTH_TOKEN_SUCCESS,
    payload: undefined
});

export const clearAuthTokenError = (error: string | undefined) : authTokenActionTypes => ( {
    type: CLEAR_AUTH_TOKEN_ERROR,
    payload: error
});

export const getAuthTokenFromStorage = (token: string | undefined | null) : authTokenActionTypes => ( {
    type: GET_AUTH_TOKEN_FROM_STORAGE,
    payload: token
});

export const getCurrentUserRequest = () : authTokenActionTypes => ( {
    type: GET_CURRENT_USER_REQUEST,
    payload: undefined
});

export const getCurrentUserSuccess = (user : User | undefined | null) : authTokenActionTypes => ( {
    type: GET_CURRENT_USER_SUCCESS,
    payload: user
});

export const getCurrentUserError = (error: string | undefined) : authTokenActionTypes => ( {
    type: GET_CURRENT_USER_ERROR,
    payload: error
});

/**
 * Called to initiate save token and change token in state.
 */
export const saveAuthToken = (token: string|undefined|null) => (dispatch : Dispatch<authTokenActionTypes>) => {
    dispatch(saveAuthTokenRequest());
    try {
        saveTokenToSessionStorage(token || "");
        dispatch(saveAuthTokenSuccess(token));
    } catch (e) {
        console.log("josipalog session storage save exception", e);
        dispatch(saveAuthTokenError(e.message));
    }
}

/**
 * Called to initiate clearing auth token.
 */
export const clearAuth = () => (dispatch : Dispatch<authTokenActionTypes>) => {
    dispatch(clearAuthTokenRequest());
    try {
        clearSessionStorage();
        dispatch(clearAuthTokenSuccess());
    } catch (e) {
        dispatch(clearAuthTokenError(e.message));
    }
}

/**
 * Called to initiate loading auth token from browser's session storage.
 */
export const loadTokenFromStorage = () => (dispatch : Dispatch<authTokenActionTypes>) => {
    dispatch(getAuthTokenFromStorage(getTokenFromSessionStorage()));
}

/**
 * Called for getting current logged in user and save to state.
 */
export const loadCurrentUser = (token: string | undefined | null) => (dispatch : Dispatch<authTokenActionTypes>) => {
    dispatch(getCurrentUserRequest());
    try {
        getCurrentUser(token).then(user => {
            dispatch(getCurrentUserSuccess(user));
        });
    } catch (e) {
        dispatch(getCurrentUserError(e.message));
    }
}

const saveTokenToSessionStorage = (token: string) => {
    sessionStorage.setItem("key", token)
}

const clearSessionStorage = () => {
    sessionStorage.clear();
}

const getTokenFromSessionStorage = (): string | null => {
    const key = sessionStorage.getItem("key");
    console.log("josipalog SYNC KEY ", key);
    return key;
}

const getCurrentUser = async (token: string | undefined | null) : Promise<User | null | undefined> => {
    const requestOptions = {
        method: "GET",
        headers: {
            authorization: token|| ""
        }
    };
    let result = await fetch("/users/current", requestOptions);
    console.log("josipalog getting current user with token ", token);

    const json = await result.json().then((currentUser) => {
        return currentUser.user;
    });
    return json;
}
