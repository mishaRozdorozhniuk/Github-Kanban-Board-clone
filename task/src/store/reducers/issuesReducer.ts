import {IssueAction, IssueActionTypes, IssueState} from "../../types/issue";

const initialState: IssueState = {
    issues: [],
    loading: false,
    error: null,
}

export const issuesReducer = (state = initialState, action: IssueAction): IssueState => {
    switch (action.type) {
        case IssueActionTypes.FETCH_ISSUES:
            return {loading: true, error: null, issues: []}
        case IssueActionTypes.FETCH_ISSUES_SUCCESS:
            return {loading: false, error: null, issues: action.payload}
        case IssueActionTypes.FETCH_ISSUES_ERROR:
            return {loading: false, error: action.payload, issues: []}
        default:
            return state
    }
}