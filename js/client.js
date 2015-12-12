(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint esnext: true */
'use strict';

var _loadImage = require('./loadImage.js');

var _loadImage2 = _interopRequireDefault(_loadImage);

var _mosaic = require('./../../js/mosaic.js');

var _mosaic2 = _interopRequireDefault(_mosaic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addImg = function addImg(src) {
  var element = document.getElementById("mosaic");
  var img = document.createElement("img");
  img.src = src;
  element.appendChild(img);
};

Promise.all([(0, _loadImage2.default)('https://i.imgur.com/Go8XrPg.jpg'), (0, _loadImage2.default)('https://i.imgur.com/Go8XrPg.jpg'), (0, _loadImage2.default)('https://i.imgur.com/Go8XrPg.jpg'), (0, _loadImage2.default)('https://i.imgur.com/Go8XrPg.jpg')]).then(function (images) {
  images.forEach(function (img) {
    return addImg(img.src);
  });
}).catch(function (error) {
  console.log("%c Failed to load image! ", "color: red;", error);
});
_mosaic2.default.TILE_WIDTH;
console.log(_mosaic2.default.TILE_WIDTH);

},{"./../../js/mosaic.js":3,"./loadImage.js":2}],2:[function(require,module,exports){
/* jshint esnext: true */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function loadImage(url) {
  return new Promise(function (resolve, reject) {
    var image = new Image();

    image.onload = function () {
      resolve(image);
    };

    image.onerror = function () {
      var message = 'Could not load image at ' + url;
      reject(new Error(message));
    };

    image.src = url;
  });
}
exports.default = loadImage;

},{}],3:[function(require,module,exports){
"use strict";

// Constants shared between client and server.

var TILE_WIDTH = 16;
var TILE_HEIGHT = 16;

var _exports = _exports || null;
if (_exports) {
  _exports.TILE_WIDTH = TILE_WIDTH;
  _exports.TILE_HEIGHT = TILE_HEIGHT;
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYXBwL2luZGV4LmpzIiwiZGV2L2FwcC9sb2FkSW1hZ2UuanMiLCJqcy9tb3NhaWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQ0EsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7QUFJYixJQUFJLE1BQU0sR0FBRyxTQUFULE1BQU0sQ0FBSSxHQUFHLEVBQUs7QUFDcEIsTUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxNQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLEtBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ2QsU0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUMxQixDQUFBOztBQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDVix5QkFBVSxpQ0FBaUMsQ0FBQyxFQUM1Qyx5QkFBVSxpQ0FBaUMsQ0FBQyxFQUM1Qyx5QkFBVSxpQ0FBaUMsQ0FBQyxFQUM1Qyx5QkFBVSxpQ0FBaUMsQ0FBQyxDQUM3QyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTSxFQUFLO0FBQ2xCLFFBQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1dBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7R0FBQSxDQUFDLENBQUE7Q0FDdkMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEtBQUssRUFBSztBQUNsQixTQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNoRSxDQUFDLENBQUE7QUFDRixpQkFBYyxVQUFVLENBQUE7QUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FDWCxpQkFBYyxVQUFVLENBQUMsQ0FBQTs7OztBQ3ZCekIsWUFBWSxDQUFDOzs7OztBQUdiLFNBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRTtBQUN0QixTQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUN0QyxRQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBOztBQUV2QixTQUFLLENBQUMsTUFBTSxHQUFHLFlBQVc7QUFDeEIsYUFBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ2YsQ0FBQTs7QUFFRCxTQUFLLENBQUMsT0FBTyxHQUFHLFlBQVc7QUFDekIsVUFBSSxPQUFPLEdBQ1QsMEJBQTBCLEdBQUcsR0FBRyxDQUFBO0FBQ2xDLFlBQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0tBQzNCLENBQUE7O0FBRUQsU0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7R0FFaEIsQ0FBQyxDQUFBO0NBQ0g7a0JBQ2MsU0FBUzs7Ozs7OztBQ3BCeEIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQzs7QUFFckIsSUFBSSxRQUFPLEdBQUcsUUFBTyxJQUFJLElBQUksQ0FBQztBQUM5QixJQUFJLFFBQU8sRUFBRTtBQUNYLFVBQU8sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQ2hDLFVBQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0NBQ25DIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGpzaGludCBlc25leHQ6IHRydWUgKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCBsb2FkSW1hZ2UgZnJvbSAnLi9sb2FkSW1hZ2UuanMnO1xuaW1wb3J0IHRpbGVEaW1lbnNpb24gZnJvbSAnLi8uLi8uLi9qcy9tb3NhaWMuanMnO1xuXG5sZXQgYWRkSW1nID0gKHNyYykgPT4ge1xuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9zYWljXCIpO1xuICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgaW1nLnNyYyA9IHNyYztcbiAgZWxlbWVudC5hcHBlbmRDaGlsZChpbWcpO1xufVxuXG5Qcm9taXNlLmFsbChbXG4gIGxvYWRJbWFnZSgnaHR0cHM6Ly9pLmltZ3VyLmNvbS9HbzhYclBnLmpwZycpLFxuICBsb2FkSW1hZ2UoJ2h0dHBzOi8vaS5pbWd1ci5jb20vR284WHJQZy5qcGcnKSxcbiAgbG9hZEltYWdlKCdodHRwczovL2kuaW1ndXIuY29tL0dvOFhyUGcuanBnJyksXG4gIGxvYWRJbWFnZSgnaHR0cHM6Ly9pLmltZ3VyLmNvbS9HbzhYclBnLmpwZycpXG5dKS50aGVuKChpbWFnZXMpID0+IHtcbiAgaW1hZ2VzLmZvckVhY2goaW1nID0+IGFkZEltZyhpbWcuc3JjKSlcbn0pLmNhdGNoKChlcnJvcikgPT4ge1xuICBjb25zb2xlLmxvZyhcIiVjIEZhaWxlZCB0byBsb2FkIGltYWdlISBcIiwgXCJjb2xvcjogcmVkO1wiLCBlcnJvcik7XG59KVxudGlsZURpbWVuc2lvbi5USUxFX1dJRFRIXG5jb25zb2xlLmxvZyhcbnRpbGVEaW1lbnNpb24uVElMRV9XSURUSClcbiIsIi8qIGpzaGludCBlc25leHQ6IHRydWUgKi9cbid1c2Ugc3RyaWN0JztcblxuXG5mdW5jdGlvbiBsb2FkSW1hZ2UodXJsKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IGltYWdlID0gbmV3IEltYWdlKClcblxuICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmVzb2x2ZShpbWFnZSlcbiAgICB9XG5cbiAgICBpbWFnZS5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICBsZXQgbWVzc2FnZSA9XG4gICAgICAgICdDb3VsZCBub3QgbG9hZCBpbWFnZSBhdCAnICsgdXJsXG4gICAgICByZWplY3QobmV3IEVycm9yKG1lc3NhZ2UpKVxuICAgIH1cblxuICAgIGltYWdlLnNyYyA9IHVybFxuXG4gIH0pXG59XG5leHBvcnQgZGVmYXVsdCBsb2FkSW1hZ2VcbiIsIi8vIENvbnN0YW50cyBzaGFyZWQgYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlci5cblxudmFyIFRJTEVfV0lEVEggPSAxNjtcbnZhciBUSUxFX0hFSUdIVCA9IDE2O1xuXG52YXIgZXhwb3J0cyA9IGV4cG9ydHMgfHwgbnVsbDtcbmlmIChleHBvcnRzKSB7XG4gIGV4cG9ydHMuVElMRV9XSURUSCA9IFRJTEVfV0lEVEg7XG4gIGV4cG9ydHMuVElMRV9IRUlHSFQgPSBUSUxFX0hFSUdIVDtcbn1cblxuIl19
