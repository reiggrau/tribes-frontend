import useSound from "use-sound";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import menuMusic from "../../assets/DawnOfManMenu.mp3";
import tutorialMusic from "../../assets/tribes2.mp3";

import stormAmbience from "../../assets/StormSoundEffects.mp3";

export default function Music() {
    // SET VOLUME
    const volume = 0.25; // from 0 to 1

    // Play music
    const [playMenu, { stop }] = useSound(menuMusic, { volume: volume });
    const [playTutorial] = useSound(tutorialMusic, { volume: volume });

    // Play ambience
    const [playStorm] = useSound(stormAmbience, { volume: volume });

    const music = useSelector((state) => state.music);

    useEffect(() => {
        console.log("Music.jsx useEffect. music :", music);

        stop();
        switch (music) {
            case "menu":
                console.log("playMenu()");
                playMenu();
                break;
            case "storm":
                console.log("playStorm()");
                playStorm();
                break;
            case "tutorial":
                console.log("playTutorial()");
                playTutorial();
                break;
            default:
                console.log("stop()");
        }
    }, [music]);

    return <div></div>;
}
