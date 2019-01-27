function obtenerCoordenadas() {
    if ("geolocation" in navigator) {
        document.querySelector('#data').className += " none";
        document.querySelector('#titulodos').className += " none";
        document.querySelector('#icon').className += " none";
        document.querySelector('#title').className += "bg-danger";
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
         consulta(lat, lon);
    });
        
        } else { 
            
    }
}

function consulta(lat,lon) {
    const API_KEY = `4d66756d2f1463d481841de10d882e5a`;
    const URL = 'https://api.openweathermap.org/data/2.5/weather';
    const URL_API = `${URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(URL_API).then(data => {
         return data.json();
     }).then(weather_data => {
         const data = weather_data;
         console.log(transformarDatos(data));
     });
 }


 obtenerCoordenadas();

 function transformarDatos(weather_data) {
    const city = weather_data.name;
    const { weather } = weather_data;
    const { humidity, temp } = weather_data.main;
    const { speed } = weather_data.wind;
    const weatherState = getWeatherState(weather);
    const temperature = getTemp(temp);
    const {pressure} = weather_data.main;
    
    const data = {
        city,
        humidity: `${humidity} %`,
        temperature: `${temperature}ºC`,
        weatherState,
        wind: `${speed} m/s`,
        presion: `${pressure} hPa`,
    };
    dom(data.city, data.humidity, data.temperature, data.wind, data.weatherState, data.presion);
}

// SETEO DE ICONOS SEGUN EL TIEMPO METEOROLOGICO
function getWeatherState(weather) {
    const { id } = weather[0];
    const CLOUDY =  "cloudy.svg";
    const SUN = "sunny.svg";
    const RAIN =  "rain.svg";
    const SNOW = "snowflake.svg";
    const THUNDER = "flash.svg";
    const DRIZZLE = "drop.svg";

    if(id< 300) {
        return THUNDER;
    } else if (id < 400) {
        return DRIZZLE;
    } else if (id < 600) {
        return RAIN;
    } else if (id < 700) {
        return SNOW;
    } else if (id === 800) {
        return SUN;
    } else {
        return CLOUDY;
    }
}

// transformar temperatura de K a C
function getTemp(temp) {
    const K = 273.15;
    let temperature = (temp - K).toFixed(1);
    return temperature;
}

//modificacion del DOM
function dom(city, humidity, temperature, wind, weather, presion) {
    document.querySelector('#titulouno').className += " none";
    document.querySelector('.wait').className += " none";
    document.querySelector('#title').classList.remove("bg-danger");
    document.querySelector('#title').className += "bg-success";
    document.querySelector('#titulodos').classList.remove("none");
    document.querySelector('#icon').classList.remove("none");
    document.querySelector('#data').classList.remove("none");
    document.querySelector('#ciudad').innerHTML = city;
    document.querySelector('#humedad').innerHTML = humidity;
    document.querySelector('#temperatura').innerHTML = temperature;
    document.querySelector('#viento').innerHTML = wind;
    document.querySelector('#presion').innerHTML = presion;
    document.querySelector('#svgicon').setAttribute("src", `img/${weather}`);
}