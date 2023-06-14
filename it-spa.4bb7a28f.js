// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/bootstrap/dist/css/bootstrap.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/it-spa.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/common/NavButton.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavButton = NavButton;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// NavButton.js

function NavButton(html, componentFn) {
  var _button$classList;
  var classes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var button = document.createElement('button');
  button.setAttribute('type', 'button');
  (_button$classList = button.classList).add.apply(_button$classList, _toConsumableArray(classes));
  button.innerHTML = html;
  button.addEventListener('click', function () {
    var navigationEvent = new CustomEvent('navigate', {
      detail: componentFn
    });
    document.body.dispatchEvent(navigationEvent);
  });
  return button;
}
},{}],"src/navigation/NavDate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavDate = NavDate;
exports.getStayDays = getStayDays;
// NavDate.js
var stayDays = 1;
function NavDate() {
  var section = document.createElement('section');
  section.classList.add('nav-date', 'shadow');
  var now = new Date();
  var nowYear = now.getFullYear();
  var nowMonth = String(now.getMonth() + 1).padStart(2, '0');
  var nowDate = String(now.getDate()).padStart(2, '0');
  var nextDay = new Date();
  nextDay.setDate(now.getDate() + 1);
  var nextDate = nextDay.toISOString().slice(0, 10);
  var nextYear = now.getFullYear() + 1;
  var minDate = nowYear + "-" + nowMonth + "-" + nowDate;
  var maxDate = nextYear + "-" + nowMonth + "-" + nowDate;
  section.innerHTML = "\n    <form class=\"pt-3 pb-3\">\n      <label for=\"dateStart\" class=\"ms-4 me-2\">Data przyjazdu:</label>\n      <input type=\"date\" id=\"dateStart\" value=".concat(minDate, " min=").concat(minDate, " class=\"me-5\" onkeydown=\"return false\">\n\n      <label for=\"dateEnd\" class=\"me-2\">Data wyjazdu:</label>\n      <input type=\"date\" id=\"dateEnd\" value=").concat(nextDate, " min=").concat(minDate, " max=").concat(maxDate, " class=\"me-5\" onkeydown=\"return false\">\n      Czeka Ci\u0119 <b><span id=\"stayDays\" class=\"ms-2 me-2\">1</span></b> dni pobytu\n    </form>\n  ");

  // zarzadzanie datami
  var arrivalDateInput = section.querySelector('#dateStart');
  var departureDateInput = section.querySelector("#dateEnd");
  var stayDaysOutput = section.querySelector("#stayDays");
  function updateStayLength() {
    var arrivalTime = new Date(arrivalDateInput.value).getTime();
    var departureTime = new Date(departureDateInput.value).getTime();
    var stayLength = Math.ceil((departureTime - arrivalTime) / (1000 * 60 * 60 * 24));
    stayDaysOutput.innerHTML = stayLength;

    //tak było gdy eventlistenerami nie obstawiliśmy sytuacji gdy czas wpobytu był < 0
    stayDaysOutput.innerHTML = stayLength < 0 ? "-" : stayLength;
    stayDays = stayLength; // przypisujemy wartość do zmiennej globalnej;
    //console.log(stayDays);
  }

  arrivalDateInput.addEventListener("change", function () {
    var arrivalDate = new Date(arrivalDateInput.value);
    arrivalDate.setDate(arrivalDate.getDate() + 1);
    var minDepartureDate = arrivalDate.toISOString().slice(0, 10);
    var maxDeparture = new Date(arrivalDate);
    maxDeparture.setFullYear(maxDeparture.getFullYear() + 1);
    var maxDepartureDate = maxDeparture.toISOString().slice(0, 10);
    departureDateInput.min = minDepartureDate;
    departureDateInput.max = maxDepartureDate;

    //jesli wybierana data przyjazdu jest pozniejsza niz chwilowa data wyjazdu, zaktualizuj date wyjazdu w sposob
    //data wyjazdu = data przyjazdu +1
    if (arrivalDate > new Date(departureDateInput.value)) {
      departureDateInput.value = minDepartureDate;
    }
    updateStayLength();
  });
  departureDateInput.addEventListener("change", function () {
    updateStayLength();
  });
  return section;
}

