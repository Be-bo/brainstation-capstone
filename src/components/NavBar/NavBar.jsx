import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

function NavBar({ isPlayground }) {
    return (
        <nav className="nav-bar">
            <Link to="/" className="nav-bar__logo-link">
                <h1 className='nav-bar__logo'>TOGA</h1>
            </Link>

            <div className='nav-bar__nav'>
                <Link to='/playground' className='nav-bar__nav-item nav-bar__nav-item--selected nav-item-text'>
                    Playground
                </Link>
                <Link to='/gallery' className='nav-bar__nav-item nav-item-text'>
                    Gallery
                </Link>
            </div>

            <div className='nav-bar__container-right'>
                <Link to='/playground'>
                    {!isPlayground && (<button className='nav-bar__create-btn'>Create</button>)}
                </Link>

                <Link>
                    <div className="nav-bar__avatar" alt="Avatar of the current user" />
                </Link>
            </div>
        </nav>
    )
}

export default NavBar
