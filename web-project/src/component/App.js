import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../component css/App.css'
import Header from './Header.js'
import Home from './Home';
import Products from './Products';
import Carts from './Carts'
import SignIn from './SignIn';
import SignUp from './SignUp'
import ProductDetail from './Product_detail';



function App(props) {




// useEffect(()=>{

// },[])

  useEffect(() => {
    if (localStorage.getItem('auth') == null || localStorage.getItem('auth').length === 0) {
      localStorage.setItem('auth', false);
    }

    if (localStorage.getItem('authData') == null || localStorage.getItem('authData').length === 0) {
      localStorage.setItem('authData', JSON.stringify({}))
    }

    if (localStorage.getItem('cartData') == null || localStorage.getItem('cartData').length === 0) {
      localStorage.setItem('cartData', JSON.stringify([]))
    }

    if (JSON.parse(localStorage.getItem('auth')) === true && (localStorage.getItem('auth') === undefined || JSON.parse(localStorage.getItem('auth')).length === 0)) {
      localStorage.setItem('auth', false)
    }

    if (JSON.parse(localStorage.getItem('authData')).length === 0) {
      localStorage.setItem('authData', JSON.stringify({}))
    }


    if (localStorage.getItem('cartData') === 'undefined') {
      localStorage.setItem('cartData', JSON.stringify([]))
    }
    //  console.log('app')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.state])

  return (
    <>


      <Router>
        <Header state={props.state} AppStateHandle={props.AppStateHandle} />
        <Routes>

          <Route path='/' element={<Home />} exact />
          <Route path='/products' element={<Products state={props.state} AppStateHandle={props.AppStateHandle} />} exact />
          <Route path='/carts' element={<Carts state={props.state} AppStateHandle={props.AppStateHandle} />} exact />
          <Route path='/SignIn' element={<SignIn state={props.state} AppStateHandle={props.AppStateHandle} />} exact />
          <Route path='/SignUp' element={<SignUp state={props.state} AppStateHandle={props.AppStateHandle} />} exact />
          <Route path='/products/:productID' element={<ProductDetail state={props.state} AppStateHandle={props.AppStateHandle} />} exact />
          
       
        </Routes>
      </Router>






    </>
  );
}

export default App;
