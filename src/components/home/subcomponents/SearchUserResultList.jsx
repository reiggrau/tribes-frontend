function FindUserResultList({ users, setResultList, setOtherProfile }) {
    return (
        <div id="resultList">
            {users.map((user) => (
                <div key={user.id} className="logMenu" onClick={() => setResultList(false)}>
                    <img src={user.picture || "/default_user.jpg"} id="headerUserPicture" alt="user picture" />
                    <h3 className="button" onClick={() => setOtherProfile(user.id)}>
                        {user.username}
                    </h3>
                </div>
            ))}
        </div>
    );
}

export default FindUserResultList;
