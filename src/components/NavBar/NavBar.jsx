import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';


function NavBar({isPlayground}) {
    return (
        <nav className="nav-bar">
            <Link to="/" className="nav-bar__logo-link">
                <h1 className='nav-bar__logo'>TOGA</h1>
            </Link>

            <div className='nav-bar__container-right'>
                <Link to='/playground'>
                    {!isPlayground && (<button className='nav-bar__create-btn'>Create</button>)}
                </Link>

                <Link to='/account'>
                    <div className="nav-bar__avatar" alt="Avatar of the current user" />
                </Link>
            </div>
        </nav>
    )
}

export default NavBar
