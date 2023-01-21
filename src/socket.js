import { io } from "socket.io-client";

import { addMessage, friendOnline, friendOffline, newRequestUpdate } from "./redux/reducer.js";

export let socket;

// Redux

export const initSocket = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("newMessage", (data) => {
            console.log("newMessage data:", data);

            store.dispatch(addMessage(data));
        });

        socket.on("friendOnline", (data) => {
            console.log("friendOnline:", data);

            store.dispatch(friendOnline(data));
        });

        socket.on("friendOffline", (data) => {
            console.log("friendOnline:", data);

            store.dispatch(friendOffline(data));
        });

        socket.on("newRequestUpdate", (data) => {
            console.log("newRequestUpdate:", data);

            store.dispatch(newRequestUpdate(data));
        });
    }
};