//funkcja do zwracania globalnie liczby dni pobytu, np. po to aby obliczyć koszt pokojów z uwzględnieniem dni pobytu
function getStayDays() {
  //console.log(stayDays);
  return stayDays;
}
},{}],"src/cart/cart-manager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cartManager = void 0;
var _NavDate = require("../navigation/NavDate");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var key = 'it-spa-cart';
var cartManager = {
  addItem: function addItem(item) {
    var cart = localStorage.getItem(key);
    var content;
    if (cart === null) {
      content = _defineProperty({}, item.name, {
        price: item.price,
        quantity: 1
      });
    } else {
      content = JSON.parse(cart);
      // np. { 'Pokój unarny': { price: 170, quantity: 2 } }

      // sprawdzam, czy w koszyku jest już jakiś "Pokój"
      var existingPokoj = Object.keys(content).find(function (name) {
        return name.startsWith('Pokój');
      });
      if (existingPokoj && item.name.startsWith('Pokój')) {
        alert('W koszyku masz już pokój, nie możesz zarezerwować więcej niż jeden pokój w jednej rezerwacji');
        return;
      }
      if (item.name in content) {
        content[item.name].quantity += 1;
      } else {
        var newItem = _defineProperty({}, item.name, {
          price: item.price,
          quantity: 1
        });

        // doklada nowy wpis (klucz: wartosc) do obiektu `content`
        Object.assign(content, newItem);
      }
    }
    //console.log(content[item.name].quantity);
    localStorage.setItem(key, JSON.stringify(content));
  },
  removeItem: function removeItem(item) {
    var cart = localStorage.getItem(key);
    if (cart !== null) {
      var content = JSON.parse(cart);
      if (item.name in content) {
        if (content[item.name].quantity > 1) {
          content[item.name].quantity -= 1;
        } else {
          delete content[item.name];
        }
      }
      localStorage.setItem(key, JSON.stringify(content));
    }
  },
  removeAllItems: function removeAllItems(item) {
    var cart = localStorage.getItem(key);
    if (cart !== null) {
      var content = JSON.parse(cart);
      if (item.name in content) {
        if (content[item.name].quantity >= 1) {
          delete content[item.name];
        }
      }
      localStorage.setItem(key, JSON.stringify(content));
    }
  },
  getAllItems: function getAllItems() {
    var cart = localStorage.getItem(key);
    if (cart === null) {
      return [];
    } else {
      var content = JSON.parse(cart);

      // entry to jest [KLUCZ, WARTOSC]
      return Object.entries(content).map(function (entry) {
        var _entry = _slicedToArray(entry, 2),
          itemName = _entry[0],
          itemDetails = _entry[1];
        return {
          name: itemName,
          price: itemDetails.price,
          quantity: itemDetails.quantity
        };
      });
    }
  },
  getTotalPrice: function getTotalPrice() {
    var cart = localStorage.getItem(key);
    if (cart === null) {
      return '0.00';
    } else {
      var content = JSON.parse(cart);

      //jeśli pokój, to cene mnożymy przez liczbę dni pobytu
      for (var _key in content) {
        if (_key.startsWith("Pokój")) {
          content[_key].price *= (0, _NavDate.getStayDays)();
        }
      }

      // [{ price, quantity }, { price, quantity },  { price, quantity }, ...]
      return Object.values(content).reduce(function (totalPrice, item) {
        return totalPrice + item.price * item.quantity;
      }, 0).toFixed(2);
    }
  },
  getItemQuantity: function getItemQuantity(item) {
    var cart = localStorage.getItem(key);
    if (cart !== null) {
      var content = JSON.parse(cart);
      if (item.name in content) {
        return content[item.name].quantity;
      }
    }
    return 0;
  }
};
exports.cartManager = cartManager;
},{"../navigation/NavDate":"src/navigation/NavDate.js"}],"src/views/RoomDetails.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoomDetails = RoomDetails;
var _NavButton = require("../common/NavButton");
var _RoomList = require("../views/RoomList");
var _cartManager = require("../cart/cart-manager");
// RoomDetails.js

