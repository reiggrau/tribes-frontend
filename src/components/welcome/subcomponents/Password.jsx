import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

// Variables
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function Login(props) {
    const { changeMenu } = props;

    const [form, setForm] = useState({ code: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const [stage, setStage] = useState("email");

    const serverUrl = useSelector((state) => state.serverUrl);

    useEffect(() => {
        console.log("Password.jsx useEffect");
    }, []);

    function inputChange(e) {
        // console.log("inputChange()");
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function submitForm(e) {
        e.preventDefault();
        console.log("submitForm() form:", form);

        if (!form.email) {
            setMessage("Missing fields!");
        } else if (!form.email.match(emailRegex)) {
            setMessage("Invalid email format!");
        } else {
            fetch(serverUrl + "/getcode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("/getcode data:", data);
                    if (data.success) {
                        setMessage("");
                        setStage("code");
                    } else {
                        setMessage(data.message);
                        throw new Error("VERIFICATION FAILED");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function submitCode(e) {
        e.preventDefault();
        // console.log("submitCode(). state:", state);

        if (!form.code || !form.password) {
            setMessage("Missing fields!");
        } else {
            fetch(serverUrl + "/resetpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("/resetpassword data :", data);
                    if (data.success) {
                        setMessage("");
                        setStage("done");
                    } else {
                        setMessage(data.message);
                        setStage("email");
                        throw new Error("PASSWORD RESET FAILED");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <div className="window">
            <h2>Password Reset</h2>
            {stage === "email" && (
                <>
                    <p>
                        Write your email to get
                        <br></br> the reset code:
                    </p>
                    <p className="message">{message}</p>
                    <form>
                        <input type="email" name="email" placeholder="email" onChange={inputChange} />
                        <button onClick={submitForm}>Send</button>
                    </form>
                    <p className="link" onClick={() => changeMenu("login")}>
                        Cancel
                    </p>
                </>
            )}
            {stage === "code" && (
                <>
                    <p>
                        Write the code received
                        <br></br> and the new password:
                    </p>
                    <p className="message">{message}</p>
                    <form>
                        <input type="text" name="code" placeholder="code" onChange={inputChange} />
                        <input type="password" name="password" placeholder="new password" onChange={inputChange} />
                        <button onClick={submitCode}>Send</button>
                    </form>
                    <p className="link" onClick={() => changeMenu("login")}>
                        Back
                    </p>
                </>
            )}
            {stage === "done" && (
                <>
                    <p>Your password has been reset.</p>
                    <p>Log in with the new password.</p>
                    <p className="link" onClick={() => changeMenu("login")}>
                        Back to Log in
                    </p>
                </>
            )}
        </div>
    );
}
