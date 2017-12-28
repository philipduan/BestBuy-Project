(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url + '?apiKey=' + obj.api + '&format=json');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                var result = resolve(JSON.parse(xhr.response));
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = function () {
            return reject(xhr.statusText);
        };
        xhr.send(obj.body);
    });
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.displayProduct = displayProduct;
function displayProduct(ary) {
    $('.bxslider').empty();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = ary[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var ari = _step.value;

            var obj = { 'sku': ari.sku, 'price': ari.salePrice };
            var desc = ari.name.split(' ').splice(2, ari.name.length).join(' ');
            var $img = $('<div class="image"></div>').css({ 'background': 'url(' + ari.largeImage + ') no-repeat center',
                'background-size': 'contain',
                'height': '200px',
                'width': '100%' });
            var addToCartButton = $('<button class="addToCart" data-value=' + JSON.stringify(obj) + '>add to cart</button>');
            var child = $('<li class="product"></li>');
            child.append('<p class="brand">' + ari.manufacturer + '</p>').append('<p class = "specs">' + desc + '</p>').append($img).append('<p class="price">$' + ari.salePrice + '</p>').append(addToCartButton);
            $('.bxslider').append(child);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bestbuy = require("./bestbuy");

var _bestbuy2 = _interopRequireDefault(_bestbuy);

var _displayProductFct = require("./displayProductFct");

var fct = _interopRequireWildcard(_displayProductFct);

var _validateEmail = require("./validateEmail");

var email = _interopRequireWildcard(_validateEmail);

var _shopping = require("./shopping");

var shop = _interopRequireWildcard(_shopping);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App() {
		_classCallCheck(this, App);

		this.initBBCall();
	}

	_createClass(App, [{
		key: "initBBCall",
		value: function initBBCall() {
			(0, _bestbuy2.default)({ url: "https://api.bestbuy.com/v1/products(categoryPath.id=abcat0502000)", api: "8ccddf4rtjz5k5btqam84qak" }).then(function (data) {
				/* fill carousel with products */
				console.log(data.products);
				fct.displayProduct(data.products);
				$(document).ready(function () {
					window.slider = $('.bxslider').bxSlider({
						slideWidth: $('.display').width() / 2,
						maxSlides: 2
					});
				});
			}).catch(function (error) {
				console.log("warning Christopher Robins... Error");
				console.log(error);
			});
		}
	}, {
		key: "argBBCall",
		value: function argBBCall(category) {
			(0, _bestbuy2.default)({ url: "https://api.bestbuy.com/v1/products(categoryPath.id=" + category + ")", api: "8ccddf4rtjz5k5btqam84qak" }).then(function (data) {
				/* fill carousel with products */
				fct.displayProduct(data.products);
				$(document).ready(function () {
					window.slider.reloadSlider({
						slideWidth: $('.display').width() / 2,
						maxSlides: 2
					});
				});
			}).catch(function (error) {
				console.log("warning Christopher Robins... Error");
				console.log(error);
			});
		}
	}]);

	return App;
}();

exports.default = App;

var x = new App();

$(window).ready(function () {

	$(window).resize(function () {
		$(document).ready(function () {
			window.slider.reloadSlider({
				slideWidth: $('.display').width() / 2,
				maxSlides: 2
			});
		});
	});

	$('nav ul li').on('click', function () {
		$('nav ul li').removeClass('highlight');
		$(this).addClass('highlight');
		x.argBBCall($(this).attr('id'));
	});

	$('#shopNow').on('click', function (e) {
		e.preventDefault();
		$('body').animate({
			scrollTop: $('nav').offset().top
		}, 600);
	});

	$('#submit').on('click', function (event) {
		$('footer p').remove();
		event.preventDefault();
		$('footer').append(email.validate($(this).siblings().val(), '#FFFFFF', '#B30003'));
	});

	$('#close').on('click', function () {
		$('.overlay').css({ 'height': '0' });
		$('#shopCart').addClass('clickable');
	});

	$('.display').on('click', '.addToCart', function () {
		shop.buy($(this).data('value'));
	});

	$('#shopCart').on('click', function () {
		if ($('#shopCart').hasClass('clickable')) {
			$('.pay').remove();
			$('#shopCart').removeClass('clickable');
			shop.checkout($('.overlay-content'), $('#qty'), $('#total'));
			$('.overlay').css({ 'height': '100%' });
		};
	});

	$('.overlay-content').on('click', '.pay #remove', function () {
		shop.delt($(this).parent().parent(), $('#qty'), $('#total'));
	});

	$('.overlay-content').on('click', '.pay #update', function () {
		shop.updt($(this).parent().parent(), $(this).parent().siblings('p1').children().val(), $('#qty'), $('#total'));
	});
});

},{"./bestbuy":1,"./displayProductFct":2,"./shopping":4,"./validateEmail":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buy = buy;
exports.checkout = checkout;
exports.delt = delt;
exports.updt = updt;
function buy(obj) {

    if (sessionStorage.getItem(obj.sku) == null) {
        var item = { 'qty': 1, 'price': obj.price };
        sessionStorage.setItem(obj.sku, JSON.stringify(item));
    } else {
        var item = JSON.parse(sessionStorage.getItem(obj.sku));
        item.qty += 1;
        sessionStorage.setItem(obj.sku, JSON.stringify(item));
    }
};

function checkout(parent, qtyText, totalText) {
    for (var i = 0; i < sessionStorage.length; i++) {
        var container = $('<div class="pay"></div>');
        var key = sessionStorage.key(i);
        var obj = JSON.parse(sessionStorage.getItem(key));
        var itemTotal = obj.qty * obj.price;
        container.append('<p id="sku">sku : ' + key + '</p>').append('<p1>quantity : <input type="text" value="' + obj.qty + '"></p1>').append('<p id="itemTotal">total : ' + itemTotal.toFixed(2) + '</p>').append('<div class="duo"><button id="update">update</button><button id="remove">remove</button></div>');
        parent.append(container);
    }
    qtyText.text(sessionStorage.length);
    totalText.text(calculateTotal());
};

function delt(parent, qtyText, totalText) {
    var sku = parent.children('#sku').text().split(' ').splice(2, 3).join();
    sessionStorage.removeItem(sku);
    parent.remove();
    qtyText.text(sessionStorage.length);
    totalText.text(calculateTotal());
};

function updt(parent, newVal, qtyText, totalText) {
    var sku = parent.children('#sku').text().split(' ').splice(2, 3).join();
    if (newVal == 0) {
        sessionStorage.removeItem(sku);
        parent.remove();
    } else {
        var sku = parent.children('#sku').text().split(' ').splice(2, 3).join();
        var item = JSON.parse(sessionStorage.getItem(sku));
        item.qty = newVal;
        var itemTotal = item.price * newVal;
        parent.children('#itemTotal').text('total : ' + itemTotal.toFixed(2));
        sessionStorage.setItem(sku, JSON.stringify(item));
    }
    qtyText.text(sessionStorage.length);
    totalText.text(calculateTotal());
};

function calculateTotal() {
    var total = 0;
    for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i);
        var obj = JSON.parse(sessionStorage.getItem(key));
        var itemTotal = obj.qty * obj.price;
        total += itemTotal;
    };
    return total.toFixed(2);
}

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validate = validate;
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate(theInputText, colorSuccess, colorError) {
    if (validateEmail(theInputText)) {
        return $('<p>Thanks for signing up!</p>').css({ 'color': colorSuccess });
    } else {
        return $('<p>Please re-enter your email address using the proper format.</p>').css({ 'color': colorError });
    }
}

},{}]},{},[3]);
