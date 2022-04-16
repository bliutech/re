import React from "react";
import Profiles from "../components/Profiles";
//import axios from "axios";

export default function Leaderboard() {
  let data = [
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
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/leaderboard") // whatever the url is
  //     .then((response) => {
  //       console.log("SUCCESS", response);
  //       setData(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div className="board">
      <h1 className="leaderboard">Leaderboard</h1>
      <Profiles Data={data}></Profiles>
    </div>
  );
}
