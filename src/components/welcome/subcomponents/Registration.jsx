import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

// Variables
const namesRegex = /^[a-z ,.'-]+$/i;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function Registration(props) {
    const { changeMenu } = props;

    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const serverUrl = useSelector((state) => state.serverUrl);

    useEffect(() => {
        console.log("Registration.jsx useEffect");
    }, []);

    function inputChange(e) {
        // console.log("inputChange()");
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function submitForm(e) {
        e.preventDefault();
        console.log("submitForm() form:", form);

        if (!form.username || !form.email || !form.password) {
            setMessage("Missing fields!");
        } else if (!form.email.match(emailRegex) || !form.username.match(namesRegex)) {
            setMessage("Invalid input format!");
        } else {
            fetch(serverUrl + "/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Registration data :", data);
                    if (data.success) {
                        // setLoginStatus(true);
                        // history.pushState({}, "", `/`);
                        // location.reload();
                    } else {
                        setMessage(data.message);
                        throw new Error("REGISTRATION FAILED");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <div className="window">
            <h2>Registration</h2>
            <p>Already a member?: </p>
            <p className="link" onClick={() => changeMenu("login")}>
                Log in
            </p>
            <p className="message">{message}</p>
            <form>
                <input type="text" name="username" placeholder="user name" onChange={inputChange} />
                <input type="email" name="email" placeholder="FAKE email" onChange={inputChange} />
                <input type="password" name="password" placeholder="FAKE password" onChange={inputChange} />
                <button onClick={submitForm}>Sign up</button>
            </form>
        </div>
    );
}
