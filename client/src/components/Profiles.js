import React, { useEffect, useState } from "react";

export default function Profiles() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("http://localhost:8000/leaderboard")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  return (
    <table id="profile">
      <thead>
        <tr>
          <td>Username</td>
          <td>Landfill</td>
          <td>Recycle</td>
          <td>Compost</td>
          <td>Special</td>
          <td>Points</td>
        </tr>
      </thead>
      <tbody>{Item(data)}</tbody>
    </table>
  );
}
function byPoints(a, b) {
  if (a.points > b.points) {
    return -1;
  } else if (b.points > a.points) {
    return 1;
  } else {
    return 0;
  }
}
function Item(data) {
  data.sort(byPoints);
  return (
    <>
      {data.map((value, index) => (
        <tr className="item" key={index}>
          <td className="info">{value.username}</td>
          <td className="info">{value.landfill}</td>
          <td className="info">{value.recycle}</td>
          <td className="info">{value.compost}</td>
          <td className="info">{value.special}</td>
          <td className="info">{value.points}</td>
        </tr>
      ))}
    </>
  );
}
