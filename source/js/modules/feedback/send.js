'use strict';


(function () {
  var feedbackForm = document.querySelector('.feedback-form');


  if (feedbackForm) {
    var URL = 'https://echo.htmlacademy.ru';
    var RELOAD_TIMEOUT = 1000;

    var Popup = {
      SuccessLoad: {
        TITLE: 'Your review has been sent.!',
        TEXT: 'Thank you for your participation, your feedback has already arrived at us. We will take into account all your comments.!',
        BTN_TEXT: 'Ok'
      },
      ErrorLoad: {
        TITLE: 'Something went wrong!',
        TEXT: 'Sorry, your review was not sent.. ',
        BTN_TEXT: 'Try again'
      }
    };


    var feedbackBtn = feedbackForm.querySelector('.feedback-form__btn');

    var popupBtn = document.querySelector('.popup__btn');


    var onSuccessPopupBtnClick = function () {
      window.popup.close();

      popupBtn.removeEventListener('click', onSuccessPopupBtnClick);
    };

    var onErrorPopupBtnClick = function () {
      window.popup.close();

      setTimeout(function () {
        window.backend.upload(new FormData(feedbackForm), URL, sendForm, showError);
      }, RELOAD_TIMEOUT);

      popupBtn.removeEventListener('click', onErrorPopupBtnClick);
    };


    var sendForm = function () {
      feedbackBtn.disabled = false;
      window.popup.open(Popup.SuccessLoad.TITLE, Popup.SuccessLoad.TEXT, Popup.SuccessLoad.BTN_TEXT);
      feedbackForm.reset();

      popupBtn.addEventListener('click', onSuccessPopupBtnClick);
    };

    var showError = function (serverStatusText) {
      feedbackBtn.disabled = false;
      window.popup.open(Popup.ErrorLoad.TITLE, Popup.ErrorLoad.TEXT + serverStatusText, Popup.ErrorLoad.BTN_TEXT);

      popupBtn.addEventListener('click', onErrorPopupBtnClick);
    };


    var onFeedbackSubmit = function (evt) {
      evt.preventDefault();
      feedbackBtn.disabled = true;

      window.backend.upload(new FormData(feedbackForm), URL, sendForm, showError);
    };


    feedbackForm.addEventListener('submit', onFeedbackSubmit);
  }
})();
