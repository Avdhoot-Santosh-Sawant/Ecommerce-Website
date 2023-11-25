import React from "react";

export default function Footer() {
  return (
    <>
      {/* footer */}
      <footer id="footer">
        <div
          className="container-fluid my pt-3 mt-4 p-md-3"
          style={{ color: "white", backgroundColor: "rgb(1, 49, 101)" }}
        >
          <h3
            id="about_us"
            style={{ marginLeft: 20, textDecoration: "underline" }}
          >
            justPoultryThings
          </h3>
          <div className="container p-2 my-3 text-bg-primary">
            <div>
              <h4 style={{ color: "#0ff90f", fontWeight: 800 }}>Contact Us</h4>
              <ul>
                <li>9326207369</li>
                <li>justPoetryThings@gmail.com</li>
                <li>
                  <a
                    href="https://avdhoot-santosh-sawant.netlify.app/"
                    target="_black"
                    style={{ color: "white" }}
                  >
                    Developer Profile
                  </a>
                </li>
              </ul>
            </div>
            <hr />
            <div>
              <h4 style={{ color: "#0ff90f", fontWeight: 800 }}>
                Cities we serve{" "}
              </h4>
              <ul>
                <li>Mumbai</li>
                <li>Thane</li>
                <li>New Mumbai</li>
              </ul>
            </div>
          </div>
          <hr />
          <div
            className="container p-3 fw-bold text-bg-primary"
            style={{ textAlign: "center" }}
          >
            <p>
              justPoetryThings is online presence/website of physical retail
              store which selling egg and chicken products. We deliver our
              products in mumbai, Thane and new mumbai. We sell eggs and chicken
              in affortable price.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
