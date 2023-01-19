import "./App.css";

// Components
import Welcome from "./components/Welcome.jsx";
// import Home from "./components/Home/Home.jsx";
// import Game from "./components/Game/Game.jsx";

// import Sound from "react-sound";
// import MenuMusic from "../src/assets/DawnOfManMenu.mp3";

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
            {/* {(screen === "welcome" || screen === "home") && (
                <Sound url={MenuMusic} playStatus={Sound.status.PLAYING} />
            )} */}
            {screen === "welcome" && <Welcome />}
            {/* {screen === "home" && <Home />}
            {screen === "game" && <Game />} */}
        </>
    );
}
