import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePopup() {
    return (
        <PopupWithForm
        name="delete"
        title="Вы уверены?"
        buttonTitle="Да">
        </PopupWithForm>
    )
}

export default DeletePopup;