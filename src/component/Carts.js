import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../component css/Carts.css";
import Cart from "./Cart";
import ProductData from "../json files/products.json";
import axios from "axios";

export default function Carts(props) {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
  const [total_price, setTotalPrice] = useState(0);
  const [productsCart, setProductsCart] = useState([]);
  const [authData, setAuthData] = useState({});

  useEffect(() => {
    setProductsCart(cartData());

    try {
      setAuth(JSON.parse(localStorage.getItem("auth")));
      setAuthData(JSON.parse(localStorage.getItem("authData")));
    } catch (e) {
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleTotalPrice = () => {
    try {
      let cardArray = JSON.parse(localStorage.getItem("cartData"));
      let total = 0;

      if (cardArray.length !== 0) {
        for (let a = 0; a < cardArray.length; a++) {
          total += cardArray[a].qun * productsCart[a].price;
        }
      }
      //   console.log('price called')
      setTotalPrice(total);
    } catch (error) {
      console.log("total price calculation error");
    }
  };

  const deleteCart = async (pID) => {
    if (
      localStorage.getItem("cartData") === "undefined" ||
      localStorage.getItem("cartData") == null ||
      localStorage.getItem("cartData").length === 0
    ) {
      localStorage.setItem("cartData", JSON.stringify([]));
    }

    let cartArray = JSON.parse(localStorage.getItem("cartData"));

    const updatedList = cartArray.filter((v) => {
      return v.id !== pID;
    });

    localStorage.setItem("cartData", JSON.stringify(updatedList));

    await handleDBevent(updatedList);
    props.AppStateHandle(10);
    setProductsCart(cartData());
  };

  const cartData = () => {
    if (
      window.localStorage.getItem("cartData") == null ||
      JSON.parse(localStorage.getItem("cartData")).length === 0
    ) {
      document.getElementById("cart-container").style.display = "none";
      document.getElementById("cart-total-buy").style.display = "none";
      document.getElementById("empty-icon").style.display = "inline-block";
      return [];
    } else {
      document.getElementById("empty-icon").style.display = "none";
      document.getElementById("cart-container").style.display = "block";
      document.getElementById("cart-total-buy").style.display = "block";

      let cartData = JSON.parse(localStorage.getItem("cartData"));

      let cartIds = cartData.map((v) => {
        return v.id;
      });

      let product_array = cartIds.map((v) => {
        return ProductData[v - 1];
      });

      // console.log(product_array)
      return product_array;
    }
  };

  const handleDBevent = async (updatedList) => {
    if (auth) {
      const userData = JSON.parse(localStorage.getItem("authData"));
      const sentPut = {
        user: userData,
        addProduct: updatedList,
      };

      try {
        const res = await axios.put(
          "https://just-poultry-things.onrender.com/carts",
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
        alert("system error or cheak your network connection", error);
      }
    }
  };

  const updateQun = (qun, pid) => {
    if (
      localStorage.getItem("cartData") == null ||
      localStorage.getItem("cartData").length === 0
    ) {
      localStorage.setItem("cartData", "[]");
    }

    let cartArray = JSON.parse(localStorage.getItem("cartData"));
    // console.log(cartArray)
    cartArray.forEach((element) => {
      if (element.id === pid) {
        element.qun = qun;
      }
    });

    localStorage.setItem("cartData", JSON.stringify(cartArray));
    handleDBevent(cartArray);
    handleTotalPrice();
  };

  //payment methods

  const webInfo = {
    name: "justPoultryThings",
    img: "/falcon.jpeg",
    price: total_price,
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_SJIRcR6C1j6Yn0",
      amount: data.amount,
      currency: data.currency,
      name: webInfo.name,
      description: "Test Transaction",
      image: webInfo.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl =
            "https://just-poultry-things.onrender.com/api/payment/paymentVerify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
          alert(data.message);
        } catch (error) {
          console.log(error);
        }
      },
      // callback_url: "http://localhost:3001/api/payment/paymentVerify",
      // handler: function (response){
      //     alert(response.razorpay_payment_id);
      //     alert(response.razorpay_order_id);
      //     alert(response.razorpay_signature)
      // },
      prefill: {
        //sample name,email,contact;
        name: authData.name,
        email: authData.email,
        contact: "+91" + authData.mobile,
      },
      notes: {
        address: "navi mumbai, maharashtra",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  const handlePayment = async () => {
    if (auth) {
      if (authData.name && authData.mobile && authData.email) {
        try {
          const orderURL =
            "https://just-poultry-things.onrender.com/api/payment/order";
          const { data } = await axios.post(orderURL, { amount: total_price });
          console.log(data);
          initPayment(data.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Internal Server Error!");
      }
    } else {
      alert("please, login to system");
    }
  };

  return (
    <>
      <div className="container mt-3">
        <Link to="/products">
          <span className="back-arrow" title="Explore other products">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </span>
        </Link>

        <h3
          style={{
            fontWeight: "700",
            display: "inline-block",
            paddingLeft: "20px",
          }}
        >
          Cart List{" "}
        </h3>
        <div style={{ border: "1px solid black" }}></div>
      </div>

      <div id="empty-icon">
        <img alt="..." src="/emptycart2.gif" />
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM252 160c0-11 9-20 20-20h44V96c0-11 9-20 20-20s20 9 20 20v44h44c11 0 20 9 20 20s-9 20-20 20H356v44c0 11-9 20-20 20s-20-9-20-20V180H272c-11 0-20-9-20-20z" /></svg> */}
      </div>

      <div className="cart-div mt-2 p-2" id="cart-container">
        <div className="cart-con">
          {productsCart.map((pro) => {
            return (
              <Cart
                key={pro.id}
                product={pro}
                deleteCart={deleteCart}
                updateQun={updateQun}
              />
            );
          })}
        </div>
      </div>

      <div className="container cart-total-buy" id="cart-total-buy">
        <div id="total-price">total = ₹ {total_price} </div>

        <div>
          <button id="buy-btn" onClick={handlePayment}>
            Buy now
          </button>
        </div>
      </div>
    </>
  );
}
