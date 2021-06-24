import React from 'react';

function ImagePopup({card, isOpen, onClose}) {
    return (
        <section className={`popup popup_card ${isOpen ? 'popup_opened' : ''}`} name={card.name}>
            <div className="popup__container popup__container_card">
                <div className="popup__pic">
                    <button className="popup__close popup__close_card" type="button" onClick={onClose}></button>
                    <img className="popup__image" src={card.link} alt={card.name} />
                    <p className="popup__text">{card.name}</p>
                </div>
            </div>
        </section>
    )
}

export default ImagePopup;