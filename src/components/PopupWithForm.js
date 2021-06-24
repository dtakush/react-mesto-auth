import React from 'react';

function PopupWithForm(props) {
    return (
    <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
            <button className={`popup__close popup__close-${props.name}`} type="button" onClick={props.onClose}></button>
            <h2 className="popup__title">{props.title}</h2>

            <form
            className={`popup__form popup__form_${props.name}`}
            name={`${props.name}-form`}
            id={`${props.name}-form`}
            onSubmit={props.onSubmit}
            >

                {props.children}

                <button
                className="popup__save-button"
                name={`${props.name}-popup-button`}
                id={`${props.name}-popup-button`}
                type="submit">
                    {props.buttonTitle}
                </button>

            </form>
        </div>
    </section>
    )
}

export default PopupWithForm;