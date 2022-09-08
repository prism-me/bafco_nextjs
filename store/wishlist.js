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

            let UserDetail = localStorage.getItem('UserData');
            let authtoken = localStorage.getItem('authtoken');

            if (UserDetail) {

                let productData = {
                    user_id: UserDetail,
                    product_id: action?.payload?.product?.product_id,
                    product_variation_id: action?.payload?.product?.product_variation_id,
                    // variation_id: action.payload.product.productvariations.id,
                    // variation_value_id: action.payload.product.productvariations.product_variation_name.variation_value_id
                };

                API.post(`/auth/wishlists`, productData, { headers: { 'Authorization': `Bearer ${authtoken}` } }).then((response) => {
                    console.log("wishlists :: ", response.data);
                }).catch((err) => {
                    console.log(err);
                });

            } else {
                toast.warning("Please Login/Registration first.");
            }

            let findIndex = state.data.findIndex(item => item.product_id === action.payload.product.product_id);

            if (findIndex == -1) {

                return {
                    data: [
                        ...state.data,
                        action.payload.product
                    ]
                };
            }

        case actionTypes.removeFromWishlist:
            return {
                data: state.data.filter(item => item.product_id !== action.payload.product.product_id)
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