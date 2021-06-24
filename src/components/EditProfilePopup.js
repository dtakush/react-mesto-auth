import React from 'react';
//Контекст
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
    //Подписываемся на контект
    const currentUser = React.useContext(CurrentUserContext);

    //Стейт-переменные
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');


    //Обработчики
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name: name,
          about: description,
        });
    }

    React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);


    return (
        <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        buttonTitle="Сохранить"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}>
            <input
            value={name || ''}
            name="name"
            type="text"
            placeholder="Ваше имя"
            className="popup__input popup__input_name"
            id="popup__input_name"
            minLength="2"
            maxLength="40"
            onChange={handleChangeName}
            required
            />
            <span
            className="popup__error popup__error_name"
            id="popup__input_name-error"
            ></span>

            <input
            value={description || ''}
            name="about"
            type="text"
            placeholder="О себе"
            className="popup__input popup__input_about"
            id="popup__input_about"
            minLength="2"
            maxLength="200"
            onChange={handleChangeDescription}
            required
            />
            <span
            className="popup__error popup__error_about"
            id="popup__input_about-error"
            ></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;