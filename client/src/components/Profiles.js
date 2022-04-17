import React, { useEffect, useState } from "react";
import './Profile.css';

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
          <td className="mobile"><b>Username</b></td>
          <td className="mobile"><b>Points</b></td>
          <td className="desktop"><b>Landfill</b></td>
          <td className="desktop"><b>Recycle</b></td>
          <td className="desktop"><b>Compost</b></td>
          <td className="desktop"><b>Special</b></td>
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
  data?.sort(byPoints);
  return (
    <>
      {data?.map((value, index) => (
        <tr className="item" key={index}>
          <td className="mobile info">{value.username}</td>
          <td className="mobile info">{value.points? value.points : 0}</td>
          <td className="desktop info">{value.landfill}</td>
          <td className="desktop info">{value.recycle}</td>
          <td className="desktop info">{value.compost}</td>
          <td className="desktop info">{value.special}</td>
        </tr>
      ))}
    </>
  );
}
