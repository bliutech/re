import React from "react";
import { Link } from "react-router-dom";

export default function Error404()
{
    return(
        <>
            <h1> 404 Error </h1>
            <p> The page you are looking for is not found! Please return <Link to='/'>Home</Link> to see more content.</p>
        </>
    );
}