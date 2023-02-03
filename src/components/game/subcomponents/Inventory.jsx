import { useEffect, useState } from "react";
// import { socket } from "../../../socket.js";

// Redux
import { useSelector } from "react-redux";
// import { setChatId, resetMessages, getMessages } from "../../../redux/reducer.js";

import health_png from "../../../assets/health.png";
import stamina_png from "../../../assets/stamina.png";
import warmth_png from "../../../assets/warmth.png";
import thirst_png from "../../../assets/thirst.png";
import hunger_png from "../../../assets/hunger.png";
import morale_png from "../../../assets/morale.png";

import handaxe_png from "../../../assets/handaxe.png";
import fishing_spear_png from "../../../assets/fishing_spear.png";
import leather_clothes_png from "../../../assets/leather_clothes.png";
import skin_pouch_png from "../../../assets/skin_pouch.png";

import raw_fish_png from "../../../assets/raw_fish.png";
import cooked_fish_png from "../../../assets/cooked_fish.png";

export default function Inventory() {
    const character = useSelector((state) => state.character);

    const [inventory, setInventory] = useState(false);

    // const acceptedFriends = useSelector((state) => {
    //     return state.friends.filter((user) => user.status === true);
    // });

    // const dispatch = useDispatch();

    useEffect(() => {
        // console.log("Chat useEffect(). chatId:", chatId);
    }, []);

    function toggleInventory() {
        // console.log("toggleChat()");

        setInventory(!inventory);
    }

    return (
        <div className="inventoryDiv">
            {!inventory && (
                <div className="logMenu">
                    <h3 className="button" onClick={toggleInventory}>
                        Items
                    </h3>
                </div>
            )}
            {inventory && (
                <div className="chatWindow">
                    <div>
                        <h3 onClick={toggleInventory} id="xBtn" className="button">
                            X
                        </h3>
                    </div>
                    <div className="flexDiv">
                        <div>
                            <img className="parchmentImage" src={character.image} alt="" />

                            <div id="userInfo">
                                <h4>
                                    {character.first_name} {character.last_name}
                                </h4>
                                <p>Stats:</p>
                                <div className="healthbarDiv">
                                    <img className="healthbarIcon" src={health_png} alt="" />
                                    <div className="healthbar">
                                        <div className="bar" style={{ width: character.health * 100 + "%" }}></div>
                                    </div>
                                </div>
                                <div className="healthbarDiv">
                                    <img className="healthbarIcon" src={stamina_png} alt="" />
                                    <div className="healthbar">
                                        <div className="bar" style={{ width: character.stamina * 100 + "%" }}></div>
                                    </div>
                                </div>
                                <div className="healthbarDiv">
                                    <img className="healthbarIcon" src={warmth_png} alt="" />
                                    <div className="healthbar">
                                        <div className="bar" style={{ width: character.warmth * 100 + "%" }}></div>
                                    </div>
                                </div>
                                <div className="healthbarDiv">
                                    <img className="healthbarIcon" src={thirst_png} alt="" />
                                    <div className="healthbar">
                                        <div className="bar" style={{ width: character.thirst * 100 + "%" }}></div>
                                    </div>
                                </div>
                                <div className="healthbarDiv">
                                    <img className="healthbarIcon" src={hunger_png} alt="" />
                                    <div className="healthbar">
                                        <div className="bar" style={{ width: character.hunger * 100 + "%" }}></div>
                                    </div>
                                </div>
                                <div className="healthbarDiv">
                                    <img className="healthbarIcon" src={morale_png} alt="" />
                                    <div className="healthbar">
                                        <div className="bar" style={{ width: character.morale * 100 + "%" }}></div>
                                    </div>
                                </div>

                                <p>Strength: {character.strength}</p>
                                <p>Skill: {character.dexterity}</p>
                                <p>Knowledge: {character.intellect}</p>
                            </div>
                        </div>
                        <div className="inventory">
                            <h3>Inventory</h3>
                            <div id="inventory">
                                <div className="gearDiv">
                                    <div className="inventorySlot">
                                        <img className="itemImg" src={handaxe_png} alt="" />
                                    </div>
                                    <div className="inventorySlot">
                                        <img className="itemImg" src={fishing_spear_png} alt="" />
                                    </div>
                                    <div className="inventorySlot">
                                        <img className="itemImg" src={leather_clothes_png} alt="" />
                                    </div>
                                    <div className="inventorySlot">
                                        <img className="itemImg" src={skin_pouch_png} alt="" />
                                    </div>
                                </div>
                                <div className="inventorySlot">
                                    <img className="itemImg" src={raw_fish_png} alt="" />
                                </div>
                                <div className="inventorySlot">
                                    <img className="itemImg" src={cooked_fish_png} alt="" />
                                </div>
                                <div className="inventorySlot"></div>
                                <div className="inventorySlot"></div>
                                <div className="inventorySlot"></div>
                                <div className="inventorySlot"></div>
                                <div className="inventorySlot"></div>
                                <div className="inventorySlot"></div>
                                <div className="inventorySlot"></div>
                                <div className="inventorySlot"></div>
                                <div className="inventorySlot"></div>
                                <div className="inventorySlot"></div>
                                <div className="inventorySlot"></div>
                                <div className="inventorySlot"></div>
                                <div className="inventorySlot"></div>
                                <div className="inventorySlot"></div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
