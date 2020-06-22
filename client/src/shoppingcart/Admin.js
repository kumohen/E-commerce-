import React, { useState } from "react";
//import {Link} from "react-router-dom";
import CreateCart from "./CreateCart";
import Products from "./Product/Products";
import AddAdmin from "./Product/Reuse/AddAdmin";
import AdminList from "./Product/Reuse/AdminList";

const Admin = () => {
  const [show, setShow] = useState(false);
  const [showP, setShowP] = useState(false);
  const [showAForm, setshowAForm] = useState(false);
  const [list, AshowList] = useState(false);
  const showForm = (e) => {
    setShowP(false);
    setshowAForm(false);
    AshowList(false);
    setShow(true);
  };
  const showProduct = (e) => {
    setShow(false);
    setshowAForm(false);
    AshowList(false);
    setShowP(true);
  };
  const showAdminForm = (e) => {
    setShow(false);
    setShowP(false);
    AshowList(false);
    setshowAForm(true);
  };
  const showList = (e) => {
    setShow(false);
    setShowP(false);
    setshowAForm(false);
    AshowList(true);
  };
  return (
    <div className="container">
      <div className="row admin">
        <div className="col-2 admin_left">
          <button onClick={showForm} className="btn btn-admin " to="create">
            Create Product
          </button>
          <br />
          <button onClick={showProduct} className="btn btn-admin " to="create">
            show Product
          </button>
          <br />
          <button
            onClick={showAdminForm}
            className="btn btn-admin "
            to="create"
          >
            Add Admin
          </button>
          <button onClick={showList} className="btn btn-admin " to="create">
            AdminList
          </button>
        </div>
        <div className="col-10 bg-info admin_right">
          {show ? <CreateCart /> : ""}

          {showP ? <Products /> : ""}
          {showAForm ? <AddAdmin /> : ""}
          {list ? <AdminList /> : ""}
        </div>
      </div>
    </div>
  );
};

export default Admin;
