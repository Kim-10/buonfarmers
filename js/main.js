var mobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB10|IEMobile|Opera Mini/.test(navigator.userAgent)) {
	mobile = true;
	$('html').addClass('mobile');
}

$(document).ready(function() {

	// закрытие дропдаунов по клику ВНЕ их зоны
	$(document).mouseup(function (e) {

		var cartremove = $('.incart__remove');
		if (cartremove.has(e.target).length === 0) {
			cartremove.find('.removeitem').fadeOut(600, function(){cartremove.find('.removeitem').remove()});
		}

		var search = $('.search');
		if (search.has(e.target).length === 0) {
			$('html').removeClass('is-search-focused');
			$('.search').css('width', '100%');
		}

		var headerUser = $('.header__user');
		if (headerUser.has(e.target).length === 0) {
			$('.js-header-user-button').removeClass('is-open');
			$('.js-header-user-dropdown').slideUp();
		}

		var worktime = $('.js-header-worktime');
		if (worktime.has(e.target).length === 0) {
			worktime.removeClass('is-open');
			$('.js-header-worktime-dropdown').slideUp();
		}

		var phones = $('.js-phones');
		if (phones.has(e.target).length === 0) {
			phones.removeClass('is-open');
		}

	});

	// открытие поиска - фокус на поле
	if ($('.search').length > 0){
		var selectWidth = $('.search').closest('.row').width() - 30 - ( $('.header .search').offset().left -  $('.header .row').offset().left );
		$('.search').on('focus', '.search__input', function(e){
			$('html').addClass('is-search-focused');
			$(this).closest('.search').css('width', selectWidth + 15);
		});
	}

	$('.js-remove-item').click(function(e){
		e.preventDefault();
		alert('Remove event!');
	});

	// добавить в корзину в каталоге
	$('.js-add-to-cart').click(function(e){
		e.preventDefault();
		$(this).addClass('is-active');
		$(this).closest('.item').addClass('is-incart');
	});

	// добавить в корзину в каталоге
	$('.js-add-to-fav').click(function(e){
		e.preventDefault();
		$(this).addClass('is-active');
		$(this).closest('.item').addClass('is-infav');
	});

	// добавить галочку на товаре
	$('.js-add-to-check').click(function(e){
		e.preventDefault();
		if ($(this).closest('.item').is('.is-checked')){
			$(this).closest('.item').removeClass('is-checked');
		} else {
			$(this).closest('.item').addClass('is-checked');
		}
	});

	// просмотренные - фильтр
	$('.js-viewed-filter a').click(function(e){
		e.preventDefault();
		$(this).siblings('a').removeClass('is-active');
		$(this).addClass('is-active');
	});

	// мои заказы - подробнее
	$('.js-orders-sort').on('click', 'button:not(.is-active)', function(e){
		var type = $(this).data('type');
		$(this).addClass('is-active');
		$(this).siblings('button').removeClass('is-active');
		$('.js-order-more').each(function(){
			$(this).trigger('click');
		})
	});

	// мои заказы - открыть подробнее
	$('.js-order-more').click(function(){
		var order = $(this).closest('.order');
		order.toggleClass('is-more');
		order.find('.order__more').slideToggle();
	});

	// автокомплит поиска
	var suggestions = [
		{ "value": "Комплексное минеральное универсальное удобрение для овощных культур Master (Мастер)", data:{
			"url": "/product.html",
			"image": "../images/item1.jpg",
			"price": "208, 80 грн."
		}},
		{ "value": "Комплексное минеральное универсальное удобрение для овощных культур Master (Мастер)", data:{
			"url": "/product.html",
			"image": "../images/item1.jpg",
			"price": "208, 80 грн."
		}},
		{ "value": "Комплексное минеральное универсальное удобрение для овощных культур Master (Мастер)", data:{
			"url": "/product.html",
			"image": "../images/item1.jpg",
			"price": "208, 80 грн."
		}}
	];
	$('.search__input').autocomplete({
		// serviceUrl:'/ajax/search_products.php',
		minChars:1,
		width: selectWidth + 15,
		showNoSuggestionNotice: true,
		noSuggestionNotice: 'По вашему запросу ничего не найдено. Уточните свой запрос',
		lookup: suggestions,
		onSelect: function (suggestion) {
			alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
		},
		formatResult: function(suggestion, currentValue){
			var reEscape = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g');
			var pattern = '(' + currentValue.replace(reEscape, '\\$1') + ')';
			return ( suggestion.data.image?"<div class='image'><img align=absmiddle src='"+suggestion.data.image+"'></div> ":'' ) +
				"<span class='name'>" + suggestion.value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>') +
				"</span><div class='price'>" + suggestion.data.price + "</div>";
		}
	});

	// мои отзывы - подробнее
	$('.js-comments-showmore').click(function() {
		$(this).closest('.comments__item').find('.comments__item--predesc').slideToggle();
		$(this).closest('.comments__item').find('.comments__item--hidden').slideToggle();
		$(this).toggleClass('is-active');
	});

	// мои заказы - отмененные
	$('.js-order-cancelled').click(function() {
		$(this).toggleClass('is-active');
		$(this).next('.order__cancelled--dropdown').slideToggle();
	});

	// мои заказы - полная инфо
	$('.js-order-full-info').click(function(){
		$(this).toggleClass('is-active');
		$(this).closest('.order').find('.order__full--info').slideToggle();
	});

	// личный кабинет - удалить телефон/адрес
	$('.horform').on('click', '.js-horform-remove', function(){
		$(this).closest('.horform__key').slideUp();
		var type = $(this).closest('.horform__line').find('label').text();
		var text = $(this).closest('.horform__key').text();
		console.log(text.length);
		if (text.length > 1){
			text = ' «' + text + '» '
		}
		$('.js-notify-text').text(type + text + 'успешно удален.');
		if ($('.notify').is(':hidden')){
			$('.notify').slideDown();
		}
	});

	// личный кабинет - закрыть уведомление
	$('.notify').on('click', '.js-notify-close', function(){
		$(this).closest('.notify').slideUp();
	});

	// личный кабинет - добавить телефон
	$('.js-horform-add-phone').on('click', function(){
		var tpl = '<div class="horform__key"><input type="tel" class="input js-mask-phone" required placeholder="Телефон"> <span class="icon-remove js-horform-remove js-tooltip-simple" title="Удалить телефон"></span></div>';
		$(tpl).insertBefore($(this));
	});

	// личный кабинет - добавить адрес
	$('.js-horform-add-address').on('click', function(){
		var tpl = '<div class="horform__key"><input type="text" class="input" required placeholder="Город"><input type="text" class="input" required placeholder="Улица"><div class="row"><div class="col-xs-6"><input type="text" class="input" required placeholder="Дом"></div><div class="col-xs-6"><input type="text" class="input" required placeholder="Квартира"></div></div> <span class="icon-remove js-horform-remove js-tooltip-simple" title="Удалить адрес"></span></div>';
		$(tpl).insertBefore($(this));
	});

	// шапка - юзер дропдаун
	$('.js-header-user-button').on('click', function(){
		$(this).toggleClass('is-open');
		$(this).next('.js-header-user-dropdown').slideToggle();
	});

	// корзина - шапка - время дропдаун
	$('.js-header-worktime').on('click', function(){
		$(this).toggleClass('is-open');
		$('.js-header-worktime-dropdown').slideToggle();
	});

	// корзина - галочка я получатель
	$('.js-check-iam-recepient').on('change', function(){
		var inputs = $(this).closest('.css3check').next('.cart__recepient');
		if ($(this).is(":checked")){
			inputs.slideUp();
		} else {
			inputs.slideDown();
		}
	});

	// корзина - выбор отделения
	$('.js-cart-samo-select').on('change', function(){
		var text = $(this).find('option:selected').data('text');
		$('.js-cart-samo-text').html(text);
	});

	// корзина - смена оплаты
	$('.js-toggle-payment').on('click', 'label', function(e){
		var val = $(this).find('input').val();
		$('.cart__payment--more').hide();
		if ($('.js-payment-'+val).length > 0){
			$('.js-payment-'+val).show();
		}
	});

	// корзина - смена оплаты
	$('.js-cart-payment').on('change', function(e){
		var val = $(this).val();
		$('.cart__delivery--method').hide();
		$('.js-cart-delivery-'+val).show();
	});

	// корзина - карта, уменьшить размер
	$('.js-cart-sklad-button').click(function(e){
		$(this).closest('.cart__sklad').toggleClass('is-active');
	});

	// корзина - скрыть комментарий
	$('.js-cart-comment-close').click(function(e){
		$(this).removeClass('is-visible');
		$(this).closest('.cart__comment').find('.cart__comment--block').slideUp();
	});

	// корзина - добавить комментарий
	$(".js-cart-comment").click(function(e){
		$(this).next('.js-cart-comment-close').toggleClass('is-visible');
		$(this).closest('.cart__comment').find('.cart__comment--block').slideToggle();
	});

	// попап товаров - удалить товар из корзины
	$('.popup').on('click', '.js-cart-remove', function(){
		if ($(this).closest('.incart__remove').find('.removeitem').length > 0) {
			$(this).closest('.incart__remove').find('.removeitem').fadeOut(600, function(){$(this).closest('.incart__remove').find('.removeitem').remove()});
		} else {
			$('#removeitem').clone().hide().appendTo($(this).closest('.incart__remove')).fadeIn();
		}
	});
	$('.popup').on('click', '.js-removeitem-close', function(){
		$(this).closest('.removeitem').fadeOut(600, function(){$(this).closest('.removeitem').remove()});
	});

	// вертикальная галерея фото товара
	if ($('.js-product-gallery').length > 0){
		$('.js-product-gallery').slick({
			infinite: false,
			slidesToShow: 4,
			vertical: true,
			verticalSwiping: true
		});
		$('.js-product-gallerylink').click(function(e){
			e.preventDefault();
			$('.js-product-gallery .slick-slide:first-child').find('a').trigger('click');
		});
	}

	// товар - кнопка написать отзыв
	$('.js-reviews-switch').click(function(e){
		e.preventDefault();
		$(this).next('.reviews__form').slideToggle();
	});

	// товар - комментарии - Уведомить об ответе на почту
	$('.js-reviews-form input[type=checkbox]').on('change', function(){
		$(this).closest('.css3check').next('input').toggle();
	});

	// товар - выбор рейтинга
	$('.js-rating-radio').on('change', function(e) {
		if ($(this).is(':checked')) {
			$('.rating__field.is-active').removeClass('is-active');
			$(this).closest('.rating__field').addClass('is-active');
		}
	});

	// Табы
	$('.js-tabs').on('click', '.tabs__link', function(){
		$(this).addClass('is-active').siblings('.tabs__link').removeClass('is-active');
		var target = $(this).data('target');
		if (target !== 'all'){
			$('#'+target).show().siblings('.tabs__content').hide();
		}
		if (target === 'all') {
			console.log('all');
			$('.tabs__content').show();
		}
	});

	// отправка товара в корзину
	$('.js-product-submit').click(function(e){
		e.preventDefault();
		// $(this).addClass('is-active');
		$(this).hide();
		$(this).closest('.product__buttons').find('.js-product-added').show();
		// $(this).find('.js-product-incart-text').text('В корзине');
		$.fancybox.open({
			src: "#cart",
			touch: false
		})
	});

	// корзина - попап новой почты
	$('.js-cart-np-popup').click(function(e){
		e.preventDefault();
		$.fancybox.open({
			src: "#npmap",
			touch: false
		})
	});

	// добавить товар в избранное
	$('.js-product-fav').click(function(e){
		e.preventDefault();
		$(this).addClass('is-active');
		$(this).find('.js-product-fav-text').text('В избранном');
	});

	// выпадающий список с поиском
	$('.js-styler-search').styler({
		selectSearch: true
	});

	// выпадающий список
	$('.js-styler').styler();

	// каталог - фильтр - слайдер цены
	var $range = $(".js-filter-priceslider");
	var $from = $('.js-filter-price-from');
	var $to = $('.js-filter-price-to');
	$range.ionRangeSlider({
		type: "double",
		min: 0,
		max: 90000,
		grid: false,
		hide_min_max: true,
		hide_from_to: true,
		onChange: function (data) {
			if ($from.val() !== data.from_pretty){
				$from.focus();
			}
			if ($to.val() !== data.to_pretty){
				$to.focus();
			}
			$from.val(data.from_pretty);
			$to.val(data.to_pretty);
		},
		onFinish: function (data) {
			$from.blur();
			$to.blur();
		}
	});
	// $range.on("change", function (data) {
	// 	var $this = $(this),
	// 		value = $this.prop("value").split(";");
	// 	console.log(data);
	// 	$('.js-filter-price-from').val(value[0]);
	// 	$('.js-filter-price-to').val(value[1]);
	// });

	// каталог - фильтр - подсказка о количестве найденном
	$('.filter label').tooltipster({
		trigger: 'custom',
		triggerOpen: {
			click: true
		},
		triggerClose: {
			click: true,
			scroll: false
		},
		side: 'right',
		contentAsHTML: true,
		interactive: true,
		content: "Подобрано: <b>20</b> <a href='#'>Показать</a>"
	});

	// тултип общий инициализация
	$('.js-tooltip').tooltipster({
		interactive: true,
		theme: 'tooltipster-text'
	});

	// тултип простой инициализация
	$('.js-tooltip-simple').tooltipster({
		interactive: true,
		side: ['right']
	});

	// каталог - фильтр - сворачивание блока
	$('.js-filter-block').click(function () {
		$(this).toggleClass('is-active');
		$(this).next('div').slideToggle();
	});

	// шапка - язык
	$('.js-lang').click(function(e){
		e.preventDefault();
		$(this).toggleClass('is-active');
	});

	// шапка - телефоны
	$('.js-phones').on('click', (function(e){
			console.log(e.target);
			e.preventDefault();
			if ($(e.target).is('a, a *') && $(this).is('.is-open')){
				$('.header__phones--number').removeClass('is-active');
				$(e.target).addClass('is-active');
				$(this).removeClass('is-open');
			} else {
				$(this).toggleClass('is-open');
			}
		})
	);
	$('.js-phones').on('click', '.header__phones--number', (function(e) {
		// 	e.preventDefault();
		// 	if ($(this).is('.is-active')){
		// 		$(this).removeClass('is-active');
		// 	} else {
		// 		$(this).addClass('is-active');
		// 	}
		// })
	}));
	// $('.js-phones .header__phones--number.is-active').click(function(e){
	// 	$(this).siblings('.header__phones--number').removeClass('is-active');
	// 	$(this).addClass('is-active');
	// });

	// главная - карусель блога
	if ($('.js-carousel-blog').length > 0) {
		$('.js-carousel-blog').owlCarousel({
			loop: true,
			margin: 30,
			nav: true,
			dots: false,
			items: 3,
			slideBy: 2
		})
	}

	// главная - слайдер
	if ($('.js-carousel-slider').length > 0) {
		$('.js-carousel-slider').owlCarousel({
			loop: true,
			margin: 0,
			nav: true,
			dots: false,
			items: 1
		})
	}

	// инициализация карусели товаров
	if ($('.js-carousel-items').length > 0) {
		$('.js-carousel-items').owlCarousel({
			loop: true,
			margin: 30,
			nav: true,
			dots: false,
			items: 4,
			slideBy: 3
		})
	}

	// инициализация карусели брендов
	if ($('.js-carousel-brands').length > 0) {
		$('.js-carousel-brands').owlCarousel({
			loop: true,
			margin: 0,
			nav: true,
			dots: false,
			items: 5,
			slideBy: 4
		})
	}

	// fancybox defaults
	$('[data-fancybox]').fancybox({
		buttons : [
			'close'
		],
		onInit: function( instance, current ) {
			alert(1);
			// $.fancybox.close();
		}
	});

	// fancybox для попапов
	$('[data-fancypopup]').fancybox({
		buttons : [
			'close'
		],
		touch: false,
		beforeOpen: function( instance, current ) {
			$.fancybox.close();
		}
	});

	// мануал закрытие попапа
	$('.js-close-fancy').click(function(e){
		e.preventDefault();
		$.fancybox.close();
	});

	// проверка формы на required + анимация кнопки
	$(document).on("click", "button[type=submit], input[type=submit]", function(e){
		$(this).closest('form').find('[required]:visible').addClass('required');
		var that = this;
		$(this).addClass('is-progress');
		setTimeout(function(){
			$(that).removeClass('is-progress');
		}, 1000);
	});

	// маска телефона
	$('.js-mask-phone').mask('+38 (099) 999-99-99');

	// товар - скролл до отзывов
	$(document).on('click', '.js-product-commlink', function (event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 25
		}, 500);
	});

	// кнопка вверх страницы
	$(".js-totop").on("click",function(e){
		e.preventDefault();
		$("html,body").animate({scrollTop:0},700)
	});

});


