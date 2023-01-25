// REDUX
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMusic } from "../../../redux/reducer.js";

// Background images
import caveBackground from "../../../assets/tutorial_cave.png";
import ravineBackground from "../../../assets/tutorial_ravine.jpeg";
import forestBackground from "../../../assets/tutorial_forest.jpeg";

export default function Tutorial() {
    const character = useSelector((state) => state.character);

    const [sceneIndex, setSceneIndex] = useState(0);

    const dispatch = useDispatch();

    // const [music, setMusic] = useState("/tribes2.mp3");
    const [backgroundImage, setBackgroundImage] = useState(caveBackground);

    const fadeRef = useRef(null);
    // const backgroundRef = useRef(null);
    const parchmentRef = useRef(null);
    const textRef = useRef(null);

    // const dispatch = useDispatch();

    useEffect(() => {
        console.log("Tutorial.jsx useEffect");

        dispatch(setMusic("tutorial"));

        fadeRef.current.style.backgroundColor = "black";
        fadeRef.current.style.visibility = "visible";
        setTimeout(() => {
            // Fade to view
            fadeRef.current.style.backgroundColor = "none";
            fadeRef.current.style.animation = "fadetoview 1s none linear";

            // fadeRef.current.style.animation = "fadetoview 1s none linear";

            setTimeout(() => {
                fadeRef.current.style.visibility = "hidden";
            }, 1000);
        }, 2000);

        setTimeout(() => {
            parchmentRef.current.style.opacity = "1";
            // setUi(true);
        }, 5000);
    }, []);

    function nextScene(n) {
        // fade to black
        textRef.current.style.opacity = "0";

        setTimeout(() => {
            setSceneIndex(sceneIndex + n);
        }, 500);

        setTimeout(() => {
            textRef.current.style.opacity = "1";
        }, 1000);
    }

    function nextBackground(newBackground) {
        parchmentRef.current.style.opacity = "0";
        setBackgroundImage(newBackground);

        setTimeout(() => {
            parchmentRef.current.style.opacity = "1";
        }, 3000);
    }

    const scene = [
        {
            image: character.image,
            text: `The next day, you woke up as the first sunrays breached through the cave's entrance.`,
            text2: `The storm was gone, and it was time to go back to your village.`,
            next: `Continue`,
        },
        {
            image: character.image,
            text: `You still had some cooked fish left from last night, and it could serve as a breakfast before your journey.`,
            text2: `(You can check what you are carrying by clicking on 'Inventory')`,
            next: `Continue`,
        },
        {
            image: character.image,
            text: `The journey back was long and you could begin straight away without wasting time.`,
            text2: `Alternatively, you could take a quick look at the cave as it was well lit by the sun.`,
            option1: {
                text: "Leave the cave.",
                func: () => {
                    nextBackground(ravineBackground);
                    nextScene(2);
                },
            },
            option2: {
                text: "Explore the cave.",
                func: () => nextScene(1),
            },
        },
        {
            image: character.image,
            text: `As you explored the cave, you noticed that some of the rocks scattered in the back were actually flint stones.`,
            text2: `You grabbed the best looking shard, as it could be useful to make new tools later.`,
            option1: {
                text: "Leave the cave.",
                func: () => {
                    nextBackground(ravineBackground);
                    nextScene(1);
                },
            },
        },
        {
            image: character.image,
            text: `You left the cave and headded towards your village. You already knew the area so you didn't have any trouble orienting yourself by looking around a little bit.`,
            next: `Continue`,
        },
        {
            image: character.image,
            text: `Back then there were no maps, but the peoples of that age could get a rough idea of their ubication based on their surroundings and the landmarks in the horizon.`,
            text2: `You had to reach a high point first, though.`,
            option1: {
                text: "Climb to a high point.",
                func: () => {
                    nextScene(3);
                },
            },
            option2: {
                text: "(knowledge) Try to orient yourself using the sun.",
                func: () => {
                    if (character.intellect > 5) {
                        nextScene(1);
                    } else {
                        nextScene(2);
                    }
                },
            },
        },
        {
            image: character.image,
            text: `With your knowledge of the path of the sun that time of the year and an estimation of the amount of time passed since dawn you oriented youself without needing to climb to a high point.`,
            option1: {
                text: "'The knowledge of my ancestors guide my path.'",
                func: () => {
                    nextScene(3);
                },
            },
        },
        {
            image: character.image,
            text: `Unfortunately you couldn't figure out with certainty which way to go using only the sun...`,
            option1: {
                text: "'I better not risk it and look for a high point.'",
                func: () => {
                    nextScene(1);
                },
            },
        },
        {
            image: character.image,
            text: `After climbing some rocks you managed to see above the treeline and recognise the mountains in the horizon.`,
            text2: `Then you went back to the small valley and headed to the right direction.`,
            next: `Continue`,
        },
        {
            image: character.image,
            text: `After walking for some time you finally reached the forest path that leaded to your village.`,
            option1: {
                text: "Follow the path.",
                func: () => {
                    nextBackground(forestBackground);
                    nextScene(1);
                },
            },
        },
        {
            image: character.image,
            text: `This is the end of the demo. I hope you enjoyed the game so far!`,
            next: `Thank you!`,
        },
    ];

    return (
        <div className="backgroundQuest" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="fadetoblack" ref={fadeRef}></div>
            <div className="parchment" ref={parchmentRef}>
                <div className="storyDiv" ref={textRef}>
                    <div className="parchmentTop">
                        <img className="parchmentImage" src={scene[sceneIndex].image} alt="" />
                        <div>
                            <h2 className="parchmentText">{scene[sceneIndex].text}</h2>
                            {scene[sceneIndex].hasOwnProperty("text2") && <h2 className="parchmentText">{scene[sceneIndex].text2}</h2>}
                        </div>
                    </div>
                    {scene[sceneIndex].hasOwnProperty("next") ? (
                        <div className="parchmentBottom">
                            <div className="optionDiv"></div>
                            <h2 className="parchmentTextOption" onClick={() => nextScene(1)}>
                                {scene[sceneIndex].next}
                            </h2>
                        </div>
                    ) : (
                        <div className="parchmentBottom">
                            <div className="optionDiv">
                                <h2 className="parchmentTextOption" onClick={scene[sceneIndex].option1.func}>
                                    {scene[sceneIndex].option1.text}
                                </h2>
                                {scene[sceneIndex].hasOwnProperty("option2") && (
                                    <h2 className="parchmentTextOption" onClick={scene[sceneIndex].option2.func}>
                                        {scene[sceneIndex].option2.text}
                                    </h2>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
