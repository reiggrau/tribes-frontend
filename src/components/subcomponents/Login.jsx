import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { loginUser, logoutUser, setScreen } from "../../redux/reducer.js";

// Variables
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function Login(props) {
    const { changeMenu } = props;

    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const user = useSelector((state) => state.user);
    const serverUrl = useSelector((state) => state.serverUrl);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Login.jsx useEffect");
    }, []);

    function inputChange(e) {
        // console.log("inputChange()");
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function submitForm(e) {
        console.log("submitForm()");

        e.preventDefault();

        if (!form.email || !form.password) {
            setMessage("Missing fields!");
        } else if (!form.email.match(emailRegex)) {
            this.setState({ message: "Invalid input format!" });
        } else {
            console.log("fetch " + serverUrl + "/login form.email", form.email);

            fetch(serverUrl + "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("/login data:", data);
                    if (data.success) {
                        // Handle user data
                        const userData = data.user;

                        userData && dispatch(loginUser(userData)); // fetch user info from server and send it to redux global store
                    } else {
                        setMessage(data.message);
                        throw new Error("LOG IN FAILED");
                    }
                })
                .catch((error) => {
                    console.log("submitForm() error :", error);
                });
        }
    }

    function logOut() {
        console.log("logOut()");

        setForm({ email: "", password: "" });
        dispatch(logoutUser());

        fetch(serverUrl + "/logout");
    }

    return (
        <>
            {!user.id && (
                <div className="window">
                    <h2>Log in</h2>
                    <p>
                        Not a member?:{" "}
                        <span className="link" onClick={() => changeMenu("signup")}>
                            Sign up
                        </span>
                    </p>
                    <p className="message">{message}</p>
                    <form>
                        <input type="email" name="email" placeholder="email" value={form.email} onChange={inputChange} />
                        <input type="password" name="password" placeholder="password" value={form.password} onChange={inputChange} />
                        <button onClick={submitForm}>Log in</button>
                    </form>
                    <p className="link" onClick={() => changeMenu("password")}>
                        I forgot my password
                    </p>
                </div>
            )}
            {user.id && (
                <div className="window">
                    <div className="centeredFlex">
                        <div className="logMenu">
                            <img src={user.picture || "../../assets/default_user.jpg"} id="loginUserPicture" alt="user" />
                            <h2>Welcome back,</h2>
                            <h1>{user.username}</h1>
                        </div>
                    </div>
                    <div id="startButton" onClick={() => dispatch(setScreen("home"))}>
                        <h1>LAUNCH GAME</h1>
                    </div>
                    <div className="centeredFlex">
                        <button onClick={logOut}>Log out</button>
                    </div>
                </div>
            )}
        </>
    );
}
