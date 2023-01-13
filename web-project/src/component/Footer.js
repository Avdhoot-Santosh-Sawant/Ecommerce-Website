import React from 'react'

export default function Footer() {

  return (


    <>
      {/* footer */}
      <footer id="footer">
        <div
          className="container-sm  my-4 py-2"
          style={{ color: "white", backgroundColor: "rgb(56, 51, 51)" }}
        >
          <h3 id="about_us" style={{ marginLeft: 20, textDecoration: "underline" }}>
            justPoultryThings
          </h3>
          <div className="container p-2 bg-light my-3 text-dark">
            <div>
              <h4 style={{ color: "green", fontWeight: 800 }}>Contact Us</h4>
              <ul>
                <li>9326207369</li>
                <li>justPoetryThings@gmail.com</li>
              </ul>
            </div>
            <hr />
            <div>
              <h4 style={{ color: "green", fontWeight: 800 }}>Cities we serve </h4>
              <ul>
                <li>Mumbai</li>
                <li>Thane</li>
                <li>New Mumbai</li>
              </ul>
            </div>
          </div>
          <div
            className="container p-3 fw-bold bg-light"
            style={{ textAlign: "center", color: "black" }}
          >
            <p>
              justPoetryThings is online presence/website of physical retail store
              which selling egg and chicken products. We deliver our products in
              mumbai, Thane and new mumbai. We sell eggs and chicken in affortable
              price.
            </p>
          </div>
        </div>
      </footer>
    </>


  )


}