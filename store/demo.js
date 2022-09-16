import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  showQuick: "SHOW_QUICKVIEW",
  hideQuick: "HIDE_QUICKVIEW",
  showVideo: "SHOW_VIDEO",
  hideVideo: "HIDE_VIDEO",
  showFabric: "SHOW_FABRIC",
  hideFabric: "HIDE_FABRIC",
  refreshStore: "REFRESH_STORE",
};

let initialState = {
  current: process.env.NEXT_PUBLIC_DEMO,
  single: null,
  quickShow: false,
  videoShow: false,
  fabricShow: false,
};
const demoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.showQuick:
      return {
        ...state,
        single: action.payload.slug,
        quickShow: true,
      };

    case actionTypes.hideQuick:
      return {
        ...state,
        quickShow: false,
        single: null,
      };

    case actionTypes.showFabric:
      return {
        ...state,
        single: action.payload.slug,
        fabricShow: true,
      };

    case actionTypes.hideFabric:
      return {
        ...state,
        fabricShow: false,
        single: null,
      };
      
    case actionTypes.showVideo:
      return { ...state, videoShow: true };

    case actionTypes.hideVideo:
      return { ...state, videoShow: false };

    case actionTypes.refreshStore:
      return {
        current: action.payload.current,
        single: null,
        quickShow: false,
        videoShow: false,
        fabricShow: false,
      };

    default:
      return state;
  }
};

export const actions = {
  refreshStore: (current) => ({
    type: actionTypes.refreshStore,
    payload: {
      current: current,
    },
  }),

  showQuickView: (slug) => ({
    type: actionTypes.showQuick,
    payload: {
      slug: slug,
    },
  }),

  hideQuick: () => ({
    type: actionTypes.hideQuick,
  }),

  showVideo: () => ({
    type: actionTypes.showVideo,
  }),

  hideVideo: () => ({
    type: actionTypes.hideVideo,
  }),

  showFabric: (slug) => ({
    type: actionTypes.showFabric,
    payload: {
      slug: slug,
    },
  }),

  hideFabric: () => ({
    type: actionTypes.hideFabric,
  }),

};

const persistConfig = {
  keyPrefix: "",
  key: "demo",
  storage,
};

export default persistReducer(persistConfig, demoReducer);
