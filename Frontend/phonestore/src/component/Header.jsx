import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../store/auth";

const Header = () => {
    const { isLoggedIn } = useAuth();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <div className="container bg-dark">
                <a className="navbar-brand" to="/">Online Mobile Shop</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>

                        {isLoggedIn ? (
                            <li className="nav-item"><Link className="nav-link" to="/Logout">Logout</Link></li>)
                            :
                            (<li className="nav-item"><Link className="nav-link" to="/Login">Login</Link></li>)
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;