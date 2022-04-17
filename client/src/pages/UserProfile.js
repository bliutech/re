import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch(`http://localhost:8000/user/${username}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div>
      <h1>Profile Page for {username}!</h1>
      <p>{user.username}</p>
      <p>{user.landfill}</p>
      <p>{user.compost}</p>
      <p>{user.recycle}</p>
      <p>{user.special}</p>
      <p>{user.points}</p>
    </div>
  );
}