// плагин плюс/минус количества товаров

var timeoutValidation;
function amountChange(event) {

	var $this = $(this),
		$amountEl = $this.closest('.js-amount'),
		$amountInput = $amountEl.find('.js-amount-input'),
		$amountVal = parseInt($amountInput.val()) || 0,
		$amountMin = parseInt($amountInput.data('min')) || parseInt($amountInput.attr('min')),
		$amountMax = parseInt($amountInput.attr('max')),
		$amountChangeVal = $amountVal;

	if (event.data.eventType) {
		switch (event.data.eventType) {
			case 'minus':

				$amountChangeVal = $amountVal - 1;

				if (($amountVal === $amountMin || $amountVal === 0) && !$amountInput.attr('onchange')) {
					$amountChangeVal = $amountMin;
				}

				if($amountChangeVal < $amountMin && !$amountInput.attr('min')) {
					$amountChangeVal = $amountMin;
				}

				break;
			case 'plus':
				$amountChangeVal = $amountVal + 1;
				// первый раз нажали
				if ($amountVal < $amountMin) {
					$amountChangeVal = $amountMin;
				}
				// достигли предел
				if ($amountVal == $amountMax) {
					return;
				}

				break;
			case 'validation-change':
				if ($(this).is(':focus')) {
					clearTimeout(timeoutValidation);
					timeoutValidation = setTimeout(function () {
						$this.trigger('validation-change');
					}, 500);
					return false;
				} else {
					clearTimeout(timeoutValidation);
				}

				if ($amountInput.val().length === 0) {
					return false;
				}

				// достигли предел
				if ($amountVal >= $amountMax) {
					$amountChangeVal = $amountMax;
				}
				if ($amountVal < $amountMin) {
					$amountChangeVal = $amountMin;
				}

				break;
			case 'keyup':

				return $amountInput.trigger('validation-change');
				break;
		}
	}

	$amountInput.val($amountChangeVal).change();
}
var timeIntervalHold;
$('.js-amount')
.on('click', '.js-amount-minus', {eventType: 'minus'}, amountChange)
.on('click', '.js-amount-plus', {eventType: 'plus'}, amountChange)
.on('mousedown touchstart', '.js-amount-plus, .js-amount-minus', function () {
	var $this = $(this);
	timeIntervalHold = setInterval(function () {
		$this.trigger('click')
	}, 200);
})
.on('mouseup mouseleave touchend', '.js-amount-plus, .js-amount-minus', function () {
	clearInterval(timeIntervalHold);
})
.on('keyup', '.js-amount-input', {eventType: 'keyup'}, amountChange)
//.on('input', '.js-amount-input', {eventType: 'validation-change'}, amountChange)
.on('validation-change', '.js-amount-input', {eventType: 'validation-change'}, amountChange);

// END плагин плюс/минус количества товаров