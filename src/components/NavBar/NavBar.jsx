import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

function NavBar({ isPlayground }) {
    let playgroundLinkClasses = 'nav-bar__nav-item nav-item-text'; // dynamic selection depending on location
    let galleryLinkClasses = 'nav-bar__nav-item nav-item-text';
    if (isPlayground) playgroundLinkClasses += ' nav-bar__nav-item--selected';
    else galleryLinkClasses += ' nav-bar__nav-item--selected';

    return (
        <nav className="nav-bar">
            <Link to="/" className="nav-bar__logo-link">
                <h1 className='nav-bar__logo'>TOGA</h1>
            </Link>

            <div className='nav-bar__nav'>
                <Link to='/playground' className={playgroundLinkClasses}>
                    Playground
                </Link>
                <Link to='/gallery' className={galleryLinkClasses}>
                    Gallery
                </Link>
            </div>

            <div className='nav-bar__container-right'>
                {/* <Link to='/playground'>
                    {!isPlayground && (<button className='nav-bar__create-btn'>Create</button>)}
                </Link> */}

                <Link>
                    <div className="nav-bar__avatar" alt="Avatar of the current user" />
                </Link>
            </div>
        </nav>
    )
}

export default NavBar
