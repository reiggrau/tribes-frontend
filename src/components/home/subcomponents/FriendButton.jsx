import { useEffect, useState } from "react";

export default function FriendButton({ otherProfile }) {
    const [otherUserStatus, setOtherUserStatus] = useState("befriend");

    useEffect(() => {
        console.log("FriendButton useEffect(id):", otherProfile);
        fetch(`/status/${otherProfile}.json`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                // add it to the state
                // console.log("button data:", data);
                if (data.status == null) {
                    setOtherUserStatus("befriend");
                } else if (data.status == "self") {
                    setOtherUserStatus("hidden");
                } else if (data.status == false) {
                    data.receiver_id == otherProfile ? setOtherUserStatus("cancel") : setOtherUserStatus("accept");
                } else if (data.status == true) {
                    setOtherUserStatus("unfriend");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [otherProfile]);

    function sendFriendRequest() {
        console.log("sendFriendRequest. id:", otherProfile);

        fetch(`/befriend/${otherProfile}.json`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                // console.log("sendFriendRequest data:", data);

                if (data.status == false) {
                    setOtherUserStatus("cancel");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function cancelFriendRequest() {
        console.log("cancelFriendRequest. id:", otherProfile);

        fetch(`/cancel/${otherProfile}.json`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                // console.log("cancelFriendRequest data:", data);

                if (data.success == true) {
                    setOtherUserStatus("befriend");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function acceptFriendRequest() {
        console.log("acceptFriendRequest. id:", otherProfile);

        fetch(`/accept/${otherProfile}.json`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                // console.log("acceptFriendRequest data:", data);

                if (data.success == true) {
                    setOtherUserStatus("unfriend");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            {otherUserStatus == "befriend" && <button onClick={sendFriendRequest}>Befriend</button>}
            {otherUserStatus == "cancel" && <button onClick={cancelFriendRequest}>Cancel Request</button>}
            {otherUserStatus == "accept" && (
                <div className="centeredFlex">
                    <button onClick={acceptFriendRequest}>Accept Request</button>
                    <button onClick={cancelFriendRequest}>Cancel Request</button>
                </div>
            )}
            {otherUserStatus == "unfriend" && <button onClick={cancelFriendRequest}>Unfriend</button>}
        </>
    );
}
