import "./App.css";

// Components
import Music from "./components/music/Music.jsx";
import Welcome from "./components/welcome/Welcome.jsx";
import Home from "./components/home/Home.jsx";
import Game from "./components/game/Game.jsx";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser, setScreen } from "./redux/reducer.js";

// Server url

export default function App() {
    const screen = useSelector((state) => state.screen);
    const serverUrl = useSelector((state) => state.serverUrl); // Change serverUrl in redux reducer before deploying

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("App.js useEffect serverUrl :", serverUrl);

        fetch(serverUrl + "/user/id.json")
            .then((response) => response.json())
            .then((data) => {
                console.log("fetch /user/id.json data :", data);

                if (data.id) {
                    const userData = data;
                    userData && dispatch(loginUser(userData));
                } else {
                    dispatch(logoutUser());
                    dispatch(setScreen("start"));
                }
            });
        alert("DO NOT use your real email or password! This webpage is for demonstration only. Please use a fake email and password.");
    }, []);

    return (
        <>
            {screen === "start" && (
                <>
                    <div className="backgroundCharacterCreation">
                        <div className="columnFlex">
                            <h1 className="storyText" onClick={() => dispatch(setScreen("welcome"))}>
                                Guillem presents:
                            </h1>
                        </div>
                    </div>
                </>
            )}
            {screen !== "start" && <Music />}
            {screen === "welcome" && <Welcome />}
            {screen === "home" && <Home />}
            {screen === "game" && <Game />}
        </>
    );
}
