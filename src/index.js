import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

// REDUX
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/reducer.js";

// socket.io
import { initSocket } from "./socket.js";

// Components
import { App } from "./App";

// redux store
const store = createStore(rootReducer); // Creates a Redux store that holds the complete state tree of the app.

initSocket(store); // Executes the initSocket function from socket.js that contains all socket.io actions, and passes the Redux store as an argument

// react root
const root = ReactDOM.createRoot(document.getElementById("root")); // createRoot lets you create a root to display React components inside a browser DOM node ("#root").

// MAIN
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals();
