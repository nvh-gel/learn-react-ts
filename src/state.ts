import {applyMiddleware, combineReducers, createStore} from "redux";
import ReduxThunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {ProjectState} from "./projects/state/ProjectTypes";
import {initialProjectState, projectReducer} from "./projects/state/ProjectReducer";

const reducer = combineReducers({
    projectState: projectReducer,
});

export default function configureStore(preloadedState: any) {
    const middlewares = [ReduxThunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const enhancer = composeWithDevTools(middlewareEnhancer);

    return createStore(reducer, preloadedState, enhancer);
}

export interface AppState {
    projectState: ProjectState,
}

export const initialAppState: AppState = {
    projectState: initialProjectState,
};

export const store = configureStore(initialAppState);
