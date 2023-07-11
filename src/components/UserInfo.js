export default class UserInfo {
  constructor({ userName, userInfo }) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userInfo: this._userInfo.textContent,
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.link;
  }
}
