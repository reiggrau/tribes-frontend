// REDUX
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLocation, setMusic } from "../../../redux/reducer.js";

export default function Loading() {
    const [loading, setLoading] = useState(true);
    const character = useSelector((state) => state.character);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Loading.jsx useEffect");

        dispatch(setMusic("none"));

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    function nextLocation() {
        if (character.id) {
            dispatch(setLocation(character.location));
        } else {
            dispatch(setLocation("character_creation"));
        }
    }

    return (
        <>
            <div className="loadingBackground">
                <div>
                    <div className="fire">
                        <div className="flames">
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                        </div>
                        <div className="logs"></div>
                    </div>
                    {loading && (
                        <h1 id="loadingTxt">
                            <span>
                                L O A D I N G{" "}
                                <span id="loadingDot1" className="loadingDot">
                                    .{" "}
                                </span>
                                <span id="loadingDot2" className="loadingDot">
                                    .{" "}
                                </span>
                                <span id="loadingDot3" className="loadingDot">
                                    .
                                </span>
                            </span>
                        </h1>
                    )}
                    {!loading && (
                        <h1 id="loadingTxt" className="storyText" onClick={nextLocation}>
                            <span>C O N T I N U E</span>
                        </h1>
                    )}
                </div>
            </div>
        </>
    );
}
