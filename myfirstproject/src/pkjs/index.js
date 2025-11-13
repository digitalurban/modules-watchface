// Clay configuration - handles settings UI automatically
var Clay = require('pebble-clay');
var clayConfig = require('./config');
var clay = new Clay(clayConfig);

var WEATHER_API_KEY = '680df99f9c264bde83a142148250811';
var WEATHER_API_URL = 'http://api.weatherapi.com/v1/current.json';

// Import message keys
var MessageKeys = require('message_keys');
console.log('MessageKeys loaded: ' + JSON.stringify(MessageKeys));

// Weather icon mapping
var ICON_MAP = {
  'sunny': 0,
  'clear': 0,
  'partly cloudy': 1,
  'cloudy': 1,
  'overcast': 1,
  'mist': 1,
  'fog': 1,
  'patchy rain': 2,
  'rain': 2,
  'light rain': 2,
  'moderate rain': 2,
  'heavy rain': 2,
  'patchy snow': 3,
  'snow': 3,
  'light snow': 3,
  'moderate snow': 3,
  'heavy snow': 3,
  'blizzard': 3
};

function getWeatherIcon(condition) {
  if (!condition) return 1; // Default to cloud
  
  var conditionLower = condition.toLowerCase();
  
  for (var key in ICON_MAP) {
    if (conditionLower.indexOf(key) !== -1) {
      return ICON_MAP[key];
    }
  }
  
  return 1; // Default to cloud
}

function fetchWeather(location, useCelsius) {
  console.log('Fetching weather for: ' + location);
  
  var url = WEATHER_API_URL + '?key=' + WEATHER_API_KEY + '&q=' + encodeURIComponent(location);
  
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      try {
        var response = JSON.parse(xhr.responseText);
        console.log('Weather response: ' + JSON.stringify(response));
        
        var temperature = useCelsius ? response.current.temp_c : response.current.temp_f;
        var condition = response.current.condition.text;
        var iconCode = getWeatherIcon(condition);
        
        console.log('Sending weather: ' + temperature + '°, ' + condition + ', icon: ' + iconCode);
        
        // Send weather data to watch
        var dictionary = {};
        dictionary[MessageKeys.Temperature] = Math.round(temperature);
        dictionary[MessageKeys.Condition] = condition;
        dictionary[MessageKeys.WeatherIcon] = iconCode;
        
        console.log('Dictionary keys: ' + Object.keys(dictionary).join(', '));
        console.log('Dictionary values: ' + JSON.stringify(dictionary));
        
        Pebble.sendAppMessage(dictionary,
          function() {
            console.log('Weather data sent successfully');
          },
          function(e) {
            console.log('Failed to send weather data: ' + JSON.stringify(e));
          }
        );
      } catch (e) {
        console.log('Error parsing weather response: ' + e);
      }
    } else {
      console.log('Weather request failed with status: ' + xhr.status);
    }
  };
  
  xhr.onerror = function() {
    console.log('Weather request error');
  };
  
  xhr.send();
}

function locationSuccess(pos) {
  var coords = pos.coords.latitude + ',' + pos.coords.longitude;
  console.log('Got location: ' + coords);
  
  var settings = JSON.parse(localStorage.getItem('clay-settings')) || {};
  var useCelsius = (settings.TemperatureUnit && settings.TemperatureUnit.value) || false;
  
  fetchWeather(coords, useCelsius);
}

function locationError(err) {
  console.log('Location error: ' + err.message);
  
  // Fall back to ZIP code if available
  var settings = JSON.parse(localStorage.getItem('clay-settings')) || {};
  var zipCode = (settings.ZipCode && settings.ZipCode.value) || '';
  var useCelsius = (settings.TemperatureUnit && settings.TemperatureUnit.value) || false;
  
  if (zipCode && zipCode.length > 0) {
    fetchWeather(zipCode, useCelsius);
  } else {
    console.log('No fallback location available');
  }
}

function getWeather() {
  var settings = JSON.parse(localStorage.getItem('clay-settings')) || {};
  var useGPS = (settings.UseGPS && settings.UseGPS.value !== false); // Default to true
  var zipCode = (settings.ZipCode && settings.ZipCode.value) || '';
  var useCelsius = (settings.TemperatureUnit && settings.TemperatureUnit.value) || false;
  
  console.log('Getting weather - GPS: ' + useGPS + ', ZIP: ' + zipCode);
  
  if (useGPS) {
    // Use GPS location
    navigator.geolocation.getCurrentPosition(
      locationSuccess,
      locationError,
      {
        timeout: 15000,
        maximumAge: 60000
      }
    );
  } else if (zipCode.length > 0) {
    // Use manual ZIP code/city
    fetchWeather(zipCode, useCelsius);
  } else {
    console.log('No location method configured');
  }
}

// Listen for when the watchface is opened
Pebble.addEventListener('ready', function() {
  console.log('PebbleKit JS ready!');
  
  // Get initial weather
  getWeather();
});

// Listen for messages from the watch
Pebble.addEventListener('appmessage', function(e) {
  console.log('AppMessage received: ' + JSON.stringify(e.payload));
  
  // Watch is requesting weather update
  if (e.payload.Temperature !== undefined) {
    getWeather();
  }
});

// Listen for when settings are saved
Pebble.addEventListener('webviewclosed', function(e) {
  if (e && !e.response) {
    return;
  }
  
  // Settings were saved, send them to the watch
  var settings = JSON.parse(e.response);
  console.log('Settings received: ' + JSON.stringify(settings));
  
  // Send settings to watch
  var dictionary = {};
  dictionary[MessageKeys.TemperatureUnit] = (settings.TemperatureUnit && settings.TemperatureUnit.value) ? 1 : 0;
  dictionary[MessageKeys.UseGPS] = (settings.UseGPS && settings.UseGPS.value !== false) ? 1 : 0;
  dictionary[MessageKeys.ZipCode] = (settings.ZipCode && settings.ZipCode.value) || '';
  
  console.log('Sending settings to watch: ' + JSON.stringify(dictionary));
  
  Pebble.sendAppMessage(dictionary,
    function() {
      console.log('Settings sent successfully');
      // Refresh weather with new settings
      getWeather();
    },
    function(e) {
      console.log('Failed to send settings: ' + JSON.stringify(e));
    }
  );
});
