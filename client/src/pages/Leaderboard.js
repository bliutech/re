import React, { useEffect } from "react";
import Profiles from "../components/Profiles";
//import axios from "axios";

export default function Leaderboard() {
  let leaderboardData = [
    {
      username: "benson",
      landfill: 1,
      compost: 1,
      recycle: 1,
      special: 1,
      points: 1,
    },
    {
      username: "bensonson",
      landfill: 2,
      compost: 2,
      recycle: 2,
      special: 2,
      points: 2,
    },
    {
      username: "bensonsonson",
      landfill: 3,
      compost: 3,
      recycle: 3,
      special: 3,
      points: 3,
    },
  ];
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("https://localhost:8000/leaderboard")
      .then((response) => response.json())
      .then((data) => (leaderboardData = data));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div className="board">
      <h1 className="leaderboard">Leaderboard</h1>
      <Profiles Data={leaderboardData}></Profiles>
    </div>
  );
}
