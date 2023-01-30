// REDUX
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setScreen, setLocation, setCharacter } from "../../../redux/reducer.js";

import Sound from "react-sound";
// import Music2 from "/tribes2.mp3";

export default function UI() {
    // const [background, setBackground] = useState();

    const [textIndex, setTextIndex] = useState(0);
    const [textArr, setTextArr] = useState([
        0,
        "The night was cold, and you were far from home.",
        "You were fishing on a ravine when the weather changed suddenly.",
        "You couldn't afford to get wet, so you took refuge in a nearby cave.",
        "There, you awaited for the storm to end, but the day ended first...",
        "This is how your story began.",
        1,
        `Ah, yes, a name of a time long gone...`,
        "But the ones that knew you called you something else.",
        2,
        3,
        "You started a fire and, while looking at the flames, thought about your tribe.",
        4,
        5,
        6,
        "There was a puddle of perfectly still water in the cave, and you approached it.",
        7,
        8,
        "And that's who you thought you would ever be...",
        "But unbeknown to you, the world was changing. And so would you.",
        9,
    ]);

    const character = useSelector((state) => state.character);

    const fadeRef = useRef(null);
    const backgroundRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {}, []);

    return (
        <div className="UI">
            <div id="playerUI">
                <img id="imageUI" src={character.image} />
                {/* <div id="healthbarDiv">
                    <div className="healthbar"></div>
                </div> */}
            </div>
        </div>
    );
}
