import "./App.css";

// Components
import Music from "./components/music/Music.jsx";
import Welcome from "./components/welcome/Welcome.jsx";
import Home from "./components/home/Home.jsx";
import Game from "./components/game/Game.jsx";

import { socket } from "./socket.js";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser, setScreen, setMusic } from "./redux/reducer.js";

// Server url

export function App() {
    const screen = useSelector((state) => state.screen);
    const serverUrl = useSelector((state) => state.serverUrl); // Change serverUrl in redux reducer before deploying

    const fadeRef = useRef(null);

    const dispatch = useDispatch();

    function goWelcome() {
        dispatch(setMusic("menu"));
        dispatch(setScreen("welcome"));
    }

    useEffect(() => {
        console.log("App.jsx [screen] useEffect");

        fadeRef.current.style.animation = "none";
        fadeRef.current.style.backgroundColor = "black";
        fadeRef.current.style.visibility = "visible";
        setTimeout(() => {
            fadeRef.current.style.backgroundColor = "none";
            fadeRef.current.style.animation = "fadetoview 1s none linear";

            setTimeout(() => {
                fadeRef.current.style.visibility = "hidden";
            }, 1000);
        }, 150);
    }, [screen]);

    useEffect(() => {
        console.log("App.js [] useEffect serverUrl :", serverUrl);

        fetch(serverUrl + "/user/id.json")
            .then((response) => response.json())
            .then((data) => {
                console.log("fetch /user/id.json data :", data);

                if (data.id) {
                    socket.emit("login", data.id);

                    const userData = data;
                    userData && dispatch(loginUser(userData));
                } else {
                    dispatch(logoutUser());
                    dispatch(setScreen("start"));
                }
            });
        // alert("DO NOT use your real email or password! \n\nThis webpage is for demonstration only.\nPlease use a fake email and password.");
    }, []);

    return (
        <>
            <div className="fadetoblack" ref={fadeRef}></div>
            {screen === "start" && (
                <>
                    <div className="backgroundCharacterCreation">
                        <div className="columnFlex">
                            <h1 className="storyText" onClick={goWelcome}>
                                reiggrau presents:
                            </h1>
                            <h4 className="storyTextStatic">(click text to continue)</h4>
                            <p>This page is for demonstration purposes only. Please use a fake email and password to sign in</p>
                            <p>Art & music from 'Far Cry Primal' & 'Dawn of Man'</p>
                        </div>
                    </div>
                </>
            )}
            <Music />
            {(screen === "welcome" || screen === "start") && <Welcome />}
            {screen === "home" && <Home />}
            {screen === "game" && <Game />}
        </>
    );
}
