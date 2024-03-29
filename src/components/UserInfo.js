export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
      this._nameSelector = nameSelector;
      this._aboutSelector = aboutSelector;
      this._avatarSelector = avatarSelector;
      this.user = null;
  }

  updateAvatar({link}) {
    this._avatarSelector.src = link;
    console.log('Аватар обновлен');
  }

  setUserInfo({userInfo}) {          
    this._nameSelector.textContent = userInfo.name;
    this._aboutSelector.textContent = userInfo.about;
    this._avatarSelector.src = userInfo.avatar;
    this.user = userInfo;
    console.log('Данные обновлены');
  }

  getUserInfo() {
    return this.user;
  }

}

export { UserInfo }
