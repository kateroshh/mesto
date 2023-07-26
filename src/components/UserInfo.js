export default class UserInfo {
  constructor({ userName, userInfo, userAvatar }) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
    this._userAvatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userInfo: this._userInfo.textContent,
      userAvatar: this._userAvatar.src,
    }
  }

  setUserInfo(data) {
    if(data.avatar) {
      this._userName.textContent = data.name;
      this._userAvatar.src = data.avatar;
      this._userInfo.textContent = data.about;
    } else {
      this._userName.textContent = data.name;
      this._userInfo.textContent = data.link;
    }
  }

  getUserAvatar() {
    return {
      userAvatar: this._userAvatar.src,
    }
  }

  setUserAvatar(avatarLink) {
    this._userAvatar.src = avatarLink;
  }

}
