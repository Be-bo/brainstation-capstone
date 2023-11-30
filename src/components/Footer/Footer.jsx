import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import linkedInQR from '../../assets/linkedin_qr.png';

function Footer() {
    return (
        <div className='footer'>
            <div className='footer__left-container'>
                <h3>Contact</h3>
                <p>robfiker@gmail.com</p>
                <p>linkedin.com/in/robfiker</p>
            </div>

            <div className='footer__right-container'>
                <img className='footer__qr' src={linkedInQR}/>
            </div>
        </div>
    )
}

export default Footer
