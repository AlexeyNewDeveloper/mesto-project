const popupAddCard = document.querySelector('#addCard');
const popupEditProfile = document.querySelector('#editProfile');
const popupEditAvatar = document.querySelector('#editAvatar');
const popupImage = document.querySelector('#openImage');
const popupConfirmDelete = document.querySelector('#confirmDelete');

const formAddCard = popupAddCard.querySelector('#formAddCard');
const formEditProfile = popupEditProfile.querySelector('#formEditPofile');
const formEditAvatar = popupEditAvatar.querySelector('#formEditAvatar');

const buttonAddCard = document.querySelector('.profile-section__add');
const buttonEditProfile = document.querySelector('.profile-section__edit');
const buttonEditAvatar = document.querySelector('.profile-section__edit-avatar');

const inputLinkToAvatar = formEditAvatar.querySelector('.form__input-text');

const inputSourceImg = formAddCard.elements.description;
const inputNameCard = formAddCard.elements.name;

const profileAvatar = document.querySelector('.profile-section__avatar');
const cardItemsList = document.querySelector('.photo-grid__items');

const cards = [];
const loadingText = 'Сохранение...';

const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input-text',
  submitButtonSelector: '.form__save',
  inputErrorClass: 'form__input-text_invalid',
  errorId: null,
  errorClassActive: 'form__title-error_active',

  set setErrorId(inputId) {
      this.errorId = `#${inputId}-error`;
  }
}

const params = {
  template: '#photo-grid__item', 
  node:'.photo-grid__element-container', 
  classOfImage:'.photo-grid__image', 
  classOfName:'.photo-grid__name', 
  classOfLike:'.photo-grid__like-icon', 
  classOfDelete:'.photo-grid__delete',
  classOfLikes: '.photo-grid__likes', 
}

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  cohortId: 'plus-cohort-13',
  headers: {
      authorization: 'e4d16501-e8d2-438e-96b5-6b9c94c85c98',
      'Content-Type': 'application/json'
  },
  method: 'GET',
  body: null
}


export { popupAddCard, popupEditProfile, popupEditAvatar, popupImage, popupConfirmDelete, formAddCard, formEditProfile, formEditAvatar, buttonAddCard, buttonEditProfile, buttonEditAvatar, inputLinkToAvatar, inputSourceImg, inputNameCard, profileAvatar, cardItemsList, cards, loadingText, validationSettings, params, config }