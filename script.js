$(document).ready(function() {
	
	function displayWeather (loc, weatherDesc, temp, temp_f) {
		$('.city').hide().html(loc).fadeIn("slow");
		$('.weather').hide().html(weatherDesc).fadeIn("slow");
		$('.temp').hide().html(temp).fadeIn("slow");
		var bg = updateBg(weatherDesc, temp_f);
		$('body').css('background', 'url(\'' + bg + '\') center center no-repeat')
			.css('background-size', 'cover');
	}
	
	function updateBg(weatherDesc, temp_f) {
		var descArr = [[['Thunderstorm', 'Rain', 'Drizzle', 'Hail', 'Mist'], 'img/rain.jpg'],
						[['Clear'], 'img/sunny-cold.jpg'],
						[['Snow', 'Ice'], 'img/snow.jpg'],
						[['Cloud', 'Overcast'], 'img/cloudy.jpg'],
						[['Fog'], 'img/fog.jpg'],
						[['Sand', 'Dust', 'Smoke', 'Ash', 'Haze', 'Whirls'], 'img/sand.jpg']
						];

		// For clear days, choose between 2 images based on temp. Here, warm sun; in array, cold sun.
		if (weatherDesc === 'Clear' && temp_f > 45) {
			return 'img/sunny-warm.jpg';
		}

		// Use indexOf to look for a match of the weatherDesc in the array of descriptions and when found, return the corresponding bg img
		for (i=0; i<descArr[i].length; i++) {
			for (j=0; j<descArr[i][0].length; j++) {
				if (weatherDesc.indexOf(descArr[i][0][j]) > -1) {
					return descArr[i][1];
				}
			}
		}
	}

	function changeTemp (temp) {
		$('.temp').hide().html(temp).fadeIn("slow");
	}
	
	function WeatherObj() {
		this.init = function () {
			var ipUrl = 'http://ip-api.com/json';
			$.getJSON(ipUrl, function(ipData) {
				// retrieve lat and lon from IP API
				var lat = ipData.lat;
				var lon = ipData.lon;
				// use this in URL for weather API
				var weatherUrl = 'http://api.wunderground.com/api/d5ff4c6afbc00f32/conditions/q/' + lat + ',' + lon + '.json';
				$.getJSON(weatherUrl, function(weatherData) {
					var loc = weatherData.current_observation.display_location.full;
					
					var temp_f = weatherData.current_observation.temp_f;

					var temp;
					if ($('input:radio[name=unit]:checked').val() === 'F') {
						temp = weatherData.current_observation.temp_f + "&#176; F";
					} else {
						temp = weatherData.current_observation.temp_c + "&#176; C";
					}
					
					var weatherDesc = weatherData.current_observation.weather;
					
					if ($('.city').html() === 'City') {
						displayWeather(loc, weatherDesc, temp, temp_f);
					} else {
						changeTemp(temp);
					}
				}, 'json');
			}, 'json');
		};
		this.init();
	}
	
	var myWeatherObj = new WeatherObj();
	
	$('.unit').change(function(){
		// update display
		var newWeatherObj = new WeatherObj();
	});
 
});
