import './index.css';


import { 
    openPopup, 
    addEventSubmitForForm, 
    addEventForClosePopup,
    fillInitialValuesFields,
    closePopup,
    userName,
    userAbout,
} from './components/modal.js';
import { 
    enableValidationAllForms,
    checkValidityOfFields,
    toggleButtonSubmitState,
 } from './components/validate.js';
import {
    validationSettings, 
    userObject, 
    cardItemsList,
    changeButtonTextDuringLoading
} from './components/utils.js';
import { 
    config, 
    configTemplate,
    getDataOnRequestToServer,
} from './components/api.js';
import { 
    getCardObject, 
    insertCardInsideList,
    insertCardOnPage, 
    removeCard,
} from './components/card.js';


const popupAddCard = document.querySelector('#addCard');
const popupEditProfile = document.querySelector('#editProfile');
const popupEditAvatar = document.querySelector('#editAvatar');

const formAddCard = popupAddCard.querySelector('#formAddCard');
const formEditProfile = popupEditProfile.querySelector('#formEditPofile');
const formEditAvatar = popupEditAvatar.querySelector('#formEditAvatar');

const buttonSubmitFormAddCard = formAddCard.querySelector('.form__save');
const buttonSubmitFormEditProfile = formEditProfile.querySelector('.form__save');
const buttonSubmitFormEditAvatar = formEditAvatar.querySelector('.form__save');

const buttonAddCard = document.querySelector('.profile-section__add');
const buttonEditProfile = document.querySelector('.profile-section__edit');
const buttonEditAvatar = document.querySelector('.profile-section__edit-avatar');

const inputLinkToAvatar = formEditAvatar.querySelector('.form__input-text');

const inputSourceImg = formAddCard.elements.description;
const inputNameCard = formAddCard.elements.name;

const profileAvatar = document.querySelector('.profile-section__avatar');

const loadingText = 'Сохранение...';

let firstClickAddCard = true;
let firstClickEditProfile = true;
let firstClickEditAvatar = true;


function confirmDeleteCallback(evt) {
    evt.preventDefault();
    deleteCardFromServer({
        idObj: this.cardObject.cardId, 
        cardElement: this.cardElement,
        handlerObject: this,
        buttonSubmit: this.buttonSubmit,
    });
}

function handleProfileEditFormSubmit(evt) {
    evt.preventDefault();
    changeButtonTextDuringLoading({
        button: this.buttonSubmit,
        loadingText: loadingText,
        primaryText: this.buttonSubmit.textContent,
    });
    setTimeout(() => {   // DOM не успевает перерисоваться              
        updateProfileInformation({
            information: {
                name: this.formElement.elements.name.value,
                description: this.formElement.elements.description.value,
            }
        })
        .then(res => {
            console.log(res);
            closePopup({popup: this.popup, handleEvent: handleProfileEditFormSubmit});
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            changeButtonTextDuringLoading({button: this.buttonSubmit});
        })
    }, 1);
}

function handleEditAvatarFormSubmit(evt) {
    evt.preventDefault();

    changeButtonTextDuringLoading({
        button: this.buttonSubmit,
        loadingText: loadingText,
        primaryText: this.buttonSubmit.textContent,
    });

    setTimeout(() => {   // DOM не успевает перерисоваться  
        
        updateAvatar({link: inputLinkToAvatar.value})
        .then(userAvatar => {
            profileAvatar.src = userAvatar.avatar;
            closePopup({popup: this.popup, handleEvent: handleEditAvatarFormSubmit});
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            changeButtonTextDuringLoading({button: this.buttonSubmit});
        })
        
    }, 1);
    
}

function addCardOnPage(evt) {
    evt.preventDefault();
    
    changeButtonTextDuringLoading({
        button: this.buttonSubmit,
        loadingText: loadingText,
        primaryText: this.buttonSubmit.textContent,
    });
    
    setTimeout(() => {
        
        addCardOnServer({information: {name: inputNameCard.value, link: inputSourceImg.value}})
        .then(card => {
            const cardObject = getCardObject(card, userObject['_id'], confirmDeleteCallback);
            insertCardInsideList(cardObject, cardItemsList);
            closePopup({popup: popupAddCard, handleEvent: addCardOnPage});
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            changeButtonTextDuringLoading({button: this.buttonSubmit});
        })
    }, 1);
    
}

function addCardOnServer(settings={
    information: {
        name: '', link: ''
    }}
    ) {
        const configForRequest = configTemplate;
        configForRequest.options.method = 'POST';
        configForRequest.options.body = JSON.stringify(
            {
            name: `${settings.information.name}`,
            link: `${settings.information.link}`
        }
        );
        return(
            getDataOnRequestToServer({
                configForRequest: configForRequest,
                targetLink: 'cards',
            })
        );
        
    }




function updateProfileInformation(settings={
    information: {
        name: '', description: ''
    }}
    ) {

        const configForRequest = configTemplate;
        configForRequest.options.method = 'PATCH';
        configForRequest.options.body = JSON.stringify(
            {
            name: `${settings.information.name}`,
            about: `${settings.information.description}`
        }
        );
        return(
            getDataOnRequestToServer({
                configForRequest: configForRequest,
                targetLink: 'users/me',
            })
            .then(updatedUser => {
                userName.textContent = updatedUser.name;
                userAbout.textContent = updatedUser.about;

                userObject.name = updatedUser.name;
                userObject.description = updatedUser.about;
                userObject.avatar = updatedUser.avatar;
                userObject['_id'] = updatedUser['_id'];
                return updatedUser;
            })
            .catch(error => {
                return error;
            })
        );
}



function deleteCardFromServer(settings={
    idObj: null,
    cardElement: null,
    handlerObject: null,
    buttonSubmit: null,
}) {
    const configForRequest = configTemplate;
    configForRequest.options.method = 'DELETE';
    getDataOnRequestToServer({
        configForRequest: configForRequest,
        targetLink: `cards/${settings.idObj}`,
    })
    .then(data => {
        console.log('Карточка удалена');
        removeCard(settings.cardElement);
        closePopup({popup: settings.handlerObject.popup});
        settings.buttonSubmit.removeEventListener('click', settings.handlerObject);
    })
    .catch(error => {
        console.log('Карточка не удалена', error);
    })
    }

function updateAvatar(settings={link: ''}) {
    const configForRequest = configTemplate;
    configForRequest.options.method = 'PATCH';
    configForRequest.options.body = JSON.stringify(
        {
        avatar: `${settings.link}`,
    }
    );
    return(
        getDataOnRequestToServer({
            configForRequest: configForRequest,
            targetLink: 'users/me/avatar',
        })
    );
}

function getUser(settings={idUser: false, isMe: false}) {
    const configForRequest = configTemplate;
    if(settings.isMe) {
        return (
            getDataOnRequestToServer({
                configForRequest: configForRequest,
                targetLink: 'users/me',
            })
            .then(user => {
                    profileAvatar.src = user.avatar;
                    userName.textContent = user.name;
                    userAbout.textContent = user.about;
                    userObject.avatar = user.avatar;
                    userObject.name = user.name;
                    userObject.description = user.about;
                    userObject['_id'] = user['_id'];
                    return user;
                })
            .catch(error => {
                console.log(error);
                return error;
            })
        );
    }
  }

function getCards(settings={confirmDeleteCallback: null}) {           
    const configForRequest = configTemplate;
    return (
        getDataOnRequestToServer({
            configForRequest: configForRequest,
            targetLink: 'cards',
        })
        .then(arrayCards => {                    // Получаю массив карточек, которые нужно отрисовать и вызываю колбек ->
            arrayCards.forEach(card => {
                insertCardOnPage({card: card, confirmDeleteCallback: settings.confirmDeleteCallback});
            });
            return arrayCards;
        })
        .catch(error => {
            console.log(error);
            return error;
        })
    );
}

Promise.all([
    getUser({config: config, isMe: true}),
    getCards({confirmDeleteCallback: confirmDeleteCallback}),
])
    .then(arrayData => {
        buttonAddCard.addEventListener('click', () => {
            openPopup({popup: popupAddCard});
            formAddCard.reset();
            checkValidityOfFields(formAddCard, validationSettings);
            toggleButtonSubmitState(formAddCard, validationSettings);
            if(firstClickAddCard) {
                addEventForClosePopup({popup: popupAddCard});
                addEventSubmitForForm({
                    popup: popupAddCard,
                    formElement: formAddCard, 
                    handlers: addCardOnPage, 
                    buttonSubmit: buttonSubmitFormAddCard,
                });
                firstClickAddCard = false;
            }
        });
        
        
        buttonEditProfile.addEventListener('click', () => {
            openPopup({popup: popupEditProfile});
            fillInitialValuesFields(formEditProfile);
            checkValidityOfFields(formEditProfile, validationSettings);
            toggleButtonSubmitState(formEditProfile, validationSettings);
            if(firstClickEditProfile) {
                addEventForClosePopup({popup: popupEditProfile});
                addEventSubmitForForm({
                    popup: popupEditProfile,
                    formElement: formEditProfile, 
                    handlers: handleProfileEditFormSubmit, 
                    buttonSubmit: buttonSubmitFormEditProfile,
                })
                firstClickEditProfile = false;
            }
        });
        
        buttonEditAvatar.addEventListener('click', () => {
            openPopup({popup: popupEditAvatar});
            formEditAvatar.reset();
            checkValidityOfFields(formEditAvatar, validationSettings);
            toggleButtonSubmitState(formEditAvatar, validationSettings);
            if(firstClickEditAvatar) {
                addEventForClosePopup({popup: popupEditAvatar});
                addEventSubmitForForm({
                    popup: popupEditAvatar,
                    formElement: formEditAvatar, 
                    handlers: handleEditAvatarFormSubmit, 
                    buttonSubmit: buttonSubmitFormEditAvatar,
                })
                firstClickEditAvatar = false;
            }
        });
        
        
        enableValidationAllForms(validationSettings);

        console.log('Все нормально загрузилось');
    })
    .catch(errorArray => {
        console.log('Ошибка загрузки', errorArray);
    })







