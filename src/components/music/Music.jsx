import useSound from "use-sound";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import menuMusic from "../../assets/DawnOfManMenu.mp3";

export default function Music() {
    // let soundUrl = "../../../src/assets/DawnOfManMenu.mp3";

    const music = useSelector((state) => state.music);
    const [play, { stop }] = useSound(menuMusic);

    useEffect(() => {
        console.log("Music.jsx useEffect. music :", music);

        stop();
        switch (music) {
            case "menu":
                console.log("play()");
                play();
                break;
            default:
                console.log("stop()");
        }
    }, [play, stop, music]);

    return <div></div>;
}
