import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ItemList from "./Reuse/ItemList";

const MobileCategory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/item/mobile")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, [data]);

  return (
    <div>
      <h2>Mobile Category</h2>
      <ItemList items={data} />
    </div>
  );
};

export default MobileCategory;
