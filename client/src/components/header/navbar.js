import React from "react";
import './style.css';
import {NavLink} from "react-router-dom";


const Navbar = () => {
    return (
        <nav>
            <div className="inner-nav">
                <ul>
                    <li>
                        <NavLink activeClass="is-active" to="/query">
                        {({isActive}) => isActive ? 
                            <span className="material-symbols-rounded nav-icon is-active">search</span> : 
                            <span className="material-symbols-rounded nav-icon">search</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClass="is-active" to="/home">
                        {({isActive}) => isActive ? 
                            <span className="material-symbols-rounded nav-icon is-active">keyboard</span> : 
                            <span className="material-symbols-rounded nav-icon">keyboard</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" end>
                            {({isActive}) => isActive ? 
                            <span className="material-symbols-rounded nav-icon is-active">account_box</span> : 
                            <span className="material-symbols-rounded nav-icon">account_box</span>}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;