import "./welcome.css";

// import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Login from "./subcomponents/Login.jsx";
import Registration from "./subcomponents/Registration.jsx";
import Password from "./subcomponents/Password.jsx";

export default function Welcome() {
    const fadeRef = useRef(null);
    const [menu, setMenu] = useState("login");

    useEffect(() => {
        console.log("Welcome.jsx useEffect");

        fadeRef.current.style.backgroundColor = "black";
        fadeRef.current.style.visibility = "visible";
        setTimeout(() => {
            // Fade to view
            fadeRef.current.style.backgroundColor = "none";
            fadeRef.current.style.animation = "fadetoview 1s none linear";

            setTimeout(() => {
                fadeRef.current.style.visibility = "hidden";
            }, 1000);
        }, 150);
    }, []);

    function changeMenu(newMenu) {
        // console.log("changeMenu :", newMenu);
        setMenu(newMenu);
    }

    return (
        <div id="Welcome">
            <div className="fadetoblack" ref={fadeRef}></div>
            <div className="backgroundWelcome">
                <div id="background5" className="background"></div>
                <div id="background4" className="background"></div>
                <div id="background3" className="background"></div>
                <div id="background2" className="background"></div>
                <div id="background1" className="background"></div>
            </div>
            <div className="titleTxt">
                <div>
                    <h4 className="shadow">Welcome to</h4>
                    <h4 className="title">Welcome to</h4>
                </div>
                <div>
                    <h1 id="logoShadow">TRIBES</h1>
                    <h1 id="logo">TRIBES</h1>
                </div>
                <div>
                    <h3 className="shadow">Join now and claim your</h3>
                    <h3 className="title">Join now and claim your</h3>
                </div>
                <div>
                    <h2 className="shadow">FREEDOM</h2>
                    <h2 className="title">FREEDOM</h2>
                </div>
            </div>
            {menu === "login" && <Login changeMenu={changeMenu} />}
            {menu === "signup" && <Registration changeMenu={changeMenu} />}
            {menu === "password" && <Password changeMenu={changeMenu} />}
        </div>
    );
}
