import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
    const location = useLocation();
    const isLocationSignUp = location.pathname === '/sign-up';
    const isLocationSignIn = location.pathname === '/sign-in';
    const isLocationStart = location.pathname === '/';


    function handleSignOut() {
        props.signOut();
    }


    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="Логотип Mesto" />

            {(isLocationStart) && 
                <div className="header__user-info">
                    <p className="header__email">{props.loggedIn ? props.userData.email : ""}</p>
                    <Link to="/sign-in"
                    className="header__link header__sign-out"
                    onClick={handleSignOut}>
                    Выйти
                    </Link> 
            </div>
            }

            {(isLocationSignIn) && 
                <div className="header__user-info">
                    <Link to="/sign-up"
                    className="header__link">
                    Регистрация
                    </Link> 
            </div>
            }

            {(isLocationSignUp) && 
                <div className="header__user-info">
                    <Link to="/sign-in"
                    className="header__link">
                    Войти
                    </Link> 
            </div>
            }


        </header>
    )
}

export default Header;
