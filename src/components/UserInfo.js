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

  setUserInfo(inputName, inputInfo) {
    this._userName.textContent = inputName;
    this._userInfo.textContent = inputInfo;
  }
}
