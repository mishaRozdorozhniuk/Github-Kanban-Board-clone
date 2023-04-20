import {combineReducers} from "redux";
import {issuesReducer} from "./issuesReducer";
import {starsReducer} from "./starsReducer";

export const rootReducer = combineReducers({
    issue: issuesReducer,
    stars: starsReducer
})

export type RootState = ReturnType<typeof rootReducer>