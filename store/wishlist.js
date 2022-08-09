import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { takeEvery } from "redux-saga/effects";
import { toast } from 'react-toastify';
import { API } from '~/http/API';

export const actionTypes = {
    addToWishlist: 'ADD_TO_WISHLIST',
    removeFromWishlist: 'REMOVE_FROM_WISHLIST',
    refreshStore: 'REFRESH_STORE',
}

const initialState = {
    data: [],
}

const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.addToWishlist:
            console.log('Wishlist')
            let UserDetail = localStorage.getItem('UserData');
            let authtoken = localStorage.getItem('authtoken');
            console.log('UserDetail :: ', UserDetail)
            console.log('authtoken :: ', authtoken)
            if (UserDetail) {

                var findIndex = state.data.findIndex(item => item.id === action.payload.product.id);
                if (findIndex == -1) {
                    return {
                        data: [
                            ...state.data,
                            action.payload.product
                        ]
                    };
                }

                let productData = {
                    user_id: UserDetail,
                    product_id: action.payload.product.id,
                    variation_id: action.payload.product.variations[0].id,
                };

                API.post(`/wishlists`, productData, {
                    headers: {
                        'Authorization': `Bearer ${authtoken}`
                    }
                })
                    .then((response) => {

                        console.log("wishlists :: ", response);

                    }).catch((err) => {
                        console.log(err);
                    });
            } else {
                toast.warning("Please Login/Registration first.");
            }

        case actionTypes.removeFromWishlist:
            return {
                data: state.data.filter(item => item.id !== action.payload.product.id)
            };

        case actionTypes.refreshStore:
            return initialState;

        default:
            return state;
    }
}

export const actions = {
    addToWishlist: product => ({
        type: actionTypes.addToWishlist,
        payload: {
            product
        }
    }),

    removeFromWishlist: product => ({
        type: actionTypes.removeFromWishlist,
        payload: {
            product
        }
    })
}

export function* wishlistSaga() {
    yield takeEvery(actionTypes.addToWishlist, function* saga(e) {
        toast.success("Product added to Wishlist");
    })
}

const persistConfig = {
    keyPrefix: "molla-",
    key: 'wishlist',
    storage,
}

export default persistReducer(persistConfig, wishlistReducer);