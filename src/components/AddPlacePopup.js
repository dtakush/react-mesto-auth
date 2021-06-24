import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    //Стейт-переменные
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');


    //Обработчики
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddCard({name, link});
    }

    React.useEffect(() => {
        setName(' ');
        setLink(' ');
    }, [props.isOpen]);


    return (
        <PopupWithForm
        name="place"
        title="Новое место"
        buttonTitle="Сохранить"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}>
            <input
            name="place"
            type="text"
            placeholder={`Название`}
            value={name || ''}
            className="popup__input popup__input_place"
            id="popup__input_place"
            minLength="2"
            maxLength="30"
            onChange={handleChangeName}
            required />
            <span
            className="popup__error popup__error_name"
            id="popup__input_place-error"
            ></span>


            <input
            name="link"
            type="url"
            placeholder="Ссылка"
            value={link || ''}
            className="popup__input popup__input_link"
            id="popup__input_link"
            onChange={handleChangeLink}
            required />
            <span
            className="popup__error popup__error_link"
            id="popup__input_link-error"
            ></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;