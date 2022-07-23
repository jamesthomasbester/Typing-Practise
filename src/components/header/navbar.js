import React from "react";
import './style.css';


const Navbar = () => {
    return (
        <nav>
            <div className="inner-nav">
                <ul>
                    <li>
                        <a>
                        <i class="fa-solid fa-circle-info"></i>
                        </a>
                    </li>
                    <li>
                        <a>
                        <i class="fa-solid fa-magnifying-glass"></i>
                        </a>
                    </li>
                    <li>
                        <a className="focused">
                        <i class="fa-solid fa-house"></i>
                        </a>
                    </li>
                    <li>
                        <a>
                        <i class="fa-solid fa-user"></i>
                        </a>
                    </li>
                    <li>
                        <a>
                        <i class="fa-solid fa-keyboard"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;