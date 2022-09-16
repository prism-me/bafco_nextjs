import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

export const actionTypes = {
    showPopup: 'SHOW_POPUP',
    hidePopup: 'HIDE_POPUP',
    verificationPageShow: 'VERIFICATION_PAGE_SHOW',
    verificationPageHide: 'VERIFICATION_PAGE_HIDE',
    refreshStore: 'REFRESH_STORE'
};

let initialState = {
    popupShow: false,
    verificationshow: false,
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
        case actionTypes.verificationPageShow:
            return {
                ...state,
                verificationshow: true,
            };

        case actionTypes.verificationPageHide:
            return {
                ...state,
                verificationshow: false,
            };

        case actionTypes.refreshStore:
            return {
                ...state,
                popupShow: false,
                verificationshow: false,
            }

        default:
            return state;
    }
}

export const actions = {
    refreshStore: (popupShow, verificationshow) => ({
        type: actionTypes.refreshStore,
        payload: {
            popupShow: popupShow,
            verificationshow: verificationshow
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
    
    verificationPageShow: verificationshow => ({
        type: actionTypes.verificationPageShow,
        payload: {
            verificationshow: verificationshow,
        },
    }),

    verificationPageHide: () => ({
        type: actionTypes.verificationPageHide,
    }),
}

const persistConfig = {
    keyPrefix: "",
    key: "login",
    storage
}

export default persistReducer(persistConfig, GlobalReducer);