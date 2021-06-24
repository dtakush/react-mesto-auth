import React from 'react';

function InfoTooltip(props) {
    return (
        <section className={`popup popup__auth-info popup__auth-info_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_auth-info">
                <button className={`popup__close popup__close-${props.name}`} type="button" onClick={props.onClose}></button>
                <div className={`popup__icon popup__icon_${props.name}`}></div>
                <h2 className="popup__title popup__title_auth-info">{props.title}</h2>
            </div>
        </section>
    )
}

export default InfoTooltip;