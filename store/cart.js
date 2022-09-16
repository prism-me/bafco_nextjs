import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { takeEvery } from "redux-saga/effects";
import { toast } from 'react-toastify';
import { API } from '~/http/API';
import uuid from 'react-uuid';

export const actionTypes = {
    addToCart: "ADD_TO_CART",
    removeFromCart: "REMOVE_FROM_CART",
    refreshStore: "REFRESH_STORE",
    updateCart: "UPDATE_CART",
};

const initialState = {
    data: [],
    cartTotal: "",
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.addToCart:

            let UserDetail = localStorage.getItem('UserData');
            let authtoken = localStorage.getItem('authtoken');

            var findIndex = state.data.findIndex(item => item.product_id == action.payload.product.product_id);
            let qty = action.payload.qty ? action.payload.qty : 1;


            if (findIndex !== -1) {

                return {
                    data: [
                        ...state.data.reduce((acc, product, index) => {
                            if (findIndex === index) {
                                acc.push({
                                    ...product,
                                    qty: product.qty + qty,
                                });
                            } else {
                                acc.push(product);
                            }

                            return acc;
                        }, [])
                    ]
                }
            } else {

                if (UserDetail !== null) {
                    let productData = {
                        user_id: UserDetail,
                        product_id: action?.payload?.product?.product_id,
                        product_variation_id: action?.payload?.product?.product_variation_id,
                        qty: qty.toString()
                    };
                    API.post(`/auth/cart`, productData, { headers: { 'Authorization': `Bearer ${authtoken}` } }).then((response) => {

                        if (response.status === 200) {
                            window.location.reload(false);
                            return {

                                data: [
                                    ...state.data,
                                    {
                                        ...action.payload.product,
                                        qty: qty,
                                    }
                                ]
                            };
                        }

                    }).catch((err) => {
                        console.log(err);
                    });



                } else {

                    let GuestUserDetail = localStorage.getItem('GuestUserData');

                    if (GuestUserDetail === null) {
                        localStorage.setItem('GuestUserData', uuid());
                        GuestUserDetail = localStorage.getItem('GuestUserData');
                    }

                    if (GuestUserDetail !== null) {
                        let productData = {
                            user_id: GuestUserDetail,
                            product_id: action?.payload?.product?.product_id,
                            product_variation_id: action?.payload?.product?.product_variation_id,
                            qty: qty.toString()
                        };
                        API.post(`/guest-cart`, productData).then((response) => {
                            if (response.status === 200) {
                                window.location.reload(false);
                                return {

                                    data: [
                                        ...state.data,
                                        {
                                            ...action.payload.product,
                                            qty: qty,
                                        }
                                    ]
                                };
                                // API.get(`/guest-cart/${GuestUserDetail}`).then((response) => {
                                //     state.cartTotal = response.data.length;
                                //     console.log("state.cartTotal :: ", state.cartTotal)
                                // }).catch((err) => {
                                //     console.log(err);
                                // });
                            }

                        }).catch((err) => {
                            console.log(err);
                        });



                    }
                }
            }

        case actionTypes.removeFromCart:
            return {
                data: [
                    ...state.data.filter(item => {
                        if (item.product_id !== action.payload.product.product_id) return true;
                        if (item.product_variation_id !== action.payload.product.product_variation_id) return true;
                        return false;
                    })
                ]
            }

        case actionTypes.updateCart:
            return {
                data: [
                    ...action.payload.cartItems
                ]
            };
        case actionTypes.refreshStore:
            return initialState;

        default:
            return state;
    }
}

export const actions = {
    addToCart: (product, qty = 1) => ({
        type: actionTypes.addToCart,
        payload: {
            product: product,
            qty: qty
        }
    }),

    removeFromCart: (product) => ({
        type: actionTypes.removeFromCart,
        payload: {
            product: product
        }
    }),

    updateCart: (cartItems) => ({
        type: actionTypes.updateCart,
        payload: {
            cartItems: cartItems
        }
    })
}

export function* cartSaga() {
    yield takeEvery(actionTypes.addToCart, function* saga(e) {
        toast.success("Product added to Cart");
    });

    yield takeEvery(actionTypes.removeFromCart, function* saga(e) {
        toast.success("Product removed from Cart");
    });

    yield takeEvery(actionTypes.updateCart, function* saga(e) {
        toast.success("Cart updated successfully");
    });
}

const persistConfig = {
    keyPrefix: "",
    key: "cart",
    storage
}

export default persistReducer(persistConfig, cartReducer);