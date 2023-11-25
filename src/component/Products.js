import React, { useState, useEffect } from "react";
import "../component css/Products.css";
import Product from "./Product";
import Footer from "./Footer";
import products_data from "../json files/products.json";

export default function Products(props) {
  const [productType, setProductType] = useState("chicken");

  let filterdData = () => {
    let data = products_data.filter((pro) => {
      return pro.type === productType;
    });
    return data;
  };

  useEffect(() => {
    document.getElementById("c-chicken").classList.add("active_c");

    setTimeout(() => {
      if (window.location.pathname === "/products") {
        document.getElementById("home").style.backgroundColor = "black";
        document.getElementById("product").style.backgroundColor = "green";
      }

      if (window.location.pathname === "/") {
        document.getElementById("home").style.backgroundColor = "green";
        document.getElementById("product").style.backgroundColor = "block";
      }
    }, 500);
  }, []);

  const active = (pType) => {
    if (pType === "chicken") {
      document.getElementById("c-chicken").classList.add("active_c");
      document.getElementById("c-egg").classList.remove("active_c");
    } else {
      document.getElementById("c-chicken").classList.remove("active_c");
      document.getElementById("c-egg").classList.add("active_c");
    }

    setProductType(pType);
  };

  return (
    <>
      <div className="container mt-4">
        <h3 id="sbc">SEARCH BY CATEGORY</h3>

        <div id="category">
          <div
            id="c-chicken"
            onClick={() => {
              active("chicken");
            }}
          >
            <img src={"/home-img-chicken.png"} width="40%" alt=".." />
            <h6 className="nameP">Chicken</h6>
          </div>

          <div
            id="c-egg"
            onClick={() => {
              active("egg");
            }}
          >
            <img src={"/eggs.jpg"} width="40%" alt=".." />
            <h6 className="nameP">Egg</h6>
          </div>
        </div>
      </div>

      <div className="container my-4">
        <div className="row justify-content-center gx-md-5 gx-3 gy-4">
          {filterdData().map((pro) => {
            return (
              <Product
                key={pro.id}
                product={pro}
                AppStateHandle={props.AppStateHandle}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <Footer />
      </div>
    </>
  );
}
