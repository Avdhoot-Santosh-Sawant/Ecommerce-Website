import React, { useEffect, useState } from "react";
import "../component css/Header.css";
import { Link ,useNavigate } from "react-router-dom";

// done

export default function Header(props) {
  const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem('auth')));
  const [userName, setUserName] = useState('user');
  const [noOfCard, setNoOfCart] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (window.location.pathname === '/products') {
        document.getElementById("home").style.backgroundColor = "black";
        document.getElementById("product").style.backgroundColor = "green";
        document.getElementById("home-mobile").style.backgroundColor = "white";
        document.getElementById("product-mobile").style.backgroundColor = "green";

      }

      if (window.location.pathname === '/') {
        document.getElementById("home").style.backgroundColor = "green";
        document.getElementById("product").style.backgroundColor = "black";
        document.getElementById("home-mobile").style.backgroundColor = "green";
        document.getElementById("product-mobile").style.backgroundColor = "white";
      }
    }, 1000)

    try {
      document.getElementById('SignIn-btn').style.display = 'inline-block'
      document.getElementById('user-display').style.display = 'inline-block'
      document.getElementById('sm-login-nonAuth').style.display = 'inline-block'
      document.getElementById('sm-login-Auth').style.display = 'inline-block'

    } catch (e) {
      console.log(e)
    }


    setIsAuth(JSON.parse(localStorage.getItem('auth')))


    if (isAuth === true) {
      const n = JSON.parse(localStorage.getItem('authData'));
      const cart_info = n.cart_info;


      localStorage.setItem('cartData', JSON.stringify(cart_info))

      // console.log(n)
      const name = n.name.split(' ')[0]
      setUserName(name)
      // console.log('auth')         
      document.getElementById('SignIn-btn').style.display = 'none'
      document.getElementById('sm-login-nonAuth').style.display = 'none'

    } else {

      // console.log(isAuth,JSON.parse(localStorage.getItem('auth')))
      document.getElementById('user-display').style.display = 'none'
      document.getElementById('sm-login-Auth').style.display = 'none'
    }

  }, [props.state, isAuth])




  useEffect(() => {
    try {
      const a = localStorage.getItem('cartData');
      if (a === 'undefined' || a == null || a === undefined) {
        localStorage.setItem('authData', JSON.stringify({}))
    localStorage.setItem('cartData', JSON.stringify([]))
        console.log('undefined')
        return;
      }
      const l = JSON.parse(a)
      setNoOfCart(l.length)
      // console.log(a)
    }
    catch (error) {
      setNoOfCart(0)
    }



  }, [props, isAuth, props.state])


  function open_sidebar() {
    document.getElementById("topdown").classList.add("visible-nav");
  }

  function close_sidebar() {
    document.getElementById("topdown").classList.remove("visible-nav");
  }

  //show active link navbar large screen
  async function active_data(ele) {

    document.getElementById("home").style.backgroundColor = "black";
    document.getElementById("product").style.backgroundColor = "black";

    ele.style.backgroundColor = "green";
  }

  //show active link navbar small screen
  function active_datas(ele) {
    document.getElementById("home-mobile").style.backgroundColor = "white";
    document.getElementById("product-mobile").style.backgroundColor = "white";
    ele.style.backgroundColor = "green";

    close_sidebar();
  }

  const unsetColor = () => {
    document.getElementById("home").style.backgroundColor = "black";
    document.getElementById("product").style.backgroundColor = "black";
    document.getElementById("home-mobile").style.backgroundColor = "white";
    document.getElementById("product-mobile").style.backgroundColor = "white";

  }

  const logoutUser = () => {
    localStorage.setItem('auth', false);
    setIsAuth(false)
    localStorage.setItem('authData', JSON.stringify({}))
    localStorage.setItem('cartData', JSON.stringify([]))
   
    navigate("/");
    props.AppStateHandle(3)
    if (window.location.pathname === '/') {
      document.getElementById("home").style.backgroundColor = "green";
      document.getElementById("product").style.backgroundColor = "black";
      document.getElementById("home-mobile").style.backgroundColor = "green";
        document.getElementById("product-mobile").style.backgroundColor = "white";
    }

  }

  return (
    <>
      {/* navbar */}

      <header>
        
        <div className="container-fluid" id="outer">
          <h2 className="logo-name">justPoetryThings</h2>
        </div>

        <div className="navbar-custom">
          <div className="navbar-logo">
            <img src={"images/falcon.jpeg"} id="logo-img" alt="..." />
            <div className="logo-name my-1" id="inner">
              justPoultryThings
            </div>
          </div>

          <div className="nav-collapse1">
            <div className="navbar-link">
              <Link to="/">
                <p
                  id="home"
                  onClick={(e) => {
                    active_data(e.target);
                  }}
                >
                  Home
                </p>
              </Link>
              <Link to="/products">
                <p
                  id="product"
                  onClick={(e) => {
                    active_data(e.target);
                  }}
                >
                  Product
                </p>
              </Link>
            </div>
          </div>

          <div className="nav-collapse2">

            <Link to={'/carts'} onClick={unsetColor}>
              <button className="btn-cart mx-2">Cart <b id="no_cart">{
                noOfCard
              }</b></button>
            </Link>

            <Link to={'SignIn'} onClick={unsetColor} id='SignIn-btn'>
              <button className="btn-login  mx-2" >
                Login
              </button>
            </Link>

            <div id="user-display">
              <div className="dropdown">
                <button className="btn btn-login dropdown-toggle" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                  Hello,{userName}
                </button>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li className="dropdown-item user-op" onClick={logoutUser}>Logout</li>
                </ul>
              </div>
            </div>




          </div>

          <div className="small-screen-nav">
            <div>
              <Link to={'/carts'}>
                <button id="cart-img">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM252 160c0-11 9-20 20-20h44V96c0-11 9-20 20-20s20 9 20 20v44h44c11 0 20 9 20 20s-9 20-20 20H356v44c0 11-9 20-20 20s-20-9-20-20V180H272c-11 0-20-9-20-20z" />
                  </svg>
                </button>
              </Link>
            </div>

            <div id='sm-login-nonAuth'>
              <Link to={'/SignIn'}>
                <button id="login">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                  </svg>
                </button>
              </Link>
            </div>

            <div id="sm-login-Auth">
              <div className="dropdown">
                <button className="btn btn-login auth-sm-login-icon" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                  {userName[0]}
                </button>
                <ul className="dropdown-menu " aria-labelledby="dropdownMenuLink">
                  <li className="dropdown-item user-op" onClick={logoutUser}>Logout</li>
                </ul>
              </div>
            </div>


            <div>
              <button id="three-bars" onClick={open_sidebar}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/*dropdown container*/}

      <div id="topdown" className="container-dropdown">
        <div id="con-close">
          <b onClick={close_sidebar} id="btn-close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
            </svg>
          </b>
        </div>

        <ul id="list">
          <li>
            <Link
              id="home-mobile"
              className="active-nav-link"
              to="/"
              onClick={(e) => {
                active_datas(e.target);
              }}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              className="active-nav-link"
              id="product-mobile"
              to="/products"
              onClick={(e) => {
                active_datas(e.target);
              }}
            >
              Product
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
