import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

// REDUX
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/reducer.js";

// socket.io
// import { initSocket } from "./socket.js";

// Components
import App from "./App";

// root
const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));

// initSocket(store);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals();
