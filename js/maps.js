// список маркеров (для примера)
var markersPoints = [
	['point__20', 50.515716, 30.239726, '<b>Отделение № 1, ул. Тараса Шевченка</b> Пн—Пт: с 9:00 до 20:00,<br>Сб—Вс: выходной<b>+38 098 780 70 70<br>+38 098 780 70 70</b>'],
	['point__21', 48.156881, 23.305831, '<b>Отделение № 2, ул. Тараса Шевченка</b> Пн—Пт: с 9:00 до 20:00,<br>Сб—Вс: выходной<b>+38 098 780 70 70<br>+38 098 780 70 70</b>'],
	['point__23', 50.443124, 30.513517, '<b>Отделение № 3, ул. Тараса Шевченка</b> Пн—Пт: с 9:00 до 20:00,<br>Сб—Вс: выходной<b>+38 098 780 70 70<br>+38 098 780 70 70</b>']
];

var map;

// карта складов самовывоза
if (jQuery('#sklad_map').length > 0) {

	// клик по маркеру
	$('.js-cart-map-list').on('click', 'label', function(e){
		var id = $(this).data('id');
		var i_index;
		markersPoints.forEach((element, index) => {
			if(element[0] === id) {
				i_index = index;
			}
		});
		map.panTo(new google.maps.LatLng(markersPoints[i_index][1], markersPoints[i_index][2]));
	});

	var gMarkers = [];

	//инит карты
	var mapOptions = {
		zoom: 10,
		center: new google.maps.LatLng(markersPoints[0][1], markersPoints[0][2]),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
		zoomControl: false,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE,
			position: google.maps.ControlPosition.LEFT_CENTER
		}
	};
	map = new google.maps.Map(document.getElementById('sklad_map'), mapOptions);

	// добавление точек на карту
	var markers = [];
	var i = 0;
	for (i = 0; i < markersPoints.length; i++) {
		addMarker(markersPoints[i]);
	}
	function addMarker(marker) {
		var lat = marker[1],
			lng = marker[2];

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng),
			map: map
		});
	}

}

// карта складов новой почты
if (jQuery('#npmap__place').length > 0) {

	// клик по маркеру
	$('.js-cart-np-map-list').on('click', '.npmap__item', function(e){
		var id = $(this).data('id');
		var i_index;
		markersPoints.forEach((element, index) => {
			if(element[0] === id) {
				i_index = index;
			}
		});
		map.panTo(new google.maps.LatLng(markersPoints[i_index][1], markersPoints[i_index][2]));
	});

	var gMarkers = [];

	//инит карты
	var mapOptions = {
		zoom: 10,
		center: new google.maps.LatLng(markersPoints[0][1], markersPoints[0][2]),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE,
			position: google.maps.ControlPosition.LEFT_CENTER
		}
	};
	map = new google.maps.Map(document.getElementById('npmap__place'), mapOptions);

	// добавление точек на карту
	var markers = [];
	var i = 0;
	for (i = 0; i < markersPoints.length; i++) {
		addMarker(markersPoints[i]);
	}
	function addMarker(marker) {
		var lat = marker[1],
			lng = marker[2],
			text = marker[3]
		;
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng),
			map: map,
			icon: {
				url: "../images/map_marker.png",
				size: new google.maps.Size(64, 64),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(32, 32),
				scaledSize: new google.maps.Size(64, 64)
			}
		});
		var info = new SnazzyInfoWindow({
			marker: marker,
			content: text,
			placement: 'right',
			closeOnMapClick: false
		});
	}

}