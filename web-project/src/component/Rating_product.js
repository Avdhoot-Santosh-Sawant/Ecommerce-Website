import React from "react";
import '../component css/Rating_product.css'

export default function Rating_product(props) {


    if (props.value === 1) {
        return (
            <>
                <div>
                    <span className="fa fa-star mx-1 rate-star"></span>
                    <span className="fa fa-star  mx-1 "></span>
                    <span className="fa fa-star  mx-1"></span>
                    <span className="fa fa-star mx-1"></span>
                    <span className="fa fa-star mx-1"></span>

                </div>
            </>
        )
    }
    else if (props.value === 2) {
        return (
            <>
                <div>
                    <span className="fa fa-star mx-1 rate-star"></span>
                    <span className="fa fa-star  mx-1 rate-star"></span>
                    <span className="fa fa-star  mx-1 "></span>
                    <span className="fa fa-star mx-1"></span>
                    <span className="fa fa-star mx-1"></span>

                </div>
            </>
        )
    }
    else if (props.value === 3) {
        return (
            <>
                <div>
                    <span className="fa fa-star mx-1 rate-star"></span>
                    <span className="fa fa-star  mx-1 rate-star"></span>
                    <span className="fa fa-star  mx-1 rate-star"></span>
                    <span className="fa fa-star mx-1"></span>
                    <span className="fa fa-star mx-1"></span>

                </div>
            </>
        )
    }
    else if (props.value === 4) {
        return (
            <>
                <div style={{ display: "inline-block" }}>
                    <span className="fa fa-star mx-1 rate-star"></span>
                    <span className="fa fa-star mx-1 rate-star"></span>
                    <span className="fa fa-star mx-1 rate-star"></span>
                    <span className="fa fa-star mx-1 rate-star"></span>
                    <span className="fa fa-star mx-1"></span>

                </div>
            </>
        )
    }
    else if (props.value === 5) {
        return (
            <>
                <div>
                    <span className="fa fa-star mx-1 rate-star"></span>
                    <span className="fa fa-star  mx-1 rate-star"></span>
                    <span className="fa fa-star  mx-1 rate-star"></span>
                    <span className="fa fa-star mx-1 rate-star"></span>
                    <span className="fa fa-star mx-1 rate-star"></span>

                </div>
            </>
        )
    }
    else {
        return;
    }


}