import React from 'react';
//Контекст
import { CurrentUserContext } from '../contexts/CurrentUserContext';

//Элементы
import editAvatar from '../images/editAvatar.svg';
import Card from './Card';


function Main(props) {

    //Подписываемся на контект
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__person">
                    <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={props.onEditAvatar}>
                        <div className="profile__avatar-edit">
                            <img src={editAvatar} className="profile__edit-icon" alt="Иконка редактирования аватара" />
                        </div>
                    </div>
                    <div className="profile__info">
                        <div className="profile__edit-info">
                            <h1 className="profile__name" name="name">{currentUser.name}</h1>
                            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile__about" name="about">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>

    
            <section className="cards">
                {props.cards.map((item) => {
                   
                    return (
                        <Card
                        card={item}
                        key={item._id}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete} />
                    )
                })}
            </section>

        </main>
    )
}


export default Main;