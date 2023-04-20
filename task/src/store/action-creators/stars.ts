import {StarsAction, StarsActionTypes} from "../../types/stars";
import {Dispatch} from "redux";
import axios from "axios";

const token = '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';

export const fetchStartQuantity = (url: string) => {
    return async (dispatch: Dispatch<StarsAction>) => {
        try {
            dispatch({type: StarsActionTypes.FETCH_STARS_QUANTITY})
            const response = await axios
                .get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            dispatch({type: StarsActionTypes.FETCH_STARS_QUANTITY_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({type: StarsActionTypes.FETCH_STARS_QUANTITY_ERROR, payload: 'Error while fetching stars for current issue'})
        }
    }
}
