import React from 'react';
//Контекст
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card ({card, onCardClick, onCardLike, onCardDelete}) {
    //Подписываемся на контект
    const currentUser = React.useContext(CurrentUserContext);

    //Показ иконки удаления
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__delete ${isOwn ? 'card__delete_show' : ''}`
    );

    //Изменение лайка карточки
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `card__like-image ${isLiked ? 'card__like-image_active' : ''}`
    ); 

    //Клик по карточке
    function handleClick() {
        onCardClick(card);
      }

    //Обработчик лайка
    function handleLikeClick() {
        onCardLike(card);
    }

    //Удаление карточки
    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <div className="card">
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <button className="card__image-button" onClick={handleClick}>
                <div className="card__image" style={{ backgroundImage: `url(${card.link})` }}></div>
            </button>
            <div className="card__info-block">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like">
                    <div className={cardLikeButtonClassName} onClick={handleLikeClick}></div>
                    <p className="card__like-number">{card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;