import {createStore, applyMiddleware} from "redux"
import {mainReducer} from "./reducer";
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension";

export const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)));
