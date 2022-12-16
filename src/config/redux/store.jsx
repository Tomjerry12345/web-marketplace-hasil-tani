import { createStore } from "redux";

const intialState = {
  dataProduk: {},
  dataUsers: {},
  dataTroli: [],
  statusLogin: true,
  statusProduk: true,
  refresh: true,
};

const reducer = (state = intialState, action) => {
  if (action.type === "UPDATE_USERS") {
    return {
      ...state,
      dataUsers: action.payload,
    };
  }

  if (action.type === "UPDATE_PRODUK") {
    return {
      ...state,
      dataProduk: action.payload,
    };
  }

  if (action.type === "UPDATE_TROLI") {
    return {
      ...state,
      dataTroli: action.payload,
    };
  }

  if (action.type === "UPDATE_STATUS_LOGIN") {
    return {
      ...state,
      statusLogin: action.payload,
    };
  }

  if (action.type === "UPDATE_STATUS_PRODUK") {
    return {
      ...state,
      statusProduk: action.payload,
    };
  }

  if (action.type === "UPDATE_REFRESH") {
    return {
      ...state,
      refresh: action.payload,
    };
  }

  return state;
};

const store = createStore(reducer);

export default store;