function RoomDetails(roomId) {
  var section = document.createElement('section');
  section.innerHTML = "\n    <h2>Room</h2>\n    <p class=\"loading\">\u0141aduj\u0119 pok\xF3j...</p>\n  ";

  // pobieramy wybrany pokoj z serwera
  fetch("http://localhost:3000/rooms/".concat(roomId)).then(function (response) {
    return response.json();
  }).then(function (room) {
    var details = document.createElement('article');
    details.innerHTML = "\n          <h3>".concat(room.name, "</h3>\n          <br>\n          <p><strong>Liczba \u0142\xF3\u017Cek: ").concat(room.beds, "</strong></p>\n          <p><strong>Liczba go\u015Bci: ").concat(room.guests, "</strong></p>\n          <p>").concat(room.description, "</p>\n          <h5>\n            <strong>").concat(room.price.toFixed(2), " PLN</strong>\n          </h5>\n          <footer></footer>\n        ");
    var backToRoomList = (0, _NavButton.NavButton)('Wróć do listy pokoi', function () {
      return (0, _RoomList.RoomList)();
    }, ['btn', 'btn-info', 'shadow']);
    var addToCartButton = document.createElement('button');
    addToCartButton.innerHTML = '<i class="fa-solid fa-cart-plus fa-lg"></i>';
    addToCartButton.classList.add('btn', 'btn-info', 'shadow');
    addToCartButton.addEventListener('click', function () {
      return _cartManager.cartManager.addItem(room);
    });
    details.querySelector('footer').append(addToCartButton, backToRoomList);

    // usuwamy element mowiacy o ladowaniu
    section.querySelector('.loading').remove();
    // podstawiamy gotowa liste z pokojami
    section.append(details);
  });
  return section;
}
},{"../common/NavButton":"src/common/NavButton.js","../views/RoomList":"src/views/RoomList.js","../cart/cart-manager":"src/cart/cart-manager.js"}],"src/views/RoomList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoomList = RoomList;
var _RoomDetails = require("./RoomDetails");
var _NavButton = require("../common/NavButton");
var _cartManager = require("../cart/cart-manager");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function RoomList() {
  var section = document.createElement('section');
  var ul = document.createElement('ul');
  section.innerHTML = "\n    <h2>Dost\u0119pne pokoje</h2>\n    <p>Wybierz pok\xF3j odpowiedni dla Ciebie i Twoich towarzyszy</p>\n    <p class=\"loading\">\u0141aduj\u0119 list\u0119 pokoi...</p>\n  ";

  // pobieramy liste pokoi z serwera
  fetch('http://localhost:3000/rooms').then(function (response) {
    return response.json();
  }).then(function (rooms) {
    var lis = rooms.map(function (room) {
      var li = document.createElement('li');
      li.classList.add('shadow');
      li.innerHTML = "\n          <h4>".concat(room.name, "</h4>\n          <h4>\n            <strong>").concat(room.price.toFixed(2), " PLN</strong>\n          </h4>\n          <footer>\n            <span class=\"cart-quantity\">w koszyku: <strong>").concat(_cartManager.cartManager.getItemQuantity(room), "</strong></span>\n          </footer>\n        ");
      var addToCartButton = document.createElement('button');
      addToCartButton.innerHTML = '<i class="fa-solid fa-cart-plus fa-lg"></i>';
      addToCartButton.classList.add('btn');
      addToCartButton.addEventListener("click", function () {
        _cartManager.cartManager.addItem(room);
        var span = li.querySelector('.cart-quantity');
        span.innerHTML = "w koszyku: <strong>".concat(_cartManager.cartManager.getItemQuantity(room), "</strong>");
      });
      var removeFromCartButton = document.createElement('button');
      removeFromCartButton.innerHTML = '<i class="fa-solid fa-trash fa-lg"></i>';
      removeFromCartButton.classList.add('btn');
      removeFromCartButton.addEventListener("click", function () {
        _cartManager.cartManager.removeItem(room);
        var span = li.querySelector('.cart-quantity');
        span.innerHTML = "w koszyku: <strong>".concat(_cartManager.cartManager.getItemQuantity(room), "</strong>");
      });
      var detailsButton = (0, _NavButton.NavButton)('Dowiedz się więcej...', function () {
        return (0, _RoomDetails.RoomDetails)(room.id);
      }, ['btn']);
      li.querySelector('footer').append(detailsButton, removeFromCartButton, addToCartButton);
      return li;
    });
    ul.append.apply(ul, _toConsumableArray(lis));

    // usuwamy element mowiacy o ladowaniu
    section.querySelector('.loading').remove();
    // podstawiamy gotowa liste z pokojami
    section.append(ul);
  });
  return section;
}
},{"./RoomDetails":"src/views/RoomDetails.js","../common/NavButton":"src/common/NavButton.js","../cart/cart-manager":"src/cart/cart-manager.js"}],"src/views/TreatmentDetails.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreatmentDetails = TreatmentDetails;
var _NavButton = require("../common/NavButton");
var _TreatmentList = require("../views/TreatmentList");
var _cartManager = require("../cart/cart-manager");
// TreatmentDetails.js

