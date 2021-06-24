import React from 'react';
import { Link } from 'react-router-dom';
import Entrance from './Entrance';

function Register(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleChangeEmail(e) {
        setEmail(e.target.value);
      }
    
      function handleChangePassword(e) {
        setPassword(e.target.value);
      }

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister({ email, password });
    }


    return (
        <div className="register">
        <Entrance
            name="register"
            title="Регистрация"
            buttonTitle="Зарегистрироваться"
            onSubmit={handleSubmit}>
                <input
                className="entrance__input entrance__input_email"
                name="email"
                type="email"
                placeholder="Email"
                id="register__input_email"
                minLength="2"
                maxLength="40"
                onChange={handleChangeEmail}
                required />

                <input
                className="entrance__input entrance__input_password"
                name="password"
                type="password"
                placeholder="Пароль"
                id="register__input_password"
                minLength="2"
                maxLength="40"
                onChange={handleChangePassword}
                required />
        </Entrance>
        <Link to="/sign-in" className="register__link">Уже зарегистрированы? Войти</Link>
        </div>

    )
}

export default Register;

