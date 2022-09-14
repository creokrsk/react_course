import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <Link className="nav-link" to="/">
                Main
            </Link>

            <Link className="nav-link" to="/login">
                Login
            </Link>

            <Link className="nav-link" to="/users">
                Users
            </Link>
        </nav>
    );
};

export default NavBar;
