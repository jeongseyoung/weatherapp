//weather API key 
//google map API key 

//get latitude and longtitude
async function getLatLon(city) {
    const key = "";
    try {
        let getData = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`)
                            .then(response => response.json());
        const latlon = [getData[0].lat, getData[0].lon];
        return latlon;
    } catch(error) {
        console.error("ERROR", error);
    }
}

//get weather data
async function getWeather(city) {
    let Lat_Lon = await getLatLon(city);
    const key = "";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${Lat_Lon[0]}&lon=${Lat_Lon[1]}&appid=${key}`;
    //let weather = null;    
    try {
         return await fetch(url).then(response => response.json())
    } catch(error) {
        console.error("ERROR", error);
    }
    console.log(weather);
}

async function display(getCity) {
    const weather = await getWeather(getCity);
        const {
                name: city,
                main: {temp, humidity},
                weather: [{main, description, id, icon}],
                wind: {deg, speed}
            } = weather;

        let temp_celsius = temp - 273.15;
        let temp_fahrenheit = temp_celsius * 1.8 +32;

        console.log(city + "의 기온",  Math.floor(temp_celsius) + "℃ / " + Math.floor(temp_fahrenheit) + "℉");
        console.log(description)
        console.log("습도", humidity, "%");
        console.log("풍속", speed, "m/s");
        console.log(main);
}

async function getMap() {
    const Lat_Lon = await getLatLon("Seoul");
    try { 
        let map = new google.maps.Map(document.getElementById("google-map"), {
        center: {
            lat: Lat_Lon[0],
            lng: Lat_Lon[1]
        },
        zoom: 15
        });
    } catch(error) {
        console.error("FAILED TO LOAD GOOGLE MAP", error);
    }
    //console.log("map", map);
}

display("Seoul");