import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

//Контекст
import { CurrentUserContext } from '../contexts/CurrentUserContext';

//Основное
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/api.js';
import * as auth from "../utils/auth.js";

//Попапы
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import DeletePopup from './DeletePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';

import '../index.css';

function App() {

    const history = useHistory();

    //Переменные состояния
    const [currentUser, setCurrentUser] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(false);

    const [userData, setUserData] = React.useState({});

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);
    const [isSuccessTooltipPopupOpen, setIsSuccessTooltipPopupOpen] = React.useState(false);

    const [card, setCard] = React.useState({name: '', link: ''});
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

    //Карточки
    const [cards, setCards] = React.useState([]);



    //Регистрация пользователя
    function handleRegister({email, password}) {
        auth.register(email, password)
        .then((res) => {
            if(res) {
                handleIsSuccessTooltipPopupOpen();
                history.push("/sign-in");
            } else {
                handleIsTooltipPopupOpen();
            }  
        })
        .catch((err) => {
            console.log(`Attention! ${err}`);
        })
    }

    //Авторизация пользователя
    function handleLogin({email, password}) {
        auth.authorize(email, password)
        .then((res) => {
            if(res && res.token) {
                tokenCheck();
            } else {
                handleIsTooltipPopupOpen();
            }
        })
        .catch((err) => {
            console.log(`Attention! ${err}`);
        })
    }

    //Проверка токена
    function tokenCheck() {
        const jwt = localStorage.getItem('jwt');

        if(jwt) {
            auth.checkToken(jwt)
            .then((res) => {
                if(res) {
                    setUserData({ 
                        email: res.data.email,
                        id: res.data._id,
                    });
                    
                    setLoggedIn(true);
                    history.push("/");
                } else {
                    localStorage.removeItem("jwt");
                    return
                }
            })
            .catch((err) => {
                console.log(`Attention! ${err}`);
                history.push("/sign-in");
            })
        }
    }

    React.useEffect(() => {
        tokenCheck();
    }, []);


    //Выход из аккаунта
   function handleSignOut() {
        setLoggedIn(false);
        history.push("/sign-in");
        localStorage.removeItem("jwt");
    }


    //Запрос информации пользователя
    React.useEffect(() => {
        if(loggedIn) {
            api.getUserInfo()
            .then((userInfo) => {
            setCurrentUser(userInfo);
            })
            .catch((err) => {
            console.log(`Attention! ${err}`);
            });
        }
        
    }, [loggedIn]);


    //Открытие попапа проваленой регистрации
    function handleIsTooltipPopupOpen() {
        setIsTooltipPopupOpen(!isTooltipPopupOpen);
    }

    //Открытие попапа успешеной регистрации
    function handleIsSuccessTooltipPopupOpen() {
        setIsSuccessTooltipPopupOpen(!isSuccessTooltipPopupOpen);
    } 

    //Открытие попапа аватара
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    //Открытие попапа профиля
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    //Открытие попапа карточек
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    //Открытие превью карточки
    function handleCardClick(card) {
        setIsImagePopupOpen(!isImagePopupOpen);
        setCard({
            name: card.name,
            link: card.link
        });
    }

    //Обработчик данных профиля
    function handleUpdateUser(items) {     
        api.setUserInfo(items)
            .then((userInfo) => {
                setCurrentUser(userInfo);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Attention! ${err}`)
            });
    }

    //Обработчик данных аватара
    function handleUpdateAvatar(item) {
        api.setNewAvatar(item)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Attention! ${err}`)
            })
        
    }

    //Закрытие попапов
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setIsTooltipPopupOpen(false);
        setIsSuccessTooltipPopupOpen(false);
    }


     //Запрос карточек
     React.useEffect(() => {
         if(loggedIn) {
            api.getInitialCards()
            .then((cards) => {     
                setCards(cards);
            })
            .catch((err) => {
                console.log(`Attention! ${err}`);
            });
         }
    }, [loggedIn]);


    //Постановка и удаление лайка
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
        .then((likedCard) => {
            const newCards = cards.map((i) => i._id === card._id ? likedCard : i);
            setCards(newCards);
        })
        .catch((err) => {
            console.log(`Attention! ${err}`);
        });
    }

    //Удаление карточки
    function handleCardDelete(card) {
        api.deleteCard(card._id)
        .then(() => {
            setCards(cards.filter((c) => c._id !== card._id))
        })
        .catch((err) => {
            console.log(`Attention! ${err}`);
        });
    }
    
    //Обработка данных новой карточки
    function handleAddCardSubmit(items) {
        api.addCard(items)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(`Attention! ${err}`);
        });
    }



  return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
            <Header 
            loggedIn={loggedIn}
            userData={userData}
            signOut={handleSignOut}
            />

            <Switch>
                <ProtectedRoute exact path="/"
                component={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                />

                <Route path="/sign-in">
                    <Login
                    onLogin={handleLogin}
                    />
                </Route>

                <Route path="/sign-up">
                    <Register
                    onRegister={handleRegister}
                    />
                </Route>
            </Switch>

        
            <Footer />

            <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddCardSubmit}
            />

            <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            />

            <DeletePopup />

            <ImagePopup
            card={card}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            />

            <InfoTooltip 
            name="authOk"
            isOpen={isSuccessTooltipPopupOpen}
            onClose={closeAllPopups}
            title="Вы успешно зарегистрировались!"
            />

            <InfoTooltip 
            name="authCancel"
            isOpen={isTooltipPopupOpen}
            onClose={closeAllPopups}
            title="Что-то пошло не так! Попробуйте ещё раз."
            />
        </div>
      </CurrentUserContext.Provider>
    
  )
}

export default App;
