import {addEventOpenImagePopup, closePopup} from './modal.js';
import {getCloneNode, cardItemsList} from './utils.js';

function insertCardInsideList (card, container) {
    container.prepend(card.cardItem);
}

function getCardObject(initialData, popup=null, params = {
    template: '#photo-grid__item', 
    node:'.photo-grid__element-container', 
    classOfImage:'.photo-grid__image', 
    classOfName:'.photo-grid__name', 
    classOfLike:'.photo-grid__like-icon', 
    classOfDelete:'.photo-grid__delete', 
    }) {

    const cardItem = getCloneNode(params.template, params.node);
    const cardImg = cardItem.querySelector(params.classOfImage);
    const cardName = cardItem.querySelector(params.classOfName);
    const likeButton = cardItem.querySelector(params.classOfLike);
    const buttonDelete = cardItem.querySelector(params.classOfDelete);
    const cardObject = {
        cardItem, 
        cardImg,
        cardName,
        likeButton,
        buttonDelete,
    } 

    cardObject.cardImg.src = initialData.link;
    cardObject.cardImg.alt = initialData.name;
    cardObject.cardName.textContent = initialData.name;

    addEventLikeButton('click', cardObject, 'photo-grid__like-icon_active');
    addEventButtonDelete('click', cardObject, '.photo-grid__element-container')
    addEventOpenImagePopup('click', popup, cardObject.cardImg, cardObject.cardName);   
    return cardObject;
}


function addCardOnPage(evt, popup) {
    evt.preventDefault();
    const inputSourceImg = popup.querySelectorAll('.form__input-text')[1];
    const inputNameCard = popup.querySelectorAll('.form__input-text')[0];
    const cardObject = getCardObject(
        {
        link: inputSourceImg.value, 
        name: inputNameCard.value
        }, popup);
    insertCardInsideList(cardObject, cardItemsList);
    closePopup(evt);
}

function addEventButtonDelete(typeEvent, cardObj, parentClassName) {

    cardObj.buttonDelete.addEventListener(typeEvent, function(evt) {
        const currentButtonDelete = evt.target;
        const cardElement = currentButtonDelete.closest(parentClassName);
        cardElement.remove();
    });
}

function addEventLikeButton(typeEvent, cardObj, className) {
    cardObj.likeButton.addEventListener(typeEvent, function() {
        cardObj.likeButton.classList.toggle(className);
    });
}

export {addCardOnPage, getCardObject, insertCardInsideList};