import "./App.css";

// Components
import Welcome from "./components/Welcome.jsx";
// import Home from "./components/Home/Home.jsx";
// import Game from "./components/Game/Game.jsx";

// import Sound from "react-sound";
// import MenuMusic from "../src/assets/DawnOfManMenu.mp3";

import { useSelector, useDispatch } from "react-redux";
import { setScreen } from "./redux/reducer.js";

export default function App() {
    const screen = useSelector((state) => state.screen);

    const dispatch = useDispatch();

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
            {screen === "welcome" && <Welcome />}
            {/* {screen === "home" && <Home />}
            {screen === "game" && <Game />} */}
        </>
    );
}
