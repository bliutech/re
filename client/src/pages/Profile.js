import React, { useState, useEffect } from "react";

export default function Profile({ user, setUser }) {
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(user);
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch(`http://localhost:8000/user/${user.username}`)
      .then((response) => response.json())
      .then((data) => setCurrentUser(data));
    console.log(currentUser);
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  function handleClick() {
    window.location = `/profile/${search}`;
  }
  return (
    <div>
      <h2>Your Profile</h2>
      <p>{currentUser.username}</p>
      <p>{currentUser.landfill}</p>
      <p>{currentUser.compost}</p>
      <p>{currentUser.recycle}</p>
      <p>{currentUser.special}</p>
      <p>{currentUser.points}</p>
      <h1>Search for user profile</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
}
