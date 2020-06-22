import axios from "../../api/posts";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_REVIEW = "ADD_REVIEW";
export const SELL_ITEM = "SELL_ITEM";

export const deleteProduct = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
  await axios.delete(`/delete/${id}`, config);
  dispatch({
    type: DELETE_PRODUCT,
    payload: id,
  });
};

export const addReview = (text, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
  const response = await axios.put(`/review/${id}`, { text }, config);

  dispatch({
    type: ADD_REVIEW,
    payload: response.data,
  });
};
export const sellItem = (postId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
  const response = await axios.put(`/sell`, { postId }, config);

  dispatch({
    type: SELL_ITEM,
    payload: response.data,
  });
};
