import React from 'react';
import '../css/menu.css';
import Logo from '../resources/Logo.png';
import LogoutComponent from './getcookies';

const Header: React.FC = () => {
    
    return (
        <header>
            
            <img src={Logo} alt="logo" />


            <ul className="navigation">
                <li><a href="../../account.html">Account</a></li>
                <li className="active"><a href="../../budget-buddy.html">Budget Buddy</a></li>
                <li><a href="../../food-buddy.html">Food Buddy</a></li>
                <li><a href="../../agenda-buddy.html">Agenda Buddy</a></li>
            </ul>

            <div className="user-header-display">
                <p>
                    Welcome <span className="header-user"></span>, you are signed in as
                    <span className="header-member"></span>
                </p>
                <input type="button" className="logout" value="Logout" />
                <LogoutComponent />
            </div>
        </header>
    );
}

export default Header;