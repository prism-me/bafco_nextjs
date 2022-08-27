// import { persistReducer } from "redux-persist";
// import storage from 'redux-persist/lib/storage';

// export const actionTypes = {
//     categoryLoadStarted: 'CATEGORY_LOAD_STARTED',
//     categoryReceived: 'CATEGORY_RECEIVE',
//     categoryLoadFailed: 'CATEGORY_LOAD_FAILED',
// };

// let initialState = {
//     list: [],
//     isLoaded: false,
//     lastFetch: null,
// };
// const MenuReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case actionTypes.categoryLoadStarted:

//             return state.isLoaded = true;

//         case actionTypes.categoryReceived:
//             state.list = action.payload.data;
//             state.isLoaded = false;
//             state.lastFetch = Date.now();

//         case actionTypes.categoryLoadFailed:

//             return state.isLoaded = false;

//         default:
//             return state;
//     }
// }

// export const actions = {
//     categoryLoadStarted: () => ({
//         type: actionTypes.categoryLoadStarted,
//     }),

//     categoryLoadStarted: categoryLoadFailed => ({

//         type: actionTypes.categoryLoadStarted,
//     }),

//     categoryLoadFailed: () => ({
//         type: actionTypes.categoryLoadFailed,
//     }),
// }

// const persistConfig = {
//     keyPrefix: "molla-",
//     key: "login",
//     storage
// }

// export default persistReducer(persistConfig, MenuReducer);