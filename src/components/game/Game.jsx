import "./game.css";

import CharacterCreation from "./subcomponents/CharacterCreation.jsx";
import Inventory from "./subcomponents/Inventory.jsx";
import Loading from "./subcomponents/Loading.jsx";
import Tutorial from "./subcomponents/Tutorial.jsx";
// import UI from "./subcomponents/UI.jsx";

// External Components
import Chat from "../home/subcomponents/Chat.jsx";

// REDUX
// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Game() {
    const location = useSelector((state) => state.location);

    // const [uui, setUi] = useState[false];

    return (
        <>
            {location === "loading" && <Loading />}
            {location === "character_creation" && <CharacterCreation />}
            {location === "tutorial" && <Tutorial />}

            {location !== "loading" && location !== "character_creation" && (
                <>
                    {/* <UI /> */}
                    <footer>
                        <Chat />
                        <Inventory />
                    </footer>
                </>
            )}
        </>
    );
}
