// import { useEffect, useState } from "react";
import { useEffect } from "react";
// import { Link } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getFriends, acceptFriend, rejectFriend, newRequestUpdate } from "../../../redux/reducer.js";

export default function Friends({ toggleFriendsList, toggleOtherProfile }) {
    // const [pendingFriends, setPendingFriends] = useState([]);
    // const [acceptedFriends, setAcceptedFriends] = useState([]);

    //Redux
    const serverUrl = useSelector((state) => state.serverUrl);
    const user = useSelector((state) => state.user);

    // useSelector is used to retrieve updated data from the global redux store
    const pendingFriends = useSelector((state) => {
        return state.friends.filter((user) => user.status === false);
    });

    const acceptedFriends = useSelector((state) => {
        return state.friends.filter((user) => user.status === true);
    });

    const dispatch = useDispatch(); // useDispatch is used to dispatch action from component to redux store

    useEffect(() => {
        console.log("Friends useEffect");

        dispatch(newRequestUpdate(false)); // We turn of the notification dot by changing the global state

        // Update friends state with the data from the database
        fetch(serverUrl + "/friendships.json")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                data.length && dispatch(getFriends(data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function acceptFriendRequest(id) {
        console.log("acceptFriendRequest. id:", id);

        fetch(serverUrl + `/accept/${user.id}/${id}.json`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                // console.log("acceptFriendRequest data:", data);
                data.success && dispatch(acceptFriend(id)); // If success, update state
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function cancelFriendRequest(id) {
        console.log("cancelFriendRequest. id:", id);

        fetch(serverUrl + `/cancel/${user.id}/${id}.json`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                // console.log("acceptFriendRequest data:", data);
                data.success && dispatch(rejectFriend(id)); // If success, update state
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="overlay">
            <div className="window" id="friendsList">
                <div>
                    <h3 onClick={toggleFriendsList} id="xBtn" className="button">
                        X
                    </h3>
                </div>
                <h2>Friends</h2>
                <div className="friendList">
                    {acceptedFriends.map((user) => (
                        <div key={user.id} className="logMenu">
                            <img src={user.picture || "/default_user.jpg"} id="headerUserPicture" alt="user" />
                            <h3 className="button" onClick={() => toggleOtherProfile(user.id)}>
                                {user.username}
                            </h3>
                        </div>
                    ))}
                </div>
                {pendingFriends.length !== 0 && <h2>Friendship Requests</h2>}
                <div className="friendList">
                    {pendingFriends.map((user) => (
                        <div key={user.id} className="logMenu">
                            <img src={user.picture || "/default_user.jpg"} id="headerUserPicture" alt="user" />
                            <h3 className="button" onClick={() => toggleOtherProfile(user.id)}>
                                {user.username}
                            </h3>
                            {!user.status && (
                                <>
                                    <button
                                        onClick={() => {
                                            acceptFriendRequest(user.id);
                                        }}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => {
                                            cancelFriendRequest(user.id);
                                        }}
                                    >
                                        Reject
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
