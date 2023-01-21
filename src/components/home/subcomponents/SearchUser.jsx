import { useState } from "react";

import SearchUserResultList from "./SearchUserResultList.jsx";

let timer; // Stored in the global scope so it outlives the function

function SearchUser({ setOtherProfile }) {
    const [searchString, setSearchString] = useState("");
    const [resultList, setResultList] = useState(false);
    const [users, setUsers] = useState([]);

    function inputChange(e) {
        setSearchString(e.target.value);

        if (e.target.value == "") {
            setUsers([]);
            return;
        }

        clearTimeout(timer);

        timer = setTimeout(() => {
            let searchString = e.target.value;

            fetch("/searchuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ searchString }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log("searchuser data :", data);
                    setUsers(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 250);
    }

    return (
        <div id="searchUserDiv">
            <input className="input" type="text" placeholder="Search User" value={searchString} onChange={inputChange} onFocus={() => setResultList(true)} onBlur={() => setTimeout(() => setResultList(false), 200)} />
            {resultList && <SearchUserResultList users={users} setResultList={setResultList} setOtherProfile={setOtherProfile} />}
        </div>
    );
}

export default SearchUser;
