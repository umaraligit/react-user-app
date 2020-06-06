import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Dashboard</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/add" activeClassName="active">Add User</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/search" activeClassName="active">Search User</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/something_else" activeClassName="active">Others</NavLink>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
