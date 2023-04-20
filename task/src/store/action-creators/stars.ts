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
