(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exports = {};

_exports.seperateColors = function (colorsArray) {
  var seperatedColors = {
    red: [],
    green: [],
    blue: [],
    alpha: []
  };
  var incrementColor = 0;
  colorsArray.forEach(function (color, key) {
    if (incrementColor === 0) {
      seperatedColors.red.push(color);
    }
    if (incrementColor === 1) {
      seperatedColors.green.push(color);
    }
    if (incrementColor === 2) {
      seperatedColors.blue.push(color);
    }
    if (incrementColor === 3) {
      seperatedColors.alpha.push(color);
    }

    if (incrementColor === 3) {
      incrementColor = 0;
    } else {
      incrementColor++;
    }
  });
  return seperatedColors;
};

_exports.getAverage = function (color) {
  var colorCount = color.reduce(function (result, currentValue) {
    return result += currentValue;
  }, 0);
  console.log(colorCount);
  return (colorCount / color.length).toFixed(0);
};

function numberToHex(n) {
  var hex = "0123456789ABCDEF";
  return String(hex.substr(n >> 4 & 0x0F, 1)) + hex.substr(n & 0x0F, 1);
}

_exports.convertToHex = function (r, g, b) {
  return numberToHex(r) + numberToHex(g) + numberToHex(b);
};

exports.default = _exports;

},{}],2:[function(require,module,exports){
/* jshint esnext: true */
'use strict';

var _loadImage = require('./loadImage.js');

var _loadImage2 = _interopRequireDefault(_loadImage);

var _mosaic = require('./../../js/mosaic.js');

var _mosaic2 = _interopRequireDefault(_mosaic);

var _uploadimage = require('./uploadimage.js');

var _uploadimage2 = _interopRequireDefault(_uploadimage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addImg = function addImg(src) {
  var element = document.getElementById("mosaic");
  var img = document.createElement("img");
  img.src = src;
  element.appendChild(img);
};

// dragndrop();

Promise.all([(0, _loadImage2.default)('color/ff0000'), (0, _loadImage2.default)('https://i.imgur.com/Go8XrPg.jpg')]).then(function (images) {
  images.forEach(function (img) {
    return addImg(img.src);
  });
}).catch(function (error) {
  console.log("%c Failed to load image! ", "color: red;", error);
});

(0, _uploadimage2.default)();

},{"./../../js/mosaic.js":5,"./loadImage.js":3,"./uploadimage.js":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
/* jshint esnext: true */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getAverageColor = require('./getAverageColor.js');

var _getAverageColor2 = _interopRequireDefault(_getAverageColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadimage = function uploadimage() {

  if (window.File && window.FileReader && window.FileList && window.Blob) {
    var handleFileSelect = function handleFileSelect(e) {
      var files = e.target.files; // FileList object

      // files is a FileList of File objects. List some properties.

      var f = files[0];

      var output = [];
      if (!f.type.match('image.*')) {
        output.length = 0;
      } else {
        output = ['<h2>', f.name, '</h2>'];
      }
      document.getElementById('list').innerHTML = output.join('');
      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function (theFile) {
        return function (e) {
          console.log(e);
          // Render thumbnail.
          var span = document.createElement('span');

          span.innerHTML = ['<img class="loadedImage" src="', e.target.result, '" title="', escape(theFile.name), '" style="width: 50%"/>'].join('');

          document.getElementById('list').insertBefore(span, null);

          var canvas = document.getElementById('myCanvas');
          var context = canvas.getContext('2d');
          var imageObj = new Image();

          imageObj.onload = function () {
            context.drawImage(imageObj, 0, 0);
            var imgData = context.getImageData(0, 0, 16, 16);

            var result = _getAverageColor2.default.seperateColors(imgData.data);

            var averageColors = {
              red: _getAverageColor2.default.getAverage(result['red']),
              green: _getAverageColor2.default.getAverage(result['green']),
              blue: _getAverageColor2.default.getAverage(result['blue']),
              alpha: _getAverageColor2.default.getAverage(result['alpha'])
            };
            var tileAverageColor = _getAverageColor2.default.convertToHex(averageColors.red, averageColors.green, averageColors.blue);
          };

          imageObj.src = e.target.result;
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    };

    document.getElementById('upload-input').addEventListener('change', handleFileSelect, false);
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }
};
exports.default = uploadimage;

},{"./getAverageColor.js":1}],5:[function(require,module,exports){
"use strict";

// Constants shared between client and server.

var TILE_WIDTH = 16;
var TILE_HEIGHT = 16;

var _exports = _exports || null;
if (_exports) {
  _exports.TILE_WIDTH = TILE_WIDTH;
  _exports.TILE_HEIGHT = TILE_HEIGHT;
}

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYXBwL2dldEF2ZXJhZ2VDb2xvci5qcyIsImRldi9hcHAvaW5kZXguanMiLCJkZXYvYXBwL2xvYWRJbWFnZS5qcyIsImRldi9hcHAvdXBsb2FkaW1hZ2UuanMiLCJqcy9tb3NhaWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUE7Ozs7O0FBRVosSUFBSSxRQUFPLEdBQUcsRUFBRSxDQUFDOztBQUVqQixRQUFPLENBQUMsY0FBYyxHQUFHLFVBQUMsV0FBVyxFQUFLO0FBQ3hDLE1BQUksZUFBZSxHQUFHO0FBQ3BCLE9BQUcsRUFBRSxFQUFFO0FBQ1AsU0FBSyxFQUFFLEVBQUU7QUFDVCxRQUFJLEVBQUUsRUFBRTtBQUNSLFNBQUssRUFBRSxFQUFFO0dBQ1YsQ0FBQztBQUNGLE1BQUksY0FBYyxHQUFHLENBQUMsQ0FBQztBQUN2QixhQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBSztBQUNsQyxRQUFJLGNBQWMsS0FBSyxDQUFDLEVBQUU7QUFDeEIscUJBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDO0FBQ0QsUUFBSSxjQUFjLEtBQUssQ0FBQyxFQUFFO0FBQ3hCLHFCQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNuQztBQUNELFFBQUksY0FBYyxLQUFLLENBQUMsRUFBRTtBQUN4QixxQkFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEM7QUFDRCxRQUFJLGNBQWMsS0FBSyxDQUFDLEVBQUU7QUFDeEIscUJBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ25DOztBQUVELFFBQUksY0FBYyxLQUFLLENBQUMsRUFBRTtBQUN4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RUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztXQUU1RyxDQUFDOztBQUVGLGtCQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2hDLENBQUM7T0FDSCxDQUFBLENBQUUsQ0FBQyxDQUFDOzs7QUFBQyxBQUdOLFlBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0I7O0FBRUQsWUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FDN0YsTUFBTTtBQUNMLFNBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO0dBQ2pFO0NBQ0YsQ0FBQTtrQkFDYyxXQUFXOzs7Ozs7O0FDM0UxQixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDcEIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDOztBQUVyQixJQUFJLFFBQU8sR0FBRyxRQUFPLElBQUksSUFBSSxDQUFDO0FBQzlCLElBQUksUUFBTyxFQUFFO0FBQ1gsVUFBTyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDaEMsVUFBTyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7Q0FDbkMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCBleHBvcnRzID0ge307XG5cbmV4cG9ydHMuc2VwZXJhdGVDb2xvcnMgPSAoY29sb3JzQXJyYXkpID0+IHtcbiAgbGV0IHNlcGVyYXRlZENvbG9ycyA9IHtcbiAgICByZWQ6IFtdLFxuICAgIGdyZWVuOiBbXSxcbiAgICBibHVlOiBbXSxcbiAgICBhbHBoYTogW11cbiAgfTtcbiAgbGV0IGluY3JlbWVudENvbG9yID0gMDtcbiAgY29sb3JzQXJyYXkuZm9yRWFjaCgoY29sb3IsIGtleSkgPT4ge1xuICAgIGlmIChpbmNyZW1lbnRDb2xvciA9PT0gMCkge1xuICAgICAgc2VwZXJhdGVkQ29sb3JzLnJlZC5wdXNoKGNvbG9yKTtcbiAgICB9XG4gICAgaWYgKGluY3JlbWVudENvbG9yID09PSAxKSB7XG4gICAgICBzZXBlcmF0ZWRDb2xvcnMuZ3JlZW4ucHVzaChjb2xvcik7XG4gICAgfVxuICAgIGlmIChpbmNyZW1lbnRDb2xvciA9PT0gMikge1xuICAgICAgc2VwZXJhdGVkQ29sb3JzLmJsdWUucHVzaChjb2xvcik7XG4gICAgfVxuICAgIGlmIChpbmNyZW1lbnRDb2xvciA9PT0gMykge1xuICAgICAgc2VwZXJhdGVkQ29sb3JzLmFscGhhLnB1c2goY29sb3IpO1xuICAgIH1cblxuICAgIGlmIChpbmNyZW1lbnRDb2xvciA9PT0gMykge1xuICAgICAgaW5jcmVtZW50Q29sb3IgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmNyZW1lbnRDb2xvcisrO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBzZXBlcmF0ZWRDb2xvcnM7XG59XG5cbmV4cG9ydHMuZ2V0QXZlcmFnZSA9IChjb2xvcikgPT4ge1xuXHRsZXQgY29sb3JDb3VudCA9IGNvbG9yLnJlZHVjZSgocmVzdWx0LCBjdXJyZW50VmFsdWUpID0+IHtcbiAgICByZXR1cm4gcmVzdWx0ICs9IGN1cnJlbnRWYWx1ZTtcbiAgfSwgMCk7XG4gIGNvbnNvbGUubG9nKGNvbG9yQ291bnQpO1xuICByZXR1cm4gKGNvbG9yQ291bnQgLyBjb2xvci5sZW5ndGgpLnRvRml4ZWQoMCk7XG59XG5cbmZ1bmN0aW9uIG51bWJlclRvSGV4KG4pIHtcbiAgY29uc3QgaGV4ID0gXCIwMTIzNDU2Nzg5QUJDREVGXCI7XG4gIHJldHVybiBTdHJpbmcoaGV4LnN1YnN0cigobiA+PiA0KSAmIDB4MEYsMSkpICsgaGV4LnN1YnN0cihuICYgMHgwRiwxKTtcbn1cblxuZXhwb3J0cy5jb252ZXJ0VG9IZXggPSAocixnLGIpID0+IHtcbiAgcmV0dXJuIG51bWJlclRvSGV4KHIpICsgbnVtYmVyVG9IZXgoZykgKyBudW1iZXJUb0hleChiKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0cztcbiIsIi8qIGpzaGludCBlc25leHQ6IHRydWUgKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCBsb2FkSW1hZ2UgZnJvbSAnLi9sb2FkSW1hZ2UuanMnO1xuaW1wb3J0IHRpbGVEaW1lbnNpb24gZnJvbSAnLi8uLi8uLi9qcy9tb3NhaWMuanMnO1xuaW1wb3J0IHVwbG9hZGltYWdlIGZyb20gJy4vdXBsb2FkaW1hZ2UuanMnXG5cbmxldCBhZGRJbWcgPSAoc3JjKSA9PiB7XG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3NhaWNcIik7XG4gIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICBpbWcuc3JjID0gc3JjO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKGltZyk7XG59XG5cbi8vIGRyYWduZHJvcCgpO1xuXG5Qcm9taXNlLmFsbChbXG4gIGxvYWRJbWFnZSgnY29sb3IvZmYwMDAwJyksXG4gIGxvYWRJbWFnZSgnaHR0cHM6Ly9pLmltZ3VyLmNvbS9HbzhYclBnLmpwZycpXG5dKS50aGVuKChpbWFnZXMpID0+IHtcbiAgaW1hZ2VzLmZvckVhY2goaW1nID0+IGFkZEltZyhpbWcuc3JjKSlcbn0pLmNhdGNoKChlcnJvcikgPT4ge1xuICBjb25zb2xlLmxvZyhcIiVjIEZhaWxlZCB0byBsb2FkIGltYWdlISBcIiwgXCJjb2xvcjogcmVkO1wiLCBlcnJvcik7XG59KVxuXG51cGxvYWRpbWFnZSgpO1xuIiwiLyoganNoaW50IGVzbmV4dDogdHJ1ZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBsb2FkSW1hZ2UodXJsKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IGltYWdlID0gbmV3IEltYWdlKCk7XG5cbiAgICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJlc29sdmUoaW1hZ2UpXG4gICAgfTtcblxuICAgIGltYWdlLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIGxldCBtZXNzYWdlID0gJ0NvdWxkIG5vdCBsb2FkIGltYWdlIGF0ICcgKyB1cmw7XG4gICAgICByZWplY3QobmV3IEVycm9yKG1lc3NhZ2UpKTtcbiAgICB9O1xuXG4gICAgaW1hZ2Uuc3JjID0gdXJsO1xuXG4gIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgbG9hZEltYWdlO1xuIiwiLyoganNoaW50IGVzbmV4dDogdHJ1ZSAqL1xuJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBmaW5kQ29sb3JzIGZyb20gJy4vZ2V0QXZlcmFnZUNvbG9yLmpzJ1xuXG5sZXQgdXBsb2FkaW1hZ2UgPSAoKSA9PiB7XG5cbiAgaWYgKHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYikge1xuICAgIGZ1bmN0aW9uIGhhbmRsZUZpbGVTZWxlY3QoZSkge1xuICAgICAgbGV0IGZpbGVzID0gZS50YXJnZXQuZmlsZXM7IC8vIEZpbGVMaXN0IG9iamVjdFxuXG4gICAgICAvLyBmaWxlcyBpcyBhIEZpbGVMaXN0IG9mIEZpbGUgb2JqZWN0cy4gTGlzdCBzb21lIHByb3BlcnRpZXMuXG5cbiAgICAgIGxldCBmID0gZmlsZXNbMF07XG5cbiAgICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICAgIGlmICghZi50eXBlLm1hdGNoKCdpbWFnZS4qJykpIHtcbiAgICAgICAgb3V0cHV0Lmxlbmd0aCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXRwdXQgPSBbXG4gICAgICAgICAgJzxoMj4nLFxuICAgICAgICAgIGYubmFtZSxcbiAgICAgICAgICAnPC9oMj4nXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0JykuaW5uZXJIVE1MID0gb3V0cHV0LmpvaW4oJycpO1xuICAgICAgbGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgLy8gQ2xvc3VyZSB0byBjYXB0dXJlIHRoZSBmaWxlIGluZm9ybWF0aW9uLlxuICAgICAgICByZWFkZXIub25sb2FkID0gKGZ1bmN0aW9uKHRoZUZpbGUpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAvLyBSZW5kZXIgdGh1bWJuYWlsLlxuICAgICAgICAgICAgbGV0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gW1xuICAgICAgICAgICAgICAnPGltZyBjbGFzcz1cImxvYWRlZEltYWdlXCIgc3JjPVwiJyxcbiAgICAgICAgICAgICAgZS50YXJnZXQucmVzdWx0LFxuICAgICAgICAgICAgICAnXCIgdGl0bGU9XCInLFxuICAgICAgICAgICAgICBlc2NhcGUodGhlRmlsZS5uYW1lKSxcbiAgICAgICAgICAgICAgJ1wiIHN0eWxlPVwid2lkdGg6IDUwJVwiLz4nXS5qb2luKCcnKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3QnKS5pbnNlcnRCZWZvcmUoc3BhbiwgbnVsbCk7XG5cbiAgICAgICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlDYW52YXMnKTtcbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICBsZXQgaW1hZ2VPYmogPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICAgICAgaW1hZ2VPYmoub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlT2JqLCAwLCAwKTtcbiAgICAgICAgICAgICAgdmFyIGltZ0RhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCAxNiwgMTYpO1xuXG4gICAgICAgICAgICAgIGxldCByZXN1bHQgPSBmaW5kQ29sb3JzLnNlcGVyYXRlQ29sb3JzKGltZ0RhdGEuZGF0YSk7XG5cbiAgICAgICAgICAgICAgbGV0IGF2ZXJhZ2VDb2xvcnMgPSB7XG4gICAgICAgICAgICAgICAgcmVkOiBmaW5kQ29sb3JzLmdldEF2ZXJhZ2UocmVzdWx0WydyZWQnXSksXG4gICAgICAgICAgICAgICAgZ3JlZW46IGZpbmRDb2xvcnMuZ2V0QXZlcmFnZShyZXN1bHRbJ2dyZWVuJ10pLFxuICAgICAgICAgICAgICAgIGJsdWU6IGZpbmRDb2xvcnMuZ2V0QXZlcmFnZShyZXN1bHRbJ2JsdWUnXSksXG4gICAgICAgICAgICAgICAgYWxwaGE6IGZpbmRDb2xvcnMuZ2V0QXZlcmFnZShyZXN1bHRbJ2FscGhhJ10pXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIGxldCB0aWxlQXZlcmFnZUNvbG9yID0gZmluZENvbG9ycy5jb252ZXJ0VG9IZXgoYXZlcmFnZUNvbG9ycy5yZWQsIGF2ZXJhZ2VDb2xvcnMuZ3JlZW4sIGF2ZXJhZ2VDb2xvcnMuYmx1ZSk7XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGltYWdlT2JqLnNyYyA9IGUudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICB9O1xuICAgICAgICB9KShmKTtcblxuICAgICAgICAvLyBSZWFkIGluIHRoZSBpbWFnZSBmaWxlIGFzIGEgZGF0YSBVUkwuXG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGYpO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGxvYWQtaW5wdXQnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBoYW5kbGVGaWxlU2VsZWN0LCBmYWxzZSk7XG4gIH0gZWxzZSB7XG4gICAgYWxlcnQoJ1RoZSBGaWxlIEFQSXMgYXJlIG5vdCBmdWxseSBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyLicpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCB1cGxvYWRpbWFnZVxuIiwiLy8gQ29uc3RhbnRzIHNoYXJlZCBiZXR3ZWVuIGNsaWVudCBhbmQgc2VydmVyLlxuXG52YXIgVElMRV9XSURUSCA9IDE2O1xudmFyIFRJTEVfSEVJR0hUID0gMTY7XG5cbnZhciBleHBvcnRzID0gZXhwb3J0cyB8fCBudWxsO1xuaWYgKGV4cG9ydHMpIHtcbiAgZXhwb3J0cy5USUxFX1dJRFRIID0gVElMRV9XSURUSDtcbiAgZXhwb3J0cy5USUxFX0hFSUdIVCA9IFRJTEVfSEVJR0hUO1xufVxuIl19
