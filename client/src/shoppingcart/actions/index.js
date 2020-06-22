import axios from "../../api/posts";
import history from "../../component/history";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const SUB_QUANTITY = "SUB_QUANTITY";
export const ADD_QUANTITY = "ADD_QUANTITY";
export const ADD_SHIPPING = "ADD_SHIPPING";
export const FETCH_ITEMS = "FETCH_ITEMS";
export const CLEAR_CART_ITEMS = "CLEAR_CART_ITEMS";
export const FILTER_ITEM = "FILTER_ITEM";
export const FILTER_ITEM_BY_SIZE = "FILTER_ITEM_BY_SIZE";
export const FETCH_ITEM = "FETCH_ITEM";
export const CREATE_ITEM = "CREATE_ITEM";
export const ADD_COMMENT = "ADD_COMMENT";
export const CLEAR_ITEM_STATE = "CLEAR_ITEM_STATE";

export const addToCart = (id) => {
  return {
    type: ADD_TO_CART,
    id,
  };
};
export const fetchItems = () => async (dispatch) => {
  const response = await axios.get("/allItem");
  dispatch({
    type: FETCH_ITEMS,
    payload: response.data,
  });
};
export const clearGetItem = () => {
  return {
    type: CLEAR_ITEM_STATE,
    payload: {},
  };
};
export const fetchItem = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
  const response = await axios.get(`/post/${id}`, config);
  dispatch({
    type: FETCH_ITEM,
    payload: response.data,
  });
};
export const increaseQuantity = (id) => {
  return {
    type: ADD_QUANTITY,
    id,
  };
};
export const fetchItemList = () => {};
//export const a = "mohen"
//remove item action
export const removeItem = (id) => {
  console.log(id);
  return {
    type: REMOVE_ITEM,
    id,
  };
};
//subtract qt action
export const subtractQuantity = (id) => {
  return {
    type: SUB_QUANTITY,
    id,
  };
};
//add qt action
export const addQuantity = (id) => {
  return {
    type: ADD_QUANTITY,
    id,
  };
};

export const clearCart = () => {
  return {
    type: "CLEAR_CART_ITEMS",
  };
};

export const filterItem = (itemValue) => {
  return {
    type: FILTER_ITEM,
    payload: itemValue,
  };
};
export const filterItemBySize = (itemValue) => {
  return {
    type: FILTER_ITEM_BY_SIZE,
    payload: itemValue,
  };
};

export const userLogin = (
  title,
  price,
  desc,
  size,
  url,
  category,
  displaySize,
  color,
  ram,
  storage,
  battery
) => async (dispatch) => {
  const response = await axios.post("/createItem", {
    title,
    price,
    desc,
    size,
    url,
    category,
    displaySize,
    color,
    ram,
    storage,
    battery,
  });

  dispatch({
    type: "CREATE_ITEM",
    payload: response.data,
  });
  history.push("/");
};
//

export const addComment = (text, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
  const response = await axios.put(`/comment/${id}`, { text }, config);

  dispatch({
    type: ADD_COMMENT,
    payload: response.data,
  });
};
