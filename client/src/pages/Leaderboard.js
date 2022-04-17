import React, { useEffect } from "react";
import Profiles from "../components/Profiles";
//import axios from "axios";

export default function Leaderboard() {
  return (
    <div className="board">
      <h1 className="leaderboard">Leaderboard</h1>
      <Profiles />
    </div>
  );
}
