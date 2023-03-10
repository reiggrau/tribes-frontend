import { io } from "socket.io-client";

import { addMessage, friendOnline, friendOffline, newRequestUpdate } from "./redux/reducer.js"; // Imports the redux functions so that we can change the redux state with socket.io

import { serverUrl } from "./redux/reducer.js";

console.log("socket.js serverUrl :", serverUrl);

// export let socket;
export let socket;

// Redux

export const initSocket = (store) => {
    if (!socket) {
        // socket = io.connect();
        // socket = io();
        socket = io(serverUrl, {
            withCredentials: true,
            extraHeaders: {
                "my-custom-header": "abcd",
            },
        });

        socket.on("newMessage", (data) => {
            console.log("socket.js newMessage data:", data);

            store.dispatch(addMessage(data));
        });

        socket.on("friendOnline", (data) => {
            console.log("socket.js friendOnline data:", data);

            store.dispatch(friendOnline(data));
        });

        socket.on("friendOffline", (data) => {
            console.log("socket.js friendOnline data:", data);

            store.dispatch(friendOffline(data));
        });

        socket.on("newRequestUpdate", (data) => {
            console.log("socket.js newRequestUpdate data:", data);

            store.dispatch(newRequestUpdate(data));
        });
    }
};
