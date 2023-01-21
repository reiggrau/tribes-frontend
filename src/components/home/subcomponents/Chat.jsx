import { useEffect, useState } from "react";
import { socket } from "../../../socket.js";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setChatId, resetMessages, getMessages } from "../../../redux/reducer.js";

function Chat() {
    const [chat, setChat] = useState(false);
    const [text, setText] = useState("");

    const userId = useSelector((state) => state.user.id);
    const chatId = useSelector((state) => state.chatId);
    const messages = useSelector((state) => state.messages);

    const acceptedFriends = useSelector((state) => {
        return state.friends.filter((user) => user.status === true);
    });

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("Chat useEffect(). chatId:", chatId);
        dispatch(resetMessages());

        fetch(`/messages/${chatId}.json`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                data.length && dispatch(getMessages(data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [chatId]);

    function toggleChat() {
        // console.log("toggleChat()");

        setChat(!chat);
    }

    function inputChange(e) {
        console.log("inputChange()");
        setText(e.target.value);
    }

    function sendMessage() {
        console.log("sendMessage()");

        if (text.trim() !== "") {
            socket.emit("sendMessage", {
                chatId: chatId,
                text: text.trim(),
            }); // jump to socket.js
            setText("");
        }
    }

    function filterMessage(message) {
        // console.log("filterMessage() userId:", userId, "chatId:", chatId);
        // console.log("filterMessage() message:", message);

        const isGlobal = message.receiver_id == 0 && chatId == 0;
        const isTargetToMine = message.sender_id == chatId && message.receiver_id == userId;
        const isMineToTarget = message.sender_id == userId && message.receiver_id == chatId;

        if (isGlobal || isTargetToMine || isMineToTarget) {
            return (
                <div key={message.id} className="chatMessage">
                    <img id="headerUserPicture" src={message.picture || "/default_user.jpg"} alt="" />
                    <div>
                        <h4>
                            {message.username} <span className="date"> {message.created_at}</span>
                        </h4>
                        <p className="chatText">{message.text}</p>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="chatDiv">
            {!chat && (
                <div className="logMenu">
                    <h3 className="button" onClick={toggleChat}>
                        Messages
                    </h3>
                </div>
            )}
            {chat && (
                <div className="chatWindow">
                    <div>
                        <h3 onClick={toggleChat} id="xBtn" className="button">
                            X
                        </h3>
                    </div>
                    <div className="flexDiv">
                        <div>
                            <h3>Chat</h3>
                            <div id="chatFeed">{messages.map((message) => filterMessage(message))}</div>
                            <div>
                                <textarea id="chatTextarea" cols="40" rows="2" onChange={inputChange} value={text}></textarea>
                                <button onClick={sendMessage}>Send</button>
                            </div>
                        </div>
                        <div className="chatMenu">
                            <div>
                                <h4
                                    className="button"
                                    onClick={() => {
                                        dispatch(setChatId(0));
                                    }}
                                >
                                    Global Chat
                                </h4>
                            </div>
                            {acceptedFriends.map((user) => (
                                <div key={user.id}>
                                    <h4
                                        className="button"
                                        onClick={() => {
                                            dispatch(setChatId(user.id));
                                        }}
                                    >
                                        {user.username}
                                        {user.online && <span className="onlineDot"> ●</span>}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chat;
