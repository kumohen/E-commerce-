import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ItemList from "./ItemList";

const Category = ({ title, category }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (category) {
      fetch(`http://localhost:5000/item/${category}`)
        .then((res) => res.json())
        .then((result) => {
          setData(result);
        });
    }
  }, [data, category, title]);

  return (
    <div>
      <h3>{title}</h3>
      <ItemList items={data} />
    </div>
  );
};

export default Category;
