import {StarsAction, StarsActionTypes, starsState} from "../../types/stars";

const initialState: starsState = {
    starsQuantity: {},
    loading: false,
    error: null,
}

export const starsReducer = (state = initialState, action: StarsAction): starsState => {
    switch (action.type) {
        case StarsActionTypes.FETCH_STARS_QUANTITY:
            return {loading: true, error: null, starsQuantity: {}}
        case StarsActionTypes.FETCH_STARS_QUANTITY_SUCCESS:
            return {loading: false, error: null, starsQuantity: action.payload}
        case StarsActionTypes.FETCH_STARS_QUANTITY_ERROR:
            return {loading: false, error: null, starsQuantity: {}}
        default:
            return state
    }
}