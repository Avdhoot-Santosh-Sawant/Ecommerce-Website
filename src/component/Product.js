import React, { useEffect, useState } from "react";
import "../component css/Product.css";
import { Link } from "react-router-dom";
import Ratingproduct from "./Rating_product";
import axios from "axios";

export default function Product(props) {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
  }, []);

  const addToCart = async () => {
    const obj = {
      id: props.product.id,
      qun: 1,
    };

    if (
      localStorage.getItem("cartData") === "undefined" ||
      localStorage.getItem("cartData") == null ||
      localStorage.getItem("cartData").length === 0
    ) {
      localStorage.setItem("cartData", JSON.stringify([]));
    }

    let oldData = JSON.parse(localStorage.getItem("cartData"));

    if (oldData.length === 0) {
    } else {
      for (let i = 0; i < oldData.length; i++) {
        if (oldData[i].id === props.product.id) {
          alert("This product already added to cart list,\n visit cart list");
          return;
        }
      }
    }

    oldData.push(obj);
    localStorage.setItem("cartData", JSON.stringify(oldData));

    if (auth) {
      const userData = JSON.parse(localStorage.getItem("authData"));
      const sentPut = {
        user: userData,
        addProduct: oldData,
      };

      try {
        const res = await axios.put("/products", sentPut);

        if (res.body === "error occured at server side") {
          alert(res.body);
        } else {
          localStorage.setItem("authData", JSON.stringify(res.data));
          const n = JSON.parse(localStorage.getItem("authData"));
          const cart_info = n.cart_info;
          localStorage.setItem("cartData", JSON.stringify(cart_info));
          // console.log('here',typeof auth)
        }
      } catch (error) {
        alert("Add to cart error", error);
      }
    }
    props.AppStateHandle(100);
  };

  return (
    <>
      <div className="col-12 col-sm-6 col-lg-4 col-xl-4 col-xxl-3">
        <div
          style={{ textDecoration: "none", color: "black" }}
          className="card"
        >
          <img
            src={props.product.product_img}
            className="card-img-top product-img"
            alt="..."
          />

          <Link to={`/products/:${props.product.id}`}>
            <div className="card-body fs-6 text-wrap fw-bold my-auto text-center product_name">
              <p>{props.product.product_name}</p>
            </div>
          </Link>

          <div>
            <div id="rating-pro">
              {<Ratingproduct value={props.product.rating} />}
            </div>
          </div>
          <p className="rate">
            MRP:₹
            <span className="price">
              {props.product.price}/{props.product.quantity}
              {props.product.type === "egg" ? " PCs" : " gms"}
            </span>
          </p>
          <div className="rate-block">
            <button className="btn-atc" onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