function TreatmentDetails(treatmentId) {
  var section = document.createElement('section');
  section.innerHTML = "\n    <h2>Zabieg</h2>\n    <p class=\"loading\">\u0141aduj\u0119 zabieg...</p>\n  ";

  // pobieramy wybrany zabieg z serwera
  fetch("http://localhost:3000/treatments/".concat(treatmentId)).then(function (response) {
    return response.json();
  }).then(function (treatment) {
    var details = document.createElement('article');
    details.innerHTML = "\n          <h3>".concat(treatment.name, "</h3>\n          <br>\n          <p><strong>Zabieg na: ").concat(treatment.area, "</strong></p>\n          <p><strong>Czas trwania: ").concat(treatment.time, "</strong></p>\n          <h5>\n            <strong>").concat(treatment.price.toFixed(2), " PLN</strong>\n          </h5>\n          <footer></footer>\n        ");
    var addToCartButton = document.createElement('button');
    addToCartButton.innerHTML = '<i class="fa-solid fa-cart-plus fa-lg"></i>';
    addToCartButton.classList.add('btn', 'btn-info', 'shadow');
    addToCartButton.addEventListener('click', function () {
      return _cartManager.cartManager.addItem(treatment);
    });
    var backToTreatmentList = (0, _NavButton.NavButton)('Wróć do listy zabiegów', function () {
      return (0, _TreatmentList.TreatmentList)();
    }, ['btn', 'btn-info', 'shadow']);
    details.querySelector('footer').append(addToCartButton, backToTreatmentList);

    // usuwamy element mowiacy o ladowaniu
    section.querySelector('.loading').remove();
    // podstawiamy gotowa liste z pokojami
    section.append(details);
  });
  return section;
}
},{"../common/NavButton":"src/common/NavButton.js","../views/TreatmentList":"src/views/TreatmentList.js","../cart/cart-manager":"src/cart/cart-manager.js"}],"src/views/TreatmentList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreatmentList = TreatmentList;
var _TreatmentDetails = require("./TreatmentDetails");
var _NavButton = require("../common/NavButton");
var _cartManager = require("../cart/cart-manager");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function TreatmentList() {
  var section = document.createElement("section");
  var ul = document.createElement("ul");
  ul.classList.add('treatments-list');
  section.innerHTML = "\n    <h2>Dost\u0119pne zabiegi</h2>\n    <p>Wybierz co\u015B odpowiedniego dla siebie</p>\n    <p class=\"loading\">\u0141aduj\u0119 list\u0119 zabieg\xF3w...</p>\n  ";

  // pobieramy liste zabiegow z serwera
  fetch("http://localhost:3000/treatments").then(function (response) {
    return response.json();
  }).then(function (treatments) {
    var lis = treatments.map(function (treatment) {
      var li = document.createElement("li");
      li.classList.add('shadow');
      li.innerHTML = "\n          <h4>".concat(treatment.name, "</h4>\n          <h4>\n            <strong>").concat(treatment.price.toFixed(2), " PLN</strong>\n          </h4>\n          <footer>\n            <span class=\"cart-quantity\">w koszyku: <strong>").concat(_cartManager.cartManager.getItemQuantity(treatment), "</strong></span>\n          </footer>\n        ");
      var addToCartButton = document.createElement("button");
      addToCartButton.innerHTML = '<i class="fa-solid fa-cart-plus fa-lg"></i>';
      addToCartButton.classList.add("btn");
      addToCartButton.addEventListener("click", function () {
        _cartManager.cartManager.addItem(treatment);
        var span = li.querySelector('.cart-quantity');
        span.innerHTML = "doda\u0142e\u015B i masz ju\u017C: <strong>".concat(_cartManager.cartManager.getItemQuantity(treatment), "</strong>");
      });
      var detailsButton = (0, _NavButton.NavButton)("Dowiedz się więcej...", function () {
        return (0, _TreatmentDetails.TreatmentDetails)(treatment.id);
      }, ["btn"]);
      li.querySelector("footer").append(detailsButton, addToCartButton);
      return li;
    });
    ul.append.apply(ul, _toConsumableArray(lis));

    // usuwamy element mowiacy o ladowaniu
    section.querySelector(".loading").remove();
    // podstawiamy gotowa liste z pokojami
    section.append(ul);
  });
  return section;
}
},{"./TreatmentDetails":"src/views/TreatmentDetails.js","../common/NavButton":"src/common/NavButton.js","../cart/cart-manager":"src/cart/cart-manager.js"}],"src/views/Home.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = Home;
var _RoomList = require("./RoomList");
var _TreatmentList = require("./TreatmentList");
// Home.js
function Home() {
  var section = document.createElement('section');
  section.innerHTML = "\n    <div class=\"jumbotron\">\n      <div class=\"heading col-12\">\n        <h2 class=\"text-center\"><br>Zobacz co Ci\u0119 u nas czeka...</h2>\n        <br>\n      </div>\n    <hr />\n    <div class=\"row text-center\">\n      <div class=\"col-md-6\">\n        <div class=\"row\">\n          <div class=\"col-lg-4 col-sm-4\">\n            <img id=\"zabiegi1\" class=\"home-image shadow\" alt=\"zabiegi\">\n          </div>\n          <div class=\"col-lg-8 col-sm-8\">\n            <blockquote class=\"blockquote text-center\">\n              <p>Odkryj najwspanialsze <strong>zabiegi</strong> jakie mo\u017Cesz sobie wyobrazi\u0107. Znane Ci przyrz\u0105dy i akcesoria programisty dostarcz\u0105 Ci niezapomnianych wra\u017Ce\u0144, a chwile sp\u0119dzone w naszych gabinetach zabiegowych na d\u0142ugo pozostan\u0105 w Twojej pami\u0119ci!</p>\n            </blockquote>\n            <footer class=\"blockquote-footer\">\n              <cite>Maurycy Pompka, g\u0142\xF3wny fizjorelaksator</cite>\n            </footer>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-6\">\n        <div class=\"row\">\n          <div class=\"col-lg-4 col-sm-4\">\n            <img id=\"pokoje1\" class=\"home-image shadow\" alt=\"pokoje\">\n          </div>\n          <div class=\"col-lg-8 col-sm-8\">\n            <blockquote class=\"blockquote text-center\">\n              <p>Przestronne i pe\u0142ne udogodnie\u0144 <strong>pokoje</strong> pozwol\u0105 Ci wypocz\u0105\u0107 w spos\xF3b jakiego jeszcze nie zna\u0142e\u015B! \u0141\xF3\u017Cka typu king-size, panoramiczne okna, balkony z zestawem wypoczynkowym - sp\xF3buj a zostaniesz na d\u0142u\u017Cej.</p>\n            </blockquote>\n            <footer class=\"blockquote-footer\">\n              <cite>Ernest Golibroda, g\u0142\xF3wny komfortmaker</cite>\n            </footer>\n          </div>\n        </div>\n      </div>\n    </div>\n    <br>\n    <div class=\"jumbotron\">\n      <hr />\n      <div class=\"row text-center\">\n        <div class=\"col-lg-3\">\n          <div class=\"resource\">\n            <i class=\"fa-solid fa-star fa-2x\"></i>\n            <h2>Niskie ceny</h2>\n            <p>U nas nie przep\u0142acisz, wyj\u0105tkowa jako\u015B\u0107 us\u0142ug w cenach nie do przebicia!</p>\n          </div>\n        </div>\n        <div class=\"col-lg-3\">\n          <div class=\"resource\">\n            <i class=\"fa-solid fa-star fa-2x\"></i>\n            <h2>Kuchnia</h2>\n            <p>Zachwy\u0107 si\u0119 potrawami jakie serwuj\u0105 nasi kuchmistrzowie. Smacznie i zdrowo!</p>\n          </div>\t\n        </div>\n        <div class=\"col-lg-3\">\n          <div class=\"resource\">\n            <i class=\"fa-solid fa-star fa-2x\"></i>\n            <h2>Atmosfera</h2>\n            <p>O ka\u017Cdej porzed dnia i nocy mo\u017Cesz liczy\u0107 na nasz\u0105 pomoc, opiek\u0119, dyskrecj\u0119 i \u017Cyczliwo\u015B\u0107!</p>\n          </div>\n        </div>\n        <div class=\"col-lg-3\">\n          <div class=\"resource\">\n            <i class=\"fa-solid fa-star fa-2x\"></i>\n            <h2>Dojazd</h2>\n            <p>\u015Awietna lokalizacja tu\u017C przy w\u0119\u017Ale \"Relaksowo Wielkie\" na autostradzie A2 - szybko dotrzesz!</p>\n          </div>\n      </div>\n    </div>\t\n  ";
  var zabiegi1 = section.querySelector('#zabiegi1');
  var pokoje1 = section.querySelector('#pokoje1');

  // zabiegi1.src = require('../assets/zabiegi1.jpg');
  // pokoje1.src = require('../assets/pokoje1.jpg');
  //////////////////////////////////////////////////////////////////
  var zabiegi1Img = new Image();
  zabiegi1Img.src = 'https://e-map.pl/temp/zabiegi1.jpg';
  zabiegi1.src = zabiegi1Img.src;
  var pokoje1Img = new Image();
  pokoje1Img.src = 'https://e-map.pl/temp/pokoje1.jpg';
  pokoje1.src = pokoje1Img.src;
  ////////////////////////////////////////////////////////////////

  zabiegi1.onclick = function () {
    var main = document.querySelector('main');
    main.innerHTML = '';
    main.append((0, _TreatmentList.TreatmentList)());
  };
  pokoje1.onclick = function () {
    var main = document.querySelector('main');
    main.innerHTML = '';
    main.append((0, _RoomList.RoomList)());
  };
  return section;
}
},{"./RoomList":"src/views/RoomList.js","./TreatmentList":"src/views/TreatmentList.js"}],"src/views/Cart.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cart = Cart;
var _cartManager = require("../cart/cart-manager");
var _NavButton = require("../common/NavButton");
var _NavDate = require("../navigation/NavDate");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function Cart() {
  var _section$querySelecto;
  //dodanie nasłuchiwania na zmianę dni pobytu po to aby będąc w Cart na bierząco aktualizować łączną cenę
  var arrivalDateInput = document.querySelector('#dateStart');
  var departureDateInput = document.querySelector("#dateEnd");
  arrivalDateInput.addEventListener("change", function () {
    var cartElement = document.querySelector("#cart");
    if (cartElement) {
      // sprawdzenie, czy element o ID "cart" istnieje
      var main = document.querySelector('main');
      main.innerHTML = '';
      main.append(Cart());
    }
  });
  departureDateInput.addEventListener("change", function () {
    var cartElement = document.querySelector("#cart");
    if (cartElement) {
      // sprawdzenie, czy element o ID "cart" istnieje
      var main = document.querySelector('main');
      main.innerHTML = '';
      main.append(Cart());
    }
  });
  var section = document.createElement('section');
  section.id = "cart";
  section.innerHTML = "\n    <h2>Twoja rezerwacja</h2>\n    <h5>Zamierzasz zarezerwowa\u0107 pobyt w wybranym pokoju na <b>".concat((0, _NavDate.getStayDays)(), " dni</b> oraz zabiegi.</h5><br>\n    <table class=\"table\"></table>\n  ");
  var tableHead = document.createElement('tr');
  tableHead.innerHTML = "\n    <th>us\u0142uga</th>\n    <th>liczba</th>\n    <th>cena jednostkowa</th>\n    <th></th>\n  ";
  var tableRows = _cartManager.cartManager.getAllItems().sort(function (item1, item2) {
    // sortowanie po nazwie, rozpoczynającej się od "Pokój"
    if (item1.name.startsWith('Pokój') && !item2.name.startsWith('Pokój')) {
      return -1;
    } else if (!item1.name.startsWith('Pokój') && item2.name.startsWith('Pokój')) {
      return 1;
    } else {
      return 0;
    }
  }).map(function (item) {
    // tworzenie wierszy tabeli
    var tr = document.createElement('tr');
    var addItem = (0, _NavButton.NavButton)('<i class="fa-sharp fa-solid fa-plus"></i>', function () {
      _cartManager.cartManager.addItem(item);
      return Cart();
    }, ['btn']);
    var removeItem = (0, _NavButton.NavButton)('<i class="fa-solid fa-minus"></i>', function () {
      _cartManager.cartManager.removeItem(item);
      return Cart();
    }, ['btn']);
    var removeAllItems = (0, _NavButton.NavButton)('<i class="fa-solid fa-trash"></i>', function () {
      _cartManager.cartManager.removeAllItems(item);
      return Cart();
    }, ['btn']);
    tr.innerHTML = "\n      <td>".concat(item.name, "</td>\n      <td>").concat(item.quantity, "</td>\n      <td>").concat(item.price.toFixed(2), " PLN</td>\n      <td></td>\n    ");
    tr.lastElementChild.append(addItem);
    tr.lastElementChild.append(removeItem);
    tr.lastElementChild.append(removeAllItems);
    return tr;
  });
  var tableFooter = document.createElement('tr');
  tableFooter.innerHTML = "\n    <td></td>\n    <td>\n      Razem = \n    </td>\n    <td>\n      <strong>".concat(_cartManager.cartManager.getTotalPrice(), "</strong> PLN\n    </td>\n  ");

  // kompletujemy zawartosc tabeli
  (_section$querySelecto = section.querySelector('.table')).append.apply(_section$querySelecto, [tableHead].concat(_toConsumableArray(tableRows), [tableFooter]));
  return section;
}
},{"../cart/cart-manager":"src/cart/cart-manager.js","../common/NavButton":"src/common/NavButton.js","../navigation/NavDate":"src/navigation/NavDate.js"}],"src/navigation/Nav.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nav = Nav;
var _NavButton = require("../common/NavButton");
var _Cart = require("../views/Cart");
var _Home = require("../views/Home");
var _RoomList = require("../views/RoomList");
var _TreatmentList = require("../views/TreatmentList");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var navItems = [{
  name: '<i class="fa-solid fa-house fa-xl"></i>',
  component: _Home.Home
}, {
  name: 'Pokoje <i class="fa-solid fa-bed fa-lg"></i>',
  component: _RoomList.RoomList
}, {
  name: 'Zabiegi <i class="fa-solid fa-spa fa-lg"></i>',
  component: _TreatmentList.TreatmentList
}, {
  name: '<i class="fa-solid fa-cart-shopping fa-bounce fa-xl"></i>',
  component: _Cart.Cart
}];
function Nav() {
  var nav = document.createElement('nav');
  nav.classList.add('navbar');
  var navButtons = navItems.map(function (navItem) {
    return (0, _NavButton.NavButton)(navItem.name, navItem.component, ['btn', 'btn-info', 'btn-lg', 'shadow']);
  });
  nav.append.apply(nav, _toConsumableArray(navButtons));
  return nav;
}
},{"../common/NavButton":"src/common/NavButton.js","../views/Cart":"src/views/Cart.js","../views/Home":"src/views/Home.js","../views/RoomList":"src/views/RoomList.js","../views/TreatmentList":"src/views/TreatmentList.js"}],"src/views/CartPreview.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CartPreview = CartPreview;
var _cartManager = require("../cart/cart-manager");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function CartPreview() {
  var _cartPreview$querySel;
  var cartPreview = document.createElement('div');
  cartPreview.classList.add('cartPreview', 'shadow');
  cartPreview.innerHTML = "\n    <p><strong>Zawarto\u015B\u0107 koszyka</strong></p>\n    <table class=\"table table-narrow\"></table>\n  ";
  var tableHead = document.createElement('tr');
  tableHead.innerHTML = "\n    <th>us\u0142uga</th>\n    <th>liczba</th>\n    <th>cena jedn.</th>\n    <th></th>\n  ";
  var tableRows = _cartManager.cartManager.getAllItems().sort(function (item1, item2) {
    // sortowanie po nazwie, rozpoczynającej się od "Pokój"
    if (item1.name.startsWith('Pokój') && !item2.name.startsWith('Pokój')) {
      return -1;
    } else if (!item1.name.startsWith('Pokój') && item2.name.startsWith('Pokój')) {
      return 1;
    } else {
      return 0;
    }
  }).map(function (item) {
    var tr = document.createElement('tr');
    tr.innerHTML = "\n      <td>".concat(item.name, "</td>\n      <td>").concat(item.quantity, "</td>\n      <td>").concat(item.price, " PLN</td>\n      <td></td>\n    ");
    return tr;
  });
  var tableFooter = document.createElement('tr');
  tableFooter.innerHTML = "\n    <td></td>\n    <td>\n      Razem = \n    </td>\n    <td>\n      <strong>".concat(_cartManager.cartManager.getTotalPrice(), "</strong> PLN\n    </td>\n  ");

  // kompletujemy zawartosc tabeli
  (_cartPreview$querySel = cartPreview.querySelector('.table')).append.apply(_cartPreview$querySel, [tableHead].concat(_toConsumableArray(tableRows), [tableFooter]));
  return cartPreview;
}
},{"../cart/cart-manager":"src/cart/cart-manager.js"}],"src/views/Registration.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Registration = Registration;
var _Home = require("../views/Home");
// Registration.js

