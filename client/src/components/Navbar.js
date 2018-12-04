import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => (
    <nav>
        <NavbarUnAuth />
    </nav>
);

const NavbarUnAuth = () => (
    <ul>
        <li>
            <NavLink to="/" exact>Home</NavLink>
        </li>
        <li>
            <NavLink to="/search">Search</NavLink>
        </li>
        <li>
            <NavLink to="/search">Signin</NavLink>
        </li>
        <li>
            <NavLink to="/search">Signup</NavLink>
        </li>
    </ul>
);

export default Navbar;