import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
    const linkStyle = {
        transition: 'color 0.3s ease, background-color 0.3s ease',
    };

    const hoverStyle = {
        color: '#59f0a2',
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">Vehicle Management</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">  {/* Use ms-auto for right alignment */}
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/parkVehicle"
                                    style={linkStyle}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = hoverStyle.color;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = '';
                                    }}
                                >
                                    Park Vehicle
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/parkVehiclesList"
                                    style={linkStyle}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = hoverStyle.color;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = '';
                                    }}
                                >
                                    Parked Vehicle List
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/displayAllVehicleList"
                                    style={linkStyle}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = hoverStyle.color;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = '';
                                    }}
                                >
                                    Vehicle Info
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Navbar;
