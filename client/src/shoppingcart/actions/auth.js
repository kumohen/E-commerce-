import axios from "../../api/posts";
import history from "../../component/history";

export const userLogin = (email, password) => async (dispatch) => {
  const response = await axios.post("/signin", { email, password });
  console.log(response.data);
  dispatch({
    type: "USER_LOGIN",
    payload: response.data,
  });
  localStorage.setItem("jwt", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  history.push("/");
};
export const userRegister = (
  firstname,
  lastname,
  password,
  email,
  isAdmin,
  zip,
  address,
  address2,
  city,
  stateName
) => async (dispatch) => {
  const response = await axios.post("/signup", {
    firstname,
    lastname,
    password,
    email,
    isAdmin,
    zip,
    address,
    address2,
    city,
    stateName,
  });
  console.log(response.data);
  dispatch({
    type: "USER_REGISTER",
    payload: response.data,
  });
  if (isAdmin) {
    history.push("/");
  } else {
    history.push("/login");
  }
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({
    type: "USER_LOGOUT",
  });

  history.push("/login");
};
