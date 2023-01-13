
import React, { useState } from "react";
import App from "./App";



export default function App1() {
    const [state, setstate] = useState(0);


    const AppStateHandle = (v) => {
        setstate((state) => state + v)
    }

    return (
        <>

            <App state={state} AppStateHandle={AppStateHandle} />

        </>
    )
}