function Registration() {
  var section = document.createElement('section');
  section.innerHTML = "\n    <div class=\"container mt-3\">\n      <form id=\"registration-form\" class=\"col-md-6 mx-auto\">\n        <div class=\"form-group\">\n          <label for=\"email-input\">Adres e-mail</label>\n          <input type=\"email\" class=\"form-control\" id=\"email-input\" required>\n        </div>\n        <div class=\"form-group mb-2\">\n          <label for=\"password-input\">Has\u0142o</label>\n          <input type=\"password\" class=\"form-control\" id=\"password-input\" required>\n        </div>\n        <button type=\"submit\" class=\"btn btn-sm btn-info\">Zarejestruj</button>\n        <button type=\"button\" class=\"btn btn-sm btn-info\" id=\"login-btn\">Zaloguj</button>\n      </form>\n    </div>\n  ";
  var registrationForm = section.querySelector('#registration-form');
  var emailInput = section.querySelector('#email-input');
  var passwordInput = section.querySelector('#password-input');
  var loginBtn = section.querySelector('#login-btn');

  // Po zalogowaniu, zamienia przycisk "Zaloguj lub zarejestruj" na przycisk "Wyloguj", zmienia sie takze ikona
  // Deklaracja przyciskow w sytuacji zalogowania
  var signOutButton = document.createElement('button');
  signOutButton.classList.add('btn', 'btn-sm', 'btn-outline-info');
  signOutButton.innerHTML = 'Wyloguj';
  signOutButton.addEventListener('click', function () {
    location.reload();
    alert('Zostałeś wylogowany');
  });
  var signOutIcon = document.createElement('button');
  signOutIcon.classList.add('btn', 'btn-sm', 'btn-info', 'ms-2');
  signOutIcon.innerHTML = '<i class="fa-solid fa-user"></i>';
  signOutIcon.addEventListener('click', function () {
    location.reload();
    alert('Zostałeś wylogowany');
  });

  // Wymiana przycisków, dodanie tekstu o zalogowaniu
  function onLogin(user) {
    alert("Witaj ".concat(user, ", zalogowano pomy\u015Blnie!"));
    var header = document.querySelector('header');
    var signInButton = document.querySelector('.signInButton');
    var signInIcon = document.querySelector('.signInIcon');
    header.replaceChild(signOutButton, signInButton);
    header.replaceChild(signOutIcon, signInIcon);
    var loginText = document.createElement('span');
    loginText.classList.add('btn-outline-info', 'btn-sm', 'disabled');
    loginText.innerHTML = "Zalogowano <b>".concat(user, "<b>  ");
    header.prepend(loginText);
    var main = document.querySelector('main');
    main.innerHTML = '';
    main.append((0, _Home.Home)());
  }
  registrationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Sprawdzanie, czy użytkownik o podanym adresie e-mail już istnieje
    fetch('http://localhost:3000/users').then(function (response) {
      return response.json();
    }).then(function (users) {
      var userExists = users.some(function (user) {
        return user.email === emailInput.value;
      });
      if (userExists) {
        alert('Użytkownik o podanym adresie e-mail już istnieje, może już wcześniej się zarejestrowałeś?');
        return;
      }

      // Jeśli funkcja nie została zastopowana wyżej - dodajemy użytkownika do bazy danych
      var newUser = {
        email: emailInput.value,
        password: passwordInput.value
      };
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      }).then(function (response) {
        return response.json();
      }).then(function () {
        return alert('Użytkownik został zarejestrowany');
      }).catch(function (error) {
        return console.error(error);
      });
    }).catch(function (error) {
      return console.error(error);
    });
  });
  loginBtn.addEventListener('click', function () {
    // Wyszukiwanie użytkownika o podanym e-mail i haśle
    fetch('http://localhost:3000/users').then(function (response) {
      return response.json();
    }).then(function (users) {
      var user = users.find(function (user) {
        return user.email === emailInput.value && user.password === passwordInput.value;
      });
      var username = user.email.split('@')[0];
      if (user) {
        onLogin(username);
      } else {
        alert('Wpisałeś nieprawidłowy adres e-mail lub hasło albo nigdy się nie zarejestrowałeś');
      }
    }).catch(function (error) {
      return console.error(error);
    });
  });
  return section;
}
},{"../views/Home":"src/views/Home.js"}],"src/navigation/Header.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = Header;
var _NavButton = require("../common/NavButton");
var _Registration = require("../views/Registration");
var _Home = require("../views/Home");
// Header.js

