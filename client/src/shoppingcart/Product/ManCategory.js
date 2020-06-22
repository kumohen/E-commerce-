import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ItemList from "./Reuse/ItemList";

const ManCategory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/item/man")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, [data]);

  return (
    <div>
      <ItemList items={data} />
    </div>
  );
};

export default ManCategory;
