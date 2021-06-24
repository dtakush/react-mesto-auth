import React from 'react';
import Entrance from './Entrance';

function Login(props) {

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
        props.onLogin({ email, password });
    }

    return (
        <Entrance
            name="login"
            title="Вход"
            buttonTitle="Войти"
            onSubmit={handleSubmit}>

            <input
            className="entrance__input entrance__input_email"
            name="email"
            type="email"
            placeholder="Email"
            id="login__input_email"
            minLength="2"
            maxLength="40"
            onChange={handleChangeEmail}
            required />

            <input
            className="entrance__input entrance__input_password"
            name="password"
            type="password"
            placeholder="Пароль"
            id="login__input_password"
            minLength="2"
            maxLength="40"
            onChange={handleChangePassword}
            required />
        </Entrance>

    )
}

export default Login;