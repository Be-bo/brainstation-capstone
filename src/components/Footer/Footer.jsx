import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import linkedInQR from '../../assets/linkedin_qr.png';

function Footer() {




    return (
        <div className='footer'>
            <div className='footer__icons'>
                <a href="https://www.linkedin.com/in/robfiker/">
                    <i className='footer__icon fa-brands fa-linkedin fa-2x' />
                </a>
                <a href="http://github.com/Be-bo">
                    <i className='footer__icon fa-brands fa-github fa-2x' />
                </a>
            </div>

            <div className='footer__contact'>
                <a href="mailto:robfiker@gmail.com">robfiker@gmail.com</a>
            </div>

            <div className='footer__copyright'>
                <p className='footer__copyright-text'>© 2023 Robert Fiker All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer
