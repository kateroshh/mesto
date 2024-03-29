export default class Api {
  constructor({ baseUrl,  headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  saveUserInfo({ name, link }) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: `${name}`,
          about: `${link}`
        })
      })
      .then(res => this._checkResponse(res));
  }

  saveUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar
        })
      })
      .then(res => this._checkResponse(res));
  }

  createNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(res => this._checkResponse(res));
  }

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(res => this._checkResponse(res));
  }

  likeCard(cardID, isLike) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
        method: !isLike ? 'DELETE' : 'PUT',
        headers: this._headers,
      })
      .then(res => this._checkResponse(res));
  }

}



