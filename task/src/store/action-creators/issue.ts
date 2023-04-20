import {IssueAction, IssueActionTypes} from "../../types/issue";
import {Dispatch} from "redux";
import axios from "axios";

const token = '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';

export const fetchIssues = (url: string) => {
    return async (dispatch: Dispatch<IssueAction>) => {
        try {
            dispatch({type: IssueActionTypes.FETCH_ISSUES})
            const response = await axios
                .get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            dispatch({type: IssueActionTypes.FETCH_ISSUES_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({type: IssueActionTypes.FETCH_ISSUES_ERROR, payload: 'Error while fetching issues'})
        }
    }
}
