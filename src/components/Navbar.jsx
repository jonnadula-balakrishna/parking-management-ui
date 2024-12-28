import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Navbar = () => {
    const navbarStyle = {
        backgroundColor: '#F8F9FA', // Dark navy background
        padding: '10px 15px',
    };

    const brandStyle = {
        color: '#000000', // Bright red brand color
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textDecoration: 'none',
    };

    const linkStyle = {
        color: '#000000', // Light grey for labels
        fontSize: '1rem',
        marginLeft: '15px',
        textDecoration: 'none',
        transition: 'color 0.3s ease',
    };

    const hoverStyle = {
        color: '#F1C40F', // Gold color for hover
    };

    const activeStyle = {
        color: '#F1C40F', // Gold color for active link
        fontWeight: 'bold', // Optionally make it bold for better emphasis
    };

    const togglerStyle = {
        borderColor: '#ECF0F1', // Matches the label color
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={navbarStyle}>
                <div className="container">
                    {/* Brand Name */}
                    <Link
                        className="navbar-brand"
                        to="/"
                        style={brandStyle}
                        onMouseEnter={(e) => (e.target.style.color = hoverStyle.color)}
                        onMouseLeave={(e) => (e.target.style.color = brandStyle.color)}
                    >
                        {/* <img width="40" src="https://img.icons8.com/quill/100/FFFFFF/car.png" alt="car" />
                        //  */}
                       <img width="50"  src="https://img.icons8.com/papercut/100/truck.png" alt="interstate-truck"/>
                        &nbsp;Vehicle Management
                    </Link>

                    {/* Hamburger Menu */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        style={togglerStyle}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible Menu */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {/* Navigation Links */}
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/parkVehicle"
                                    style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
                                    onMouseEnter={(e) => (e.target.style.color = hoverStyle.color)}
                                    onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
                                >
                                    🅿️ Park Vehicle
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/parkVehiclesList"
                                    style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
                                    onMouseEnter={(e) => (e.target.style.color = hoverStyle.color)}
                                    onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
                                >
                                    📋 Parked Vehicle List
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/displayAllVehicleList"
                                    style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
                                    onMouseEnter={(e) => (e.target.style.color = hoverStyle.color)}
                                    onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
                                >
                                    🚙 All Registered Vehicles
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
};

export default Navbar;
