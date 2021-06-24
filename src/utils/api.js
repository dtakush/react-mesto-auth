
class Api {
    constructor({baseUrl, headers}) {
      this.baseUrl = baseUrl;
      this.headers = headers
    }

    //Запрос карточек с сервера
    getInitialCards() {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'GET',
        headers: this.headers
      })
      .then(this._checkResponse)
    }

    //Добавление карточки на сервер
    addCard(card) {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          link: card.link,
          name: card.name,
        }),
      })
      .then(this._checkResponse)
    }
  
    //Запрос информации о пользователе    
     getUserInfo() {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: this.headers
      })
      .then(this._checkResponse)
    }

    //Изменение информации о пользователе
    setUserInfo(items) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: items.name,
          about: items.about
        })
      })
      .then(this._checkResponse)
    }

    //Удаление карточки
    deleteCard(id) {
      return fetch(`${this.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(this._checkResponse)
    }

     //Добавление и удаление лайка
     changeLikeCardStatus(id, isLiked) {
      return fetch(`${this.baseUrl}/cards/likes/${id}`, {
        method: isLiked ? 'PUT' : 'DELETE',
        headers: this.headers

      })
      .then(this._checkResponse)
    }
  
    //Изменение аватара
    setNewAvatar(avatar) {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: avatar.avatar,
        })
      })
      .then(this._checkResponse)
    }

    _checkResponse(res){
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    }


const api = new Api({
      baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
      headers: {
        authorization: '3f3bc69b-6834-471f-8bfa-0881762188af',
        'Content-Type': 'application/json'
      }
  });


export default api;