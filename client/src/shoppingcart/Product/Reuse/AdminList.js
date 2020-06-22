import React, { useEffect, useState } from "react";

const AdminList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/adminList")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, [data]);

  const renderItem =
    data &&
    data.map((item) => {
      return (
        <tbody key={item._id}>
          <tr>
            <th scope="row">1</th>
            <td style={{ fontSize: "15px", color: "white" }}>{item.name}</td>

            <td>
              <button
                className="btn btn-danger"
                onClick={() => console.log("delete")}
              >
                delete
              </button>
            </td>
          </tr>
        </tbody>
      );
    });
  return (
    <div className="create_item_form" style={{ marginTop: "20px" }}>
      <p style={{ textAlign: "center", fontSize: "20px" }}>Admin List</p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        {renderItem}
      </table>
    </div>
  );
};

export default AdminList;
