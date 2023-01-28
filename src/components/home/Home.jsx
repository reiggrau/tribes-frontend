import "./home.css";

import Canvas from "./subcomponents/Canvas.jsx";
import Chat from "./subcomponents/Chat.jsx";
import Friends from "./subcomponents/Friends.jsx";
import OtherProfile from "./subcomponents/OtherProfile.jsx";
import Profile from "./subcomponents/Profile.jsx";
import SearchUser from "./subcomponents/SearchUser.jsx";
import SelectionScreen from "./subcomponents/SelectionScreen.jsx";

import default_user from "../../assets/default_user.jpg";
import logout_icon from "../../assets/logout.png";

// REDUX
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser, getFriends, setScreen } from "../../redux/reducer.js";

import { socket } from "../../socket.js";

export default function Home() {
    const [profileMenu, setProfileMenu] = useState(false); // is the profile window open? (default 'false')
    const [otherProfile, setOtherProfile] = useState(0);
    const [friendsList, setFriendsList] = useState(false);
    const [canvas, setCanvas] = useState(false);

    const serverUrl = useSelector((state) => state.serverUrl);
    const user = useSelector((state) => state.user);
    const newRequest = useSelector((state) => state.newRequest);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Home.jsx useEffect");

        setCanvas(true);

        fetch("/user/0.json")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                // Handle user data
                const userData = data[0][0];
                // console.log("Home userData (data[0][0]):", userData);

                userData && dispatch(loginUser(userData)); // fetch user info from server and send it to redux global store

                // Handle friends data
                const friendsData = data[1];
                // console.log("Home friendsData (data[1]:", friendsData);

                friendsData.length && dispatch(getFriends(data[1]));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function logOut() {
        console.log("logOut()");
        dispatch(logoutUser());
        dispatch(setScreen("welcome"));

        fetch(serverUrl + "/logout");
        // history.pushState({}, "", `/`);
        socket.emit("logout");
    }

    function toggleProfile() {
        setProfileMenu(!profileMenu); // Set it to the opposite of the current value
    }

    function toggleOtherProfile(id) {
        setFriendsList(false);

        setOtherProfile(id);
    }

    function toggleFriendsList() {
        setFriendsList(!friendsList);
    }

    return (
        <>
            <div id="Home">
                <div className="backgroundHome"></div>
                {canvas && <Canvas />}
                <header>
                    <div className="logMenu">
                        <img src={user.picture || default_user} id="headerUserPicture" alt="user" onClick={toggleProfile} />
                        <h3 className="button" onClick={toggleProfile}>
                            {user.username}
                        </h3>
                    </div>
                    <SearchUser setOtherProfile={setOtherProfile} />
                    <div>
                        <h1 id="miniLogo">TRIBES</h1>
                    </div>
                    <div className="logMenu">
                        <h3 className="button" onClick={toggleFriendsList}>
                            Friends {newRequest && <span className="notificationDot">*</span>}
                        </h3>
                        <h3 className="button" onClick={logOut}>
                            Log out
                        </h3>
                        <img src={logout_icon} id="headerIcon" alt="exit" onClick={logOut} />
                    </div>
                </header>
                <div>
                    <SelectionScreen />
                </div>
                <footer>
                    <Chat />
                </footer>
                {profileMenu && <Profile user={user} toggleProfile={toggleProfile} />}
                {otherProfile !== 0 && <OtherProfile otherProfile={otherProfile} setOtherProfile={setOtherProfile} />}
                {friendsList && <Friends toggleFriendsList={toggleFriendsList} toggleOtherProfile={toggleOtherProfile} />}
            </div>
        </>
    );
}
