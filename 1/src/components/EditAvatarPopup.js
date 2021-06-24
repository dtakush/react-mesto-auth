import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    //Реф
    const userAvatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: userAvatarRef.current.value,
        });

        e.target.reset();
    } 


    return (
        <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonTitle="Сохранить"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}>
            <input
            ref={userAvatarRef}
            name="link" type="url"
            placeholder="Ссылка"
            className="popup__input popup__input_link"
            id="avatar-popup__input_link"
            required />
            <span className="popup__error popup__error_link" id="avatar-popup__input_link-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;