import React, { useEffect, useState } from "react";
import "../component css/Product_detail.css";
import Footer from "./Footer";
import productData from "../json files/products.json";
import RatingProduct from "./Rating_product";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductDetail(props) {
  const [product, setproduct] = useState({});
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
  }, []);

  useEffect(() => {
    const id = Number(window.location.pathname.split(":")[1]);
    // console.log(id)
    const product_get = productData[id - 1];
    setproduct(product_get);
  }, []);

  const addToCart = async () => {
    const obj = {
      id: product.id,
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
        if (oldData[i].id === product.id) {
          alert("This product present in cart list");
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
        const res = await axios.put(
          "https://just-poultry-things.onrender.com/products",
          sentPut
        );

        if (res.body === "error occured at server side") {
          alert(res.body);
        } else {
          localStorage.setItem("authData", JSON.stringify(res.data));
          const n = JSON.parse(localStorage.getItem("authData"));
          const cart_info = n.cart_info;
          localStorage.setItem("cartData", JSON.stringify(cart_info));
        }
      } catch (error) {
        alert("Add to cart error", error);
      }
    }
    props.AppStateHandle(100);
  };

  return (
    <>
      <div>
        <div>
          <div className="container-custom mt-4">
            <div>
              <Link to={"/products"}>
                <span>
                  <img
                    src="/arrow-left-cart.svg"
                    alt="."
                    height={"20px"}
                    style={{ marginLeft: "5px", marginRight: "5px" }}
                  />
                  Back
                </span>
              </Link>
            </div>
            <div className="row gx-4 mt-3">
              <div className="col-12 col-md-6 border-end">
                <div className="p-2">
                  <div className="img-thumbnail container">
                    <img src={product.product_img} alt=".." width="100%" />
                  </div>
                </div>
              </div>

              <div className="col col-md-6 my-4 my-lg-2">
                <div className="fw-bold mx-5">
                  <h3 style={{ fontWeight: "700" }}>{product.product_name}</h3>
                  <div>
                    <RatingProduct value={product.rating} />
                  </div>
                </div>

                <div className="mx-5 my-3">
                  <p>
                    Price :- Rs. <span id="mrp">{product.price}</span>
                  </p>
                  <p>
                    Quantity:{" "}
                    <span id="q">
                      {product.quantity}{" "}
                      {product.type === "egg" ? "PCs" : "gms"}
                    </span>
                  </p>
                  <p>Product Type :- {product.type}</p>
                </div>

                <div className="mx-5 my-2">
                  <h4>About this product</h4>
                  <div className="desc">{product.short_desc}</div>
                </div>

                <div className="product-action-btn mx-5">
                  <button id="btn-atc" onClick={addToCart}>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
