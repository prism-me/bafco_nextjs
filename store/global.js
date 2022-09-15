import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

export const actionTypes = {
    showPopup: 'SHOW_POPUP',
    hidePopup: 'HIDE_POPUP',
    refreshStore: 'REFRESH_STORE'
};

let initialState = {
    popupShow: false,
};
const GlobalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.showPopup:
            return {
                ...state,
                popupShow: true,
            }

        case actionTypes.hidePopup:
            return {
                ...state,
                popupShow: false,
            }

        case actionTypes.refreshStore:
            return {
                ...state,
                popupShow: false,
            }

        default:
            return state;
    }
}

export const actions = {
    refreshStore: (popupShow) => ({
        type: actionTypes.refreshStore,
        payload: {
            popupShow: popupShow
        }
    }),

    showPopup: popupShow => ({

            type: actionTypes.showPopup,
            payload: {
                popupShow
            }
        }),

    hidePopup: () => ({
        type: actionTypes.hidePopup,
    }),
}

const persistConfig = {
    keyPrefix: "",
    key: "login",
    storage
}

export default persistReducer(persistConfig, GlobalReducer);