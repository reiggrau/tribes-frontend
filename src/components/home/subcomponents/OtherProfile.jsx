import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import FriendButton from "./FriendButton.jsx";

export default function OtherProfile({ otherProfile, setOtherProfile }) {
    const [otherUser, setOtherUser] = useState({});

    const serverUrl = useSelector((state) => state.serverUrl);

    useEffect(() => {
        console.log("otherUser useEffect otherProfile:", otherProfile);

        fetch(serverUrl + `/user/${otherProfile}.json`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const userData = data[0][0];
                console.log("OtherProfile userData:", userData);

                setOtherUser(userData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [otherProfile]);

    return (
        <div className="overlay">
            <div className="window">
                <div id="profileDiv">
                    <div>
                        <img id="picture" src={otherUser.picture || "/default_user.jpg"} alt="" />

                        <div id="userInfo">
                            <h2>{otherUser.username}</h2>
                            {/* <h4>{otherUser.email}</h4> */}
                            <p>Member since:</p>
                            <h4>{otherUser.created_at}</h4>
                        </div>
                    </div>
                    <div id="bioDiv">
                        <div>
                            <h3 onClick={() => setOtherProfile(0)} id="xBtn" className="button">
                                X
                            </h3>
                        </div>
                        <h3>Bio</h3>
                        <p id="bioText">{otherUser.bio}</p>
                        <div className="centeredFlex">
                            <FriendButton otherProfile={otherProfile} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