function Header() {
  var header = document.createElement('header');
  header.classList.add('container-fluid', 'text-end');
  var signInButton = (0, _NavButton.NavButton)('Zaloguj lub zarejestruj', _Registration.Registration, ['btn', 'btn-sm', 'btn-outline-info', 'signInButton']);
  var signInIcon = (0, _NavButton.NavButton)('<i class="fa-regular fa-user fa-lg"></i>', _Registration.Registration, ['btn', 'btn-sm', 'btn-outline-info', 'ms-2', 'signInIcon']);
  header.append(signInButton);
  header.append(signInIcon);
  return header;
}
},{"../common/NavButton":"src/common/NavButton.js","../views/Registration":"src/views/Registration.js","../views/Home":"src/views/Home.js"}],"src/it-spa.js":[function(require,module,exports) {
"use strict";

require("bootstrap/dist/css/bootstrap.css");
require("./it-spa.scss");
var _Home = require("./views/Home");
var _Nav = require("./navigation/Nav");
var _NavDate = require("./navigation/NavDate");
var _CartPreview = require("./views/CartPreview");
var _Header = require("./navigation/Header");
// it-spa.js

// import 'bootstrap/dist/js/bootstrap.bundle.js';

var main = document.querySelector('main');

// przyczepiamy komponenty przed elementem main
main.before((0, _Header.Header)());
main.before((0, _Nav.Nav)());
main.before((0, _NavDate.NavDate)());
// uzytkownik wystartuje na Home
main.append((0, _Home.Home)());

// reagujemy na zdarzenie `navigate`
document.body.addEventListener('navigate', function (event) {
  var Component = event.detail;

  //czyscimy main, podstawiamy nowy komponent
  main.innerHTML = '';
  main.append(Component());
});

// cartPreview - pokazywanie i ukrywanie
var cartButton = document.querySelector('nav').lastElementChild;
cartButton.classList.add('btn-danger');
var cartPreview = null;
cartButton.addEventListener('mouseover', function () {
  cartPreview = (0, _CartPreview.CartPreview)();
  main.append(cartPreview);
});
cartButton.addEventListener('mouseout', function () {
  if (cartPreview) {
    cartPreview.remove();
  }
});
var stayDays = 1;
},{"bootstrap/dist/css/bootstrap.css":"node_modules/bootstrap/dist/css/bootstrap.css","./it-spa.scss":"src/it-spa.scss","./views/Home":"src/views/Home.js","./navigation/Nav":"src/navigation/Nav.js","./navigation/NavDate":"src/navigation/NavDate.js","./views/CartPreview":"src/views/CartPreview.js","./navigation/Header":"src/navigation/Header.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56417" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/it-spa.js"], null)
//# sourceMappingURL=/it-spa.4bb7a28f.js.map