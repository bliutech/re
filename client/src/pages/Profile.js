import React, { useState } from "react";

export default function Profile() {
  const [user, setUser] = useState("");
  function handleClick() {
    window.location = `/profile/${user}`;
  }
  return (
    <div>
      <h1>Search for user profile</h1>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
}
