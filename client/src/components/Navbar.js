import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import "font-awesome/css/font-awesome.min.css";
import {Link} from 'react-router-dom'

export default function Navbar({ setUser }) {
  const [isActive, setActive] = useState(false);
  const navBtn = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  // add event listener

  return (
    <header id="home">
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <button
              type="button"
              className="nav-toggle"
              id="nav-toggle"
              onClick={() => {
                setActive(!isActive);
              }}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <ul
            className={isActive ? "nav-links show-links" : "nav-links"}
            id="nav-links"
          >
            <li>
              <Link to='/' className="nav-link scroll-link">home</Link>
            </li>
            <li>
              <Link to='/recycle' className="nav-link scroll-link">recycle</Link>
            </li>
            <li>
              <Link to='/leaderboard' className="nav-link scroll-link">leaderboard</Link>
            </li>
            <li>
              <Link to='/about' className="nav-link scroll-link">about</Link>
            </li>
            <li>
              <Link to='/profile' className="nav-link scroll-link">profile</Link>
            </li>
            <li>
              <Link to='/'
                className="nav-link scroll-link"
                onClick={() => {
                  console.log("hello");
                  setUser(null);
                  localStorage.clear();
                }}
              >
                logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
