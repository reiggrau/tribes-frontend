import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { loginUser } from "../../../redux/reducer.js";

import default_user from "../../../assets/default_user.jpg";

// Variables
const namesRegex = /^[a-z ,.'-]+$/i;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function Profile(props) {
    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [draft, setDraft] = useState(props.user);

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("draft:", draft);
        if (!draft.bio) {
            setDraft({ ...draft, bio: "" });
        }
    }, []);

    function toggleEditMode() {
        setEditMode(!editMode);
    }

    function inputChange(e) {
        setDraft({ ...draft, [e.target.name]: e.target.value });
    }

    function setPicture(e) {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);

            // Image preview
            var reader = new FileReader();

            reader.onload = function (e) {
                setDraft({ ...draft, picture: e.target.result });
            };
            // .bind(this);

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    function submitForm() {
        const { username, email, bio } = draft;

        if (!username || !email) {
            setMessage("Missing fields!");
        } else if (!email.match(emailRegex) || !username.match(namesRegex)) {
            setMessage("Invalid input!");
        } else {
            const formData = new FormData();

            formData.append("file", file);
            formData.append("username", username);
            formData.append("email", email);
            formData.append("bio", bio);

            fetch("/profile", {
                method: "POST",
                body: formData,
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.success) {
                        setMessage("");
                        setEditMode(false);
                        updateProfile(data.user);
                    } else {
                        setMessage(data.message);
                        throw new Error("PROFILE EDIT FAILED");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function updateProfile(userData) {
        // console.log("updateProfile() userData:", userData);

        dispatch(loginUser(userData));

        // this.setState({ user: { ...draft } });

        setDraft(userData);
    }

    function deleteAccount() {
        console.log("deleteAccount");
        const email = props.user.email;

        const password = prompt("Type your password to confirm account deletion:");
        console.log("password :", password);

        if (!password) {
            return;
        }

        fetch("/deletegetcode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.success) {
                    throw new Error("VERIFICATION FAILED");
                }

                let code = prompt("A confirmation email has been sent to the account's associated adress. Write the code received to continue:");
                console.log("code :", code);

                if (!code) {
                    return;
                }

                fetch("/deletecheckcode", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, code }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log("data :", data);
                        if (data.success) {
                            alert(data.message);
                            fetch("/logout");
                        } else {
                            alert(data.message);
                            return;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="overlay">
            <div className="window">
                <div id="profileDiv">
                    <div>
                        {!editMode && (
                            <>
                                <img id="picture" src={props.user.picture || default_user} alt="preview" />

                                <div id="userInfo">
                                    <h2>{props.user.username}</h2>
                                    {/* <h4>{props.user.email}</h4> */}
                                    <p>Member since:</p>
                                    <h4>{props.user.created_at}</h4>
                                </div>
                            </>
                        )}
                        {editMode && (
                            <>
                                <img id="picture" src={draft.picture || default_user} alt="preview" />

                                <form>
                                    <input type="file" name="file" onChange={setPicture} />
                                    <input type="text" name="username" placeholder="user name" value={draft.username} onChange={inputChange} required />
                                    <input type="email" name="email" placeholder="email" value={draft.email} onChange={inputChange} required />
                                </form>
                            </>
                        )}
                    </div>
                    <div id="bioDiv">
                        <div>
                            <h3 onClick={props.toggleProfile} id="xBtn" className="button">
                                X
                            </h3>
                        </div>
                        <h3>Bio</h3>
                        {!editMode && (
                            <>
                                <p id="bioText">{props.user.bio}</p>
                                <div className="centeredFlex">
                                    <button onClick={toggleEditMode}>Edit</button>
                                    <button onClick={deleteAccount}>Delete Account ❌</button>
                                </div>
                            </>
                        )}
                        {editMode && (
                            <>
                                <textarea id="bioTextarea" name="bio" cols="48" rows="17" onChange={inputChange} value={draft.bio}></textarea>
                                <p className="message">{message}</p>
                                <div className="centeredFlex">
                                    <button onClick={toggleEditMode}>Back</button>
                                    <button onClick={submitForm}>Save</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
