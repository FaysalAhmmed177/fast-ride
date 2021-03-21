import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {
    const history = useHistory();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <div className="container">
                <div className='row pt-4 align-items-center'>
                    <div className="col-lg-3">
                        <h2>Fast Riders</h2>
                    </div>
                    <div className="col-lg-9 col-sm-12">
                        <nav className="nav">
                            <ul>
                                <li>
                                    <Link to="/home">Home</Link>
                                </li>
                                <li>
                                    <Link >Destination</Link>
                                </li>
                                <li>
                                    <Link to="/blog">Blog</Link>
                                </li>
                                <li>
                                    <Link to="/contact">Contact</Link>
                                </li>
                                <li>
                                    {loggedInUser.name? <a href="#">{loggedInUser.name}</a>: <Link className="btn btn-primary text-white" to="/login">Login</Link>}
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