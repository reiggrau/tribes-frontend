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

const url = "https://tribes-the-game-backend.onrender.com";

export default function App() {
    const screen = useSelector((state) => state.screen);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(url + "/user/id.json")
            .then((response) => response.json())
            .then((data) => {
                // console.log("/user/id.json data:", data);
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
                            <h1
                                className="storyText"
                                onClick={() => dispatch(setScreen("welcome"))}
                            >
                                Guillem presents:
                            </h1>
                        </div>
                    </div>
                </>
            )}
            {/* {(screen === "welcome" || screen === "home") && (
                <Sound url={MenuMusic} playStatus={Sound.status.PLAYING} />
            )} */}
            <Welcome />
            {/* {screen === "welcome" && <Welcome />} */}
            {/* {screen === "home" && <Home />}
            {screen === "game" && <Game />} */}
        </>
    );
}
