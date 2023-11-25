import React, { useState, useEffect } from "react";
import '../component css/Cart.css'



export default function Cart(props) {

    const getInitialValue = () => {
        try {
            const cartArray = JSON.parse(localStorage.getItem('cartData'));
            let lastupdateQun = 1;
            cartArray.forEach(element => {
                if (element.id === props.product.id) {
                    lastupdateQun = element.qun
                }
            });

            return lastupdateQun
        } catch (error) {
            console.log('last updated value setting error');

            return 1;
        }
    }

    const [qun, setQun] = useState(getInitialValue());




    useEffect(() => {
        props.updateQun(qun, props.product.id)
    }, [qun, props])

    const incQun = () => {
        setQun((qun) => { return qun + 1 })

    }

    const decQun = () => {
        if (qun === 1) {
            return;
        }
        setQun((qun) => { return qun - 1 })

    }




    return (
        <>
            <div className="cart mb-3">
                <div className="cart-img-con">
                    <img src={props.product.product_img} width="80%" className="cart-img" alt="..." />
                </div>

                <div className="cart-data">

                    <div className="row-data">
                        <p className="product-name">{props.product.product_name}</p>


                        <button className="remove-icon" onClick={() => { props.deleteCart(props.product.id) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                            </svg>
                        </button>
                    </div>

                    <div className="row-data">

                        <p className="price-q">₹ {props.product.price}/{props.product.quantity}
                            {props.product.type === "egg" ? " PCs" : " gms"}</p>
                        <div className="selected-q">
                            <div className="quntity-select">
                                <div className="px-2 pointer" id="dec" onClick={decQun}>-</div>
                                <div className="px-2" id='qunHtml'>{qun}</div>
                                <div className="px-2 pointer" id="inc" onClick={incQun}>+</div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}