import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setScreen, setLocation, setCharacter } from "../../../redux/reducer.js";

import default_user from "../../../assets/default_user.jpg";

export default function SelectionScreen() {
    const [charactersArr, setCharactersArr] = useState([]);

    const serverUrl = useSelector((state) => state.serverUrl);

    const fadeRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("SelectionScreen useEffect");

        fetch(serverUrl + "/characters.json")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setCharactersArr(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function launchGame(characterId) {
        console.log("launchGame(character):", characterId);

        if (characterId) {
            const index = charactersArr.map((obj) => obj.id).indexOf(characterId);
            dispatch(setCharacter(charactersArr[index]));
        }

        // Fade to black
        fadeRef.current.style.visibility = "visible";
        fadeRef.current.style.animation = "fadetoblack 1s none linear";

        setTimeout(() => {
            dispatch(setLocation("loading"));
            dispatch(setScreen("game"));
        }, 1000);
    }

    return (
        <div className="selectionScreen">
            <div className="fadetoblack" ref={fadeRef}></div>
            <div className="cardsDiv">
                <h1>Select your character</h1>
                <div className="cardsMenu">
                    {charactersArr.map((character) => (
                        <div key={character.id} className="card">
                            <div>
                                <img id="picture" src={character.image || default_user} alt="preview" />

                                <div id="userInfo">
                                    <h2>
                                        {character.first_name} {character.last_name}
                                    </h2>
                                    <h4>
                                        {character.role} at tribe '{character.tribe}'
                                    </h4>
                                    <p>Location: {character.location}</p>
                                    <div className="centeredFlex">
                                        <button onClick={() => launchGame(character.id)}>Select Character</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="card">
                        <div>
                            <img id="picture" src={default_user} alt="preview" />

                            <div id="userInfo">
                                <h2>New Game</h2>
                                <p>Make a new character.</p>
                                <div className="centeredFlex">
                                    <button onClick={() => launchGame(null)}>New Game</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
