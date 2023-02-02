// REDUX
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setScreen, setLocation, setCharacter, setMusic } from "../../../redux/reducer.js";

import reflectionImg from "../../../assets/reflection.jpg";

export default function CharacterCreation() {
    const [characterDraft, setCharacterDraft] = useState({ first_name: "", last_name: "", image: "", tribe: "", role: "" });
    const [file, setFile] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const serverUrl = useSelector((state) => state.serverUrl);
    const user = useSelector((state) => state.user);

    const [textIndex, setTextIndex] = useState(0);
    const [textArr, setTextArr] = useState([
        0,
        "The night was cold, and you were far from home.",
        "You were fishing on a ravine when the weather changed suddenly.",
        "You took refuge in a nearby cave, where you awaited for the storm to end.",
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
        "And that's who you thought you would ever be... But the world was changing, and so would you.",
        9,
    ]);

    const fadeRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("CharacterCreation useEffect");

        dispatch(setMusic("storm"));

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
    }, []);

    function nextText() {
        // fade to black
        fadeRef.current.style.visibility = "visible";
        fadeRef.current.style.animation = "fadetoblackandback 1s none linear";

        setTimeout(() => {
            setTextIndex(textIndex + 1);
        }, 500);

        setTimeout(() => {
            fadeRef.current.style.animation = "none";
            fadeRef.current.style.visibility = "hidden";
        }, 1000);
    }

    function goBack(amount) {
        // fade to black
        fadeRef.current.style.visibility = "visible";
        fadeRef.current.style.animation = "fadetoblackandback 3s none linear";

        setTimeout(() => {
            setTextIndex(textIndex - amount);
        }, 1500);

        setTimeout(() => {
            fadeRef.current.style.animation = "none";
            fadeRef.current.style.visibility = "hidden";
        }, 3000);
    }

    function inputChange(e) {
        setCharacterDraft({ ...characterDraft, [e.target.name]: e.target.value });
        console.log(characterDraft);
    }

    function selectTribe(tribe) {
        if (tribe === "Holtmar") {
            setCharacterDraft({ ...characterDraft, tribe: tribe, strength: 6, dexterity: 4, intellect: 5 });
        } else if (tribe === "Cessites") {
            setCharacterDraft({ ...characterDraft, tribe: tribe, strength: 5, dexterity: 6, intellect: 4 });
        } else if (tribe === "Javians") {
            setCharacterDraft({ ...characterDraft, tribe: tribe, strength: 4, dexterity: 5, intellect: 6 });
        }
        nextText();
    }

    function selectRole(role) {
        if (role === "Hunter") {
            const newStrength = characterDraft.strength + 1;
            setCharacterDraft({ ...characterDraft, role: role, strength: newStrength });
        } else if (role === "Crafter") {
            const newDexterity = characterDraft.dexterity + 1;
            setCharacterDraft({ ...characterDraft, role: role, dexterity: newDexterity });
        } else if (role === "Elder") {
            const newIntellect = characterDraft.intellect + 1;
            setCharacterDraft({ ...characterDraft, role: role, intellect: newIntellect });
        }
        nextText();
    }

    function setImage(e) {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);

            // Image preview
            var reader = new FileReader();

            reader.onload = function (e) {
                setCharacterDraft({ ...characterDraft, image: e.target.result });
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    function submitForm() {
        if (formSubmitted) {
            return;
        }

        setFormSubmitted(true);

        const { first_name, last_name, tribe, role, strength, dexterity, intellect } = characterDraft;

        const formData = new FormData();

        formData.append("id", user.id);
        formData.append("file", file);
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("tribe", tribe);
        formData.append("role", role);
        formData.append("strength", strength);
        formData.append("dexterity", dexterity);
        formData.append("intellect", intellect);

        fetch(serverUrl + "/newcharacter", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    dispatch(setCharacter(data.character));

                    // Fade to black
                    fadeRef.current.style.visibility = "visible";
                    fadeRef.current.style.animation = "fadetoblack 1s none linear";

                    setTimeout(() => {
                        dispatch(setLocation("loading"));
                        dispatch(setScreen("game"));
                    }, 1000);
                } else {
                    goBack(14);
                    throw new Error("PROFILE EDIT FAILED");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="backgroundCharacterCreation">
            <div className="fadetoblack" ref={fadeRef}></div>
            <audio src="/StormSoundEffects.mp3" autoPlay></audio>

            {typeof textArr[textIndex] == "string" && (
                <div className="columnFlex">
                    <h1 className="storyText" onClick={nextText}>
                        {textArr[textIndex]}
                    </h1>
                </div>
            )}
            {textArr[textIndex] === 0 && (
                <div className="columnFlex">
                    <h1 className="storyText" onClick={nextText}>
                        11.700 years ago...
                    </h1>
                    <h4 className="storyTextStatic">(click text to continue)</h4>
                </div>
            )}
            {textArr[textIndex] === 1 && (
                <div className="columnFlex">
                    <h1 className="storyTextStatic">What was your name back then?</h1>
                    <div className="storyInputDiv">
                        <input className="storyInput" name="first_name" placeholder="(Write your name here)" value={characterDraft.first_name} onChange={inputChange}></input>
                        {characterDraft.first_name !== "" && (
                            <h4 className="storyText" onClick={nextText}>
                                (Done)
                            </h4>
                        )}
                    </div>
                </div>
            )}
            {textArr[textIndex] === 2 && (
                <div className="columnFlex">
                    <h1 className="storyTextStatic">What did they call you?</h1>
                    <div className="storyInputDiv">
                        <input className="storyInput" name="last_name" placeholder="(Write your last name)" value={characterDraft.last_name} onChange={inputChange}></input>
                        {characterDraft.last_name != "" && (
                            <h4 className="storyText" onClick={nextText}>
                                (Done)
                            </h4>
                        )}
                    </div>
                </div>
            )}
            {textArr[textIndex] === 3 && (
                <div className="columnFlex">
                    <h1 className="storyTextStatic">
                        '{characterDraft.first_name} {characterDraft.last_name}'. Is that correct?
                    </h1>
                    <h2 className="storyText" onClick={nextText}>
                        Yes
                    </h2>
                    <h2 className="storyText" onClick={() => goBack(4)}>
                        No
                    </h2>
                </div>
            )}
            {textArr[textIndex] === 4 && (
                <div className="columnFlex">
                    <h1 className="storyTextStatic">What was your tribe known for?</h1>
                    <h2 className="storyText" onClick={() => selectTribe("Holtmar")}>
                        The strength of our hunters.
                    </h2>
                    <h2 className="storyText" onClick={() => selectTribe("Cessites")}>
                        The quality of our craftmanship.
                    </h2>
                    <h2 className="storyText" onClick={() => selectTribe("Javians")}>
                        The knowledge of our elders.
                    </h2>
                </div>
            )}
            {textArr[textIndex] === 5 && (
                <div className="columnFlex">
                    <h1 className="storyTextStatic">And what was your role in the tribe?</h1>
                    <h2 className="storyText" onClick={() => selectRole("Hunter")}>
                        I was hunter and a warrior.
                    </h2>
                    <h2 className="storyText" onClick={() => selectRole("Crafter")}>
                        I made tools and traps for my tribe.
                    </h2>
                    <h2 className="storyText" onClick={() => selectRole("Elder")}>
                        I teached the children and tended the wounded.
                    </h2>
                </div>
            )}
            {textArr[textIndex] === 6 && (
                <div className="columnFlex">
                    <h1 className="storyTextStatic">
                        {characterDraft.role} from the tribe of the {characterDraft.tribe}. Is that correct?
                    </h1>
                    <h2 className="storyText" onClick={nextText}>
                        Yes
                    </h2>
                    <h2 className="storyText" onClick={() => goBack(2)}>
                        No
                    </h2>
                </div>
            )}
            {textArr[textIndex] === 7 && (
                <div className="columnFlex">
                    <img id="picture" src={characterDraft.image || reflectionImg} alt="preview" />
                    <h1 className="storyTextStatic">Who did you see in the reflection?</h1>
                    <input type="file" name="file" onChange={setImage} />
                    {file != null && (
                        <h4 className="storyText" onClick={nextText}>
                            (Done)
                        </h4>
                    )}
                </div>
            )}
            {textArr[textIndex] === 8 && (
                <div className="columnFlex">
                    <h1 className="storyTextStatic">Is this who you were back then?</h1>
                    <img id="picture" src={characterDraft.image} alt="preview" />
                    <h1 className="storyTextStatic">
                        {characterDraft.first_name} {characterDraft.last_name}
                    </h1>
                    <h1 className="storyTextStatic">
                        {characterDraft.role} of the tribe of the {characterDraft.tribe}.
                    </h1>
                    <h2 className="storyText" onClick={nextText}>
                        Yes
                    </h2>
                    <h2 className="storyText" onClick={() => goBack(11)}>
                        No
                    </h2>
                </div>
            )}
            {textArr[textIndex] === 9 && (
                <div className="columnFlex">
                    <h1 className="storyText" onClick={submitForm}>
                        This is how your story began...
                    </h1>
                </div>
            )}
        </div>
    );
}
