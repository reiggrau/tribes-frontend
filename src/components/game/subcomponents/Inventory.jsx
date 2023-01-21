import { useEffect, useState } from "react";
// import { socket } from "../../../socket.js";

// Redux
import { useSelector } from "react-redux";
// import { setChatId, resetMessages, getMessages } from "../../../redux/reducer.js";

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
                                    <img className="healthbarIcon" src="/health.png" alt="" />
                                    <div className="healthbar">
                                        <div className="bar" style={{ width: character.health * 100 + "%" }}></div>
                                    </div>
                                </div>
                                <div className="healthbarDiv">
                                    <img className="healthbarIcon" src="/stamina.png" alt="" />
                                    <div className="healthbar">
                                        <div className="bar" style={{ width: character.stamina * 100 + "%" }}></div>
                                    </div>
                                </div>
                                <div className="healthbarDiv">
                                    <img className="healthbarIcon" src="/warmth.png" alt="" />
                                    <div className="healthbar">
                                        <div className="bar" style={{ width: character.warmth * 100 + "%" }}></div>
                                    </div>
                                </div>
                                <div className="healthbarDiv">
                                    <img className="healthbarIcon" src="/thirst.png" alt="" />
                                    <div className="healthbar">
                                        <div className="bar" style={{ width: character.thirst * 100 + "%" }}></div>
                                    </div>
                                </div>
                                <div className="healthbarDiv">
                                    <img className="healthbarIcon" src="/hunger.png" alt="" />
                                    <div className="healthbar">
                                        <div className="bar" style={{ width: character.hunger * 100 + "%" }}></div>
                                    </div>
                                </div>
                                <div className="healthbarDiv">
                                    <img className="healthbarIcon" src="/morale.png" alt="" />
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
                                        <img className="itemImg" src="/handaxe.png" alt="" />
                                    </div>
                                    <div className="inventorySlot">
                                        <img className="itemImg" src="/fishing_spear.png" alt="" />
                                    </div>
                                    <div className="inventorySlot">
                                        <img className="itemImg" src="/leather_clothes.png" alt="" />
                                    </div>
                                    <div className="inventorySlot">
                                        <img className="itemImg" src="/skin_pouch.png" alt="" />
                                    </div>
                                </div>
                                <div className="inventorySlot">
                                    <img className="itemImg" src="/raw_fish.png" alt="" />
                                </div>
                                <div className="inventorySlot">
                                    <img className="itemImg" src="/cooked_fish.png" alt="" />
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
