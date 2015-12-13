(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

// Promise.all([
//   loadImage('https://i.imgur.com/Go8XrPg.jpg'),
//   loadImage('https://i.imgur.com/Go8XrPg.jpg')
// ]).then((images) => {
//   images.forEach(img => addImg(img.src))
// }).catch((error) => {
//   console.log("%c Failed to load image! ", "color: red;", error);
// })

(0, _uploadimage2.default)();

},{"./../../js/mosaic.js":4,"./loadImage.js":2,"./uploadimage.js":3}],2:[function(require,module,exports){
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
/* jshint esnext: true */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="loadedImage" src="', e.target.result, '" title="', escape(theFile.name), '" style="width: 50%"/>'].join('');

          document.getElementById('list').insertBefore(span, null);
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

},{}],4:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYXBwL2luZGV4LmpzIiwiZGV2L2FwcC9sb2FkSW1hZ2UuanMiLCJkZXYvYXBwL3VwbG9hZGltYWdlLmpzIiwianMvbW9zYWljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0NBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQUtiLElBQUksTUFBTSxHQUFHLFNBQVQsTUFBTSxDQUFJLEdBQUcsRUFBSztBQUNwQixNQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hELE1BQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEMsS0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDZCxTQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQzFCOzs7Ozs7Ozs7Ozs7O0FBQUEsQUFhRCw0QkFBYSxDQUFDOzs7O0FDdkJkLFlBQVksQ0FBQzs7Ozs7QUFFYixTQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUU7QUFDdEIsU0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7QUFDdEMsUUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQzs7QUFFeEIsU0FBSyxDQUFDLE1BQU0sR0FBRyxZQUFXO0FBQ3hCLGFBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUNmLENBQUM7O0FBRUYsU0FBSyxDQUFDLE9BQU8sR0FBRyxZQUFXO0FBQ3pCLFVBQUksT0FBTyxHQUFHLDBCQUEwQixHQUFHLEdBQUcsQ0FBQztBQUMvQyxZQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUM1QixDQUFDOztBQUVGLFNBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0dBRWpCLENBQUMsQ0FBQztDQUNKO2tCQUNjLFNBQVM7Ozs7QUNuQnhCLFlBQVksQ0FBQTs7Ozs7QUFDWixJQUFJLFdBQVcsR0FBRyxTQUFkLFdBQVcsR0FBUzs7QUFFdEIsTUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQzdELGdCQUFnQixHQUF6QixTQUFTLGdCQUFnQixDQUFDLENBQUMsRUFBRTtBQUMzQixVQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7Ozs7QUFBQyxBQUkzQixVQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRWpCLFVBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNoQixVQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7QUFDNUIsY0FBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7T0FDbkIsTUFBTTtBQUNMLGNBQU0sR0FBRyxDQUNQLE1BQU0sRUFDTixDQUFDLENBQUMsSUFBSSxFQUNOLE9BQU8sQ0FDUixDQUFBO09BQ0Y7QUFDRCxjQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzVELFVBQUksTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFOzs7QUFBQyxBQUc1QixZQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsVUFBUyxPQUFPLEVBQUU7QUFDakMsZUFBTyxVQUFTLENBQUMsRUFBRTs7QUFFakIsY0FBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQyxjQUFJLENBQUMsU0FBUyxHQUFHLENBQ2YsZ0NBQWdDLEVBQ2hDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUNmLFdBQVcsRUFDWCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUNwQix3QkFBd0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzs7QUFFckMsa0JBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMxRCxDQUFDO09BQ0gsQ0FBQSxDQUFFLENBQUMsQ0FBQzs7O0FBQUMsQUFHTixZQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzNCOztBQUVELFlBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO0dBQzdGLE1BQU07QUFDTCxTQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztHQUNqRTtDQUNGLENBQUE7a0JBQ2MsV0FBVzs7Ozs7OztBQ2hEMUIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQzs7QUFFckIsSUFBSSxRQUFPLEdBQUcsUUFBTyxJQUFJLElBQUksQ0FBQztBQUM5QixJQUFJLFFBQU8sRUFBRTtBQUNYLFVBQU8sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQ2hDLFVBQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0NBQ25DIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGpzaGludCBlc25leHQ6IHRydWUgKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCBsb2FkSW1hZ2UgZnJvbSAnLi9sb2FkSW1hZ2UuanMnO1xuaW1wb3J0IHRpbGVEaW1lbnNpb24gZnJvbSAnLi8uLi8uLi9qcy9tb3NhaWMuanMnO1xuaW1wb3J0IHVwbG9hZGltYWdlIGZyb20gJy4vdXBsb2FkaW1hZ2UuanMnXG5cbmxldCBhZGRJbWcgPSAoc3JjKSA9PiB7XG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3NhaWNcIik7XG4gIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICBpbWcuc3JjID0gc3JjO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKGltZyk7XG59XG5cbi8vIGRyYWduZHJvcCgpO1xuXG4vLyBQcm9taXNlLmFsbChbXG4vLyAgIGxvYWRJbWFnZSgnaHR0cHM6Ly9pLmltZ3VyLmNvbS9HbzhYclBnLmpwZycpLFxuLy8gICBsb2FkSW1hZ2UoJ2h0dHBzOi8vaS5pbWd1ci5jb20vR284WHJQZy5qcGcnKVxuLy8gXSkudGhlbigoaW1hZ2VzKSA9PiB7XG4vLyAgIGltYWdlcy5mb3JFYWNoKGltZyA9PiBhZGRJbWcoaW1nLnNyYykpXG4vLyB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbi8vICAgY29uc29sZS5sb2coXCIlYyBGYWlsZWQgdG8gbG9hZCBpbWFnZSEgXCIsIFwiY29sb3I6IHJlZDtcIiwgZXJyb3IpO1xuLy8gfSlcblxudXBsb2FkaW1hZ2UoKTtcbiIsIi8qIGpzaGludCBlc25leHQ6IHRydWUgKi9cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbG9hZEltYWdlKHVybCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuXG4gICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXNvbHZlKGltYWdlKVxuICAgIH07XG5cbiAgICBpbWFnZS5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICBsZXQgbWVzc2FnZSA9ICdDb3VsZCBub3QgbG9hZCBpbWFnZSBhdCAnICsgdXJsO1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcihtZXNzYWdlKSk7XG4gICAgfTtcblxuICAgIGltYWdlLnNyYyA9IHVybDtcblxuICB9KTtcbn1cbmV4cG9ydCBkZWZhdWx0IGxvYWRJbWFnZTtcbiIsIi8qIGpzaGludCBlc25leHQ6IHRydWUgKi9cbid1c2Ugc3RyaWN0J1xubGV0IHVwbG9hZGltYWdlID0gKCkgPT4ge1xuXG4gIGlmICh3aW5kb3cuRmlsZSAmJiB3aW5kb3cuRmlsZVJlYWRlciAmJiB3aW5kb3cuRmlsZUxpc3QgJiYgd2luZG93LkJsb2IpIHtcbiAgICBmdW5jdGlvbiBoYW5kbGVGaWxlU2VsZWN0KGUpIHtcbiAgICAgIGxldCBmaWxlcyA9IGUudGFyZ2V0LmZpbGVzOyAvLyBGaWxlTGlzdCBvYmplY3RcblxuICAgICAgLy8gZmlsZXMgaXMgYSBGaWxlTGlzdCBvZiBGaWxlIG9iamVjdHMuIExpc3Qgc29tZSBwcm9wZXJ0aWVzLlxuXG4gICAgICBsZXQgZiA9IGZpbGVzWzBdO1xuXG4gICAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgICBpZiAoIWYudHlwZS5tYXRjaCgnaW1hZ2UuKicpKSB7XG4gICAgICAgIG91dHB1dC5sZW5ndGggPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0ID0gW1xuICAgICAgICAgICc8aDI+JyxcbiAgICAgICAgICBmLm5hbWUsXG4gICAgICAgICAgJzwvaDI+J1xuICAgICAgICBdXG4gICAgICB9XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdCcpLmlubmVySFRNTCA9IG91dHB1dC5qb2luKCcnKTtcbiAgICAgIGxldCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgIC8vIENsb3N1cmUgdG8gY2FwdHVyZSB0aGUgZmlsZSBpbmZvcm1hdGlvbi5cbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IChmdW5jdGlvbih0aGVGaWxlKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIC8vIFJlbmRlciB0aHVtYm5haWwuXG4gICAgICAgICAgICBsZXQgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gW1xuICAgICAgICAgICAgICAnPGltZyBjbGFzcz1cImxvYWRlZEltYWdlXCIgc3JjPVwiJyxcbiAgICAgICAgICAgICAgZS50YXJnZXQucmVzdWx0LFxuICAgICAgICAgICAgICAnXCIgdGl0bGU9XCInLFxuICAgICAgICAgICAgICBlc2NhcGUodGhlRmlsZS5uYW1lKSxcbiAgICAgICAgICAgICAgJ1wiIHN0eWxlPVwid2lkdGg6IDUwJVwiLz4nXS5qb2luKCcnKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3QnKS5pbnNlcnRCZWZvcmUoc3BhbiwgbnVsbCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoZik7XG5cbiAgICAgICAgLy8gUmVhZCBpbiB0aGUgaW1hZ2UgZmlsZSBhcyBhIGRhdGEgVVJMLlxuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBsb2FkLWlucHV0JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaGFuZGxlRmlsZVNlbGVjdCwgZmFsc2UpO1xuICB9IGVsc2Uge1xuICAgIGFsZXJ0KCdUaGUgRmlsZSBBUElzIGFyZSBub3QgZnVsbHkgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3Nlci4nKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgdXBsb2FkaW1hZ2VcbiIsIi8vIENvbnN0YW50cyBzaGFyZWQgYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlci5cblxudmFyIFRJTEVfV0lEVEggPSAxNjtcbnZhciBUSUxFX0hFSUdIVCA9IDE2O1xuXG52YXIgZXhwb3J0cyA9IGV4cG9ydHMgfHwgbnVsbDtcbmlmIChleHBvcnRzKSB7XG4gIGV4cG9ydHMuVElMRV9XSURUSCA9IFRJTEVfV0lEVEg7XG4gIGV4cG9ydHMuVElMRV9IRUlHSFQgPSBUSUxFX0hFSUdIVDtcbn1cblxuIl19
