import request from "./bestbuy";
import * as fct from "./displayProductFct";
import * as email from "./validateEmail";
import * as shop from "./shopping";
export default class App {
	constructor() {
		this.initBBCall();

	}

	initBBCall() {
		request({ url: "https://api.bestbuy.com/v1/products(categoryPath.id=abcat0502000)", api: "8ccddf4rtjz5k5btqam84qak" })
			.then(data => {
				/* fill carousel with products */
				console.log(data.products);
				fct.displayProduct(data.products);
				$(document).ready(function () {
					window.slider = $('.bxslider').bxSlider({
						slideWidth: $('.display').width() / 2,
						maxSlides: 2,
					});
				});

			})
			.catch(error => {
				console.log("warning Christopher Robins... Error");
				console.log(error);
			});
	}

	argBBCall(category) {
		request({ url: "https://api.bestbuy.com/v1/products(categoryPath.id=" + category + ")", api: "8ccddf4rtjz5k5btqam84qak" })
			.then(data => {
				/* fill carousel with products */
				fct.displayProduct(data.products);
				$(document).ready(function () {
					window.slider.reloadSlider({
						slideWidth: $('.display').width() / 2,
						maxSlides: 2,
					});
				});

			})
			.catch(error => {
				console.log("warning Christopher Robins... Error");
				console.log(error);
			});
	}
}
let x = new App;

$(window).ready(function () {

	$(window).resize(function () {
		$(document).ready(function () {
			window.slider.reloadSlider({
				slideWidth: $('.display').width() / 2,
				maxSlides: 2,
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

	$('.overlay-content').on('click','.pay #remove',function (){
		shop.delt($(this).parent().parent(),$('#qty'), $('#total'));
	});

	$('.overlay-content').on('click','.pay #update',function (){
		shop.updt($(this).parent().parent(),$(this).parent().siblings('p1').children().val(),$('#qty'),$('#total'));
	});

});


