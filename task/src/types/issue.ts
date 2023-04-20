export interface IssueState {
    issues: any[],
    loading: boolean,
    error: null | string;
}

export enum IssueActionTypes {
    FETCH_ISSUES = "FETCH_ISSUES",
    FETCH_ISSUES_SUCCESS = "FETCH_ISSUES_SUCCESS",
    FETCH_ISSUES_ERROR = "FETCH_ISSUES_ERROR",
}

interface FetchIssuesAction {
    type: IssueActionTypes.FETCH_ISSUES
}

interface FetchIssuesSuccessAction {
    type: IssueActionTypes.FETCH_ISSUES_SUCCESS;
    payload: any[];
}

interface FetchIssuesErrorAction {
    type: IssueActionTypes.FETCH_ISSUES_ERROR;
    payload: string;
}

export type IssueAction = FetchIssuesAction | FetchIssuesSuccessAction | FetchIssuesErrorAction ;
