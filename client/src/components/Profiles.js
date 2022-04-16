import React from "react";

export default function Profiles({ Data }) {
  return (
    <table id="profile">
      <tr>
        <th>Username</th>
        <th>Landfill</th>
        <th>Recycle</th>
        <th>Compost</th>
        <th>Special</th>
        <th>Points</th>
      </tr>
      {Item(Data)}
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
