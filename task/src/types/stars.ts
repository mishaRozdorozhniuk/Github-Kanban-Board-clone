export interface starsState {
    starsQuantity: object;
    loading: boolean,
    error: null | string;
}

export enum StarsActionTypes {
    FETCH_STARS_QUANTITY = "FETCH_STARS_QUANTITY",
    FETCH_STARS_QUANTITY_SUCCESS = "FETCH_STARS_QUANTITY_SUCCESS",
    FETCH_STARS_QUANTITY_ERROR = "FETCH_STARS_QUANTITY_ERROR",
}

interface FetchStartQuantity {
    type: StarsActionTypes.FETCH_STARS_QUANTITY;
}

interface FetchStarsQuantitySuccess {
    type: StarsActionTypes.FETCH_STARS_QUANTITY_SUCCESS;
    payload: object;
}

interface FetchStarsQuantityError {
    type: StarsActionTypes.FETCH_STARS_QUANTITY_ERROR;
    payload: string;
}


export type StarsAction = FetchStartQuantity | FetchStarsQuantitySuccess | FetchStarsQuantityError;
