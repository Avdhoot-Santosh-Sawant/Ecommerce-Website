import React from "react";
import "../component css/Home.css";
// import KeyFeature from "./KeyFeature";
import Footer from "./Footer";

// done

function HomeImages() {
  return (
    <>
      <div className=" h-75">
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/img1.jpg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <p style={{ color: "gold", backgroundColor: "#241f1fa8" }}>
                  Chickens And Eggs Are Best,When They Are Fresh
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/img2.jpg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <p style={{ color: "gold", backgroundColor: "#241f1fa8" }}>
                  Order fresh chicken and egg from justPoetryThings now!
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/img3.jpg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <p style={{ color: "gold", backgroundColor: "#241f1fa8" }}>
                  Our Chicken and Eggs are 100% fresh and safe.
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <>
      <HomeImages />

      {/* <KeyFeature/> */}

      {/* home */}

      <div id="Home" style={{ display: "block" }}>
        <div className="container-fluid home-info">
          <div className="in-home-info">
            <h3
              style={{
                color: "blue",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              About justPoetryThings
            </h3>
            <p>
              justPoetryThings is your one-stop fresh meat delivery online
              shop.you get freshest Chicken &amp; high protein eggs, delivered
              straight to your doorstep. Now you can buy chicken and eggs online
              anytime at your convenience. All our products are completely
              natural and healthy. Most of produsts are ready to cook. Our
              website provides you best chicken and eggs in best price.
            </p>
          </div>
          <hr />
          <div className="in-home-info">
            <h3
              style={{
                color: "orange",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              VISION
            </h3>
            <p></p>
            <ul>
              <li>To redefine India’s freshest and finest food experience.</li>
              <li> To offer customers better service </li>
              <li>
                {" "}
                To provides the best quality, benefits, flavour and taste.
              </li>
            </ul>
            <p />
            <hr />
          </div>
        </div>
        {/* Egg and Chicken */}
        <div className="container-fluid pd">
          {/* egg*/}
          <div className="pro">
            <div className="pro_img">
              <div
                style={{
                  width: "90%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <img
                  width="100%"
                  src={"/eggs.jpg"}
                  style={{ borderRadius: "15%" }}
                  alt=""
                />
              </div>
            </div>
            <div>
              <h3 style={{ textAlign: "center", color: "rgb(31, 10, 218)" }}>
                Eggs
              </h3>
              <div className="pro_info">
                <p>
                  When you buy eggs from justPoetryThings, it’s all about
                  variety, quality, hen husbandry, integrity and excellence. We
                  sell 4 type of eggs includes White egg, Brown egg, Nutri more
                  egg, Power eggs. Our organic eggs come from chickens that eat
                  a special diet and eggs provides more nutrients, vitamins,
                  minerals, -- per calorie than most other foods.
                </p>
              </div>
            </div>
          </div>
          {/* Chicken */}
          <div className="my-4 pro">
            <div className="pro_img">
              <div
                style={{
                  width: "90%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <img
                  src={"/home-img-chicken.png"}
                  width="100%"
                  style={{ borderRadius: "15%" }}
                  alt=""
                />
              </div>
            </div>
            <div>
              <h3 style={{ textAlign: "center", color: "rgb(31, 10, 218)" }}>
                Chicken
              </h3>
              <div className="pro_info">
                <p>
                  justPoetryThings is a shop for all your fresh and processed
                  chicken needs. We sell fresh, hygienic and processed chicken.
                  We sell wide variety of ready to eat Delicious chicken
                  products to cater to every requirement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
