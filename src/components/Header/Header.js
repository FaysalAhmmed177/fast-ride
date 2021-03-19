import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
    return (
        <div>
        <div className="container">
            <div className='row pt-4 align-items-center'>
                <div className="col-lg-4">
                    <h2>Urban Riders</h2>
                </div>
                <div className="col-lg-8 col-sm-12">
                    <nav className="nav">
                        <ul>
                            <li>
                                <Link to="/home">Home</Link>
                            </li>
                            <li>
                                <Link to="/destination">Destination</Link>
                            </li>
                            <li>
                                <Link to="/blog">Blog</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                            <li>
                                <Link className="btn btn-primary text-white" to="/login">Login</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Header;