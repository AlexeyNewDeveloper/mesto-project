(()=>{"use strict";var e=document.querySelector(".profile-section__avatar"),t=document.querySelector(".profile-section__name"),n=document.querySelector(".profile-section__text"),o={formAddCard:function(e){e.preventDefault();var t=e.target.closest(".popup"),n=t.querySelectorAll(".form__input-text")[1],o=t.querySelectorAll(".form__input-text")[0],r=e.target.querySelector(".form__save"),c=r.textContent;r.textContent="Сохранение...",setTimeout((function(){(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{information:{name:"",link:""}},t=f;return t.options.method="POST",t.options.body=JSON.stringify({name:"".concat(e.information.name),link:"".concat(e.information.link)}),m({configForRequest:t,targetLink:"cards"})})({information:{name:o.value,link:n.value}}).then((function(e){e&&D(R(e),i)})),C(t),r.textContent=c}),1)},formEditPofile:function(e){e.preventDefault();var t=e.currentTarget.closest(".popup"),n=e.target.querySelector(".form__save"),o=n.textContent;n.textContent="Сохранение...",setTimeout((function(){j(e.target,!0),C(t),n.textContent=o}),1)},formEditAvatar:function(e){e.preventDefault();var t=e.target.closest(".popup"),n=document.querySelector(".profile-section__avatar"),o=t.querySelector(".form__input-text"),r=e.target.querySelector(".form__save"),i=r.textContent;r.textContent="Сохранение...",setTimeout((function(){(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{link:""},t=f;return t.options.method="PATCH",t.options.body=JSON.stringify({avatar:"".concat(e.link)}),m({configForRequest:t,targetLink:"users/me/avatar"})})({link:o.value}).then((function(e){e&&(n.src=e.avatar)})),C(t),r.textContent=i}),1)},formConfirmDelete:function(e){var t,n;e.preventDefault(),this.cardElement.remove(),t=this.cardObject.cardId,(n=f).options.method="DELETE",m({configForRequest:n,targetLink:"cards/".concat(t)}),e.target.removeEventListener("submit",this),C(this.popup)}},r={name:"",description:"",avatar:"",_id:""},i=document.querySelector(".photo-grid__items"),c=document.querySelector("#openImage"),a={formSelector:".form",inputSelector:".form__input-text",submitButtonSelector:".form__save",inputErrorClass:"form__input-text_invalid",errorId:null,errorClassActive:"form__title-error_active",set setErrorId(e){this.errorId="#".concat(e,"-error")}};function l(e,t){return document.querySelector(e).content.querySelector(t).cloneNode(!0)}function s(e,t){return!!e.querySelector(t.inputSelector)&&Array.from(e.querySelectorAll(t.inputSelector))}function u(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status," - ").concat(e.statusText))}function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{config:{baseUrl:null,cohortId:null},options:{}},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(e.config.baseUrl&&e.config.cohortId&&e.options.headers.authorization)return fetch("".concat(e.config.baseUrl,"/").concat(e.config.cohortId,"/").concat(t),e.options);console.log("Не хватает свойств, переданных функции.")}function m(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{configForRequest:{},targetLink:""};return d(e.configForRequest,e.targetLink).then(u).then((function(e){return e})).catch((function(e){return console.log(e),!1}))}var p={baseUrl:"https://mesto.nomoreparties.co/v1",cohortId:"plus-cohort-13",headers:{authorization:"e4d16501-e8d2-438e-96b5-6b9c94c85c98","Content-Type":"application/json"}},f={config:{baseUrl:p.baseUrl,cohortId:p.cohortId},options:{headers:p.headers}};function v(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{information:{name:"",description:""}},t=f;return t.options.method="PATCH",t.options.body=JSON.stringify({name:"".concat(e.information.name),about:"".concat(e.information.description)}),m({configForRequest:t,targetLink:"users/me"})}function g(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{cardObject:{},deleteLike:!1},t=f;return e.deleteLike?t.options.method="DELETE":t.options.method="PUT",m({configForRequest:t,targetLink:"cards/likes/".concat(e.cardObject.cardId)})}function _(e,t){var n=e.querySelector(t.submitButtonSelector);!function(e,t){return s(e,t).some((function(e){return!e.validity.valid}))}(e,t)?n.disabled=!1:n.disabled=!0}function h(e,t,n){t.validity.valid?function(e,t,n){n.setErrorId=t.id;var o=e.querySelector(n.errorId);t.classList.remove(n.inputErrorClass),o.textContent="",o.classList.remove(n.errorClassActive)}(e,t,n):function(e,t,n,o){o.setErrorId=t.id;var r=e.querySelector(o.errorId);t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClassActive)}(e,t,t.validationMessage,n)}function E(e,t){var n=s(e,t);n&&n.forEach((function(n){n.value.length>0&&h(e,n,t)}))}function S(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{popup:null,removeListener:!1},t=e.popup.querySelector(".popup__close"),n={handleEvent:y,popup:e.popup};e.removeListener?t.removeEventListener("click",n):t.addEventListener("click",n)}function y(e){C(this.popup)}function L(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{popup:null,removeListener:!1};e.removeListener?e.popup.removeEventListener("click",k):e.popup.addEventListener("click",k)}function k(e){e.target.closest(".popup__container")||C(e.currentTarget)}function q(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{removeListener:!1};e.removeListener?document.removeEventListener("keydown",b):document.addEventListener("keydown",b)}function b(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");t&&C(t)}}function C(e){var t=e.querySelector(".form");e.classList.remove("popup_opened"),x({popup:e,removeListeners:!0}),t&&function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{formElement:null,formsAndHandlers:null};e.formElement.removeEventListener("submit",e.formsAndHandlers[e.formElement.id])}({formElement:t,formsAndHandlers:o})}function x(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{popup:null,removeListeners:!1};e.removeListeners?(S({popup:e.popup,removeListener:!0}),L({popup:e.popup,removeListener:!0}),q({removeListener:!0})):(S({popup:e.popup}),L({popup:e.popup}),q())}function I(e,t,n,o){var r=t.querySelector(".popup__image"),i=t.querySelector(".popup__image-caption");n.addEventListener(e,(function(){O({popup:t,options:{justOpen:!0}}),r.src=n.src,r.alt=n.alt,i.textContent=o.textContent}))}function O(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{popup:null,formElement:null,cardElement:null,cardObject:null,options:{validationSettings:null,needReset:!1,justOpen:null}};e.popup.classList.add("popup_opened"),x({popup:e.popup}),e.options&&e.options.justOpen||(e.options&&e.options.needReset&&e.formElement.reset(),"formEditPofile"===e.formElement.id&&j(e.formElement),A({popup:e.popup,formElement:e.formElement,formsAndHandlers:o,cardElement:e.cardElement,cardObject:e.cardObject}),e.options&&e.options.validationSettings&&(E(e.formElement,e.options.validationSettings),_(e.formElement,e.options.validationSettings)))}function A(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{popup:null,formElement:null,formsAndHandlers:null,cardElement:null,cardObject:null,removeListener:!1};e.formElement.id in e.formsAndHandlers&&("formConfirmDelete"===e.formElement.id?e.formElement.addEventListener("submit",{handleEvent:e.formsAndHandlers[e.formElement.id],cardElement:e.cardElement,cardObject:e.cardObject,popup:e.popup}):e.formElement.addEventListener("submit",e.formsAndHandlers[e.formElement.id]))}function j(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=document.querySelector(".profile-section__name"),o=document.querySelector(".profile-section__text");t?v({information:{name:e.elements.name.value,description:e.elements.description.value}}).then((function(e){e&&(n.textContent=e.name,o.textContent=e.value,r.name=e.name,r.description=e.about,r.avatar=e.avatar,r._id=e._id)})):(e.elements.name.value=n.textContent,e.elements.description.value=o.textContent)}function D(e,t){t.prepend(e.cardItem)}function R(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{template:"#photo-grid__item",node:".photo-grid__element-container",classOfImage:".photo-grid__image",classOfName:".photo-grid__name",classOfLike:".photo-grid__like-icon",classOfDelete:".photo-grid__delete",classOfLikes:".photo-grid__likes"},n=l(t.template,t.node),o=n.querySelector(t.classOfImage),i=n.querySelector(t.classOfName),a=n.querySelector(t.classOfLike),s=n.querySelector(t.classOfDelete),u=n.querySelector(t.classOfLikes),d={cardItem:n,cardImg:o,cardName:i,likeButton:a,buttonDelete:s,likes:u,ownerId:"",cardId:""};return d.cardImg.src=e.link,d.cardImg.alt=e.name,d.cardName.textContent=e.name,d.likes.textContent=e.likes.length,d.ownerId=e.owner._id,d.cardId=e._id,d.ownerId===r._id&&(d.buttonDelete.classList.add("photo-grid__delete_active"),T("click",d,".photo-grid__element-container")),H("click",d,"photo-grid__like-icon_active"),I("click",c,d.cardImg,d.cardName),d}function T(e,t,n){t.buttonDelete.addEventListener(e,(function(e){var o,r,i,c;o=e.target.closest(n),r=t,i=document.querySelector("#confirmDelete"),c=i.querySelector("#formConfirmDelete"),O({popup:i,formElement:c,cardElement:o,cardObject:r})}))}function H(e,t,n){t.likeButton.addEventListener(e,(function(){t.likeButton.classList.toggle(n),t.likeButton.classList.contains(n)?g({cardObject:t}).then((function(e){e&&(t.likes.textContent=e.likes.length)})):g({cardObject:t,deleteLike:!0}).then((function(e){e&&(t.likes.textContent=e.likes.length)}))}))}function P(e){var t;(t=R(e),new Promise((function(e,n){var o=document.createElement("img");o.src=t.cardImg.src,o.onerror=function(){n(t)},o.onload=function(){e(t)}}))).then((function(e){D(e,i)})).catch((function(e){console.log("Картинка не загрузилась. ".concat(e.cardImg.src))}))}var F=document.querySelector("#addCard"),N=document.querySelector("#editProfile"),U=document.querySelector("#editAvatar"),w=F.querySelector("#formAddCard"),B=N.querySelector("#formEditPofile"),M=U.querySelector("#formEditAvatar"),J=document.querySelector(".profile-section__add"),z=document.querySelector(".profile-section__edit"),G=document.querySelector(".profile-section__edit-avatar"),K=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{idUser:!1,isMe:!1},t=f;if(e.isMe)return m({configForRequest:t,targetLink:"users/me"})}({config:p,isMe:!0}),Q=m({configForRequest:f,targetLink:"cards"});K.then((function(o){o&&(e.src=o.avatar,t.textContent=o.name,n.textContent=o.about,r.avatar=o.avatar,r.name=o.name,r.description=o.about,r._id=o._id)})),Q.then((function(e){e&&e.forEach(P)})),J.addEventListener("click",(function(){O({popup:F,formElement:w,options:{needReset:!0,validationSettings:a}})})),z.addEventListener("click",(function(){O({popup:N,formElement:B,options:{validationSettings:a}})})),G.addEventListener("click",(function(){O({popup:U,formElement:M,options:{needReset:!0,validationSettings:a}})})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=s(e,t);n&&n.forEach((function(n){n.addEventListener("input",(function(){_(e,t),h(e,n,t)}))}))}(t,e)}))}(a)})();