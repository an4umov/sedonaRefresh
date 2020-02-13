'use strict';


(function () {
  var ResponseCode = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    ENTERNAL_ERROR: 500
  };


  var createXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case ResponseCode.SUCCESS:
          onLoad(xhr.response);
          break;
        case ResponseCode.BAD_REQUEST:
          onError('Invalid server request.');
          break;
        case ResponseCode.NOT_FOUND:
          onError('The requested resource was not found on the server.');
          break;
        case ResponseCode.ENTERNAL_ERROR:
          onError('An internal server error has occurred.');
          break;
        default:
          onError('Server response code: ' + xhr.status + ' ' + xhr.statusText + '.');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Server connection error.');
    });

    xhr.addEventListener('timeout', function () {
      onError('The request to the server did not succeed in the allotted time.');
    });

    return xhr;
  };


  var downloadData = function (url, onLoad, onError) {
    var xhr = createXHR(onLoad, onError);

    xhr.open('GET', url);
    xhr.send();
  };

  var uploadData = function (data, url, onLoad, onError) {
    var xhr = createXHR(onLoad, onError);

    xhr.open('POST', url);
    xhr.send(data);
  };


  window.backend = {
    download: downloadData,
    upload: uploadData
  };
})();
