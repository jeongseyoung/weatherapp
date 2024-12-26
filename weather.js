<<<<<<< HEAD
//weather API key
//google map API key

//get latitude and longtitude
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault(); //새로고침실행을 방지
  const getCity = cityInput.value;
   
  if (getCity) {
    try {
      display(getCity);
    } catch {
      displayError("없는 도시입니다.");
    }
  } else displayError("도시를 입력하세요.");
});

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}

async function getLatLon(city) {
  const key = "a9de98f22dc1ace2ee4db7eb1429af36";
  try {
    let getData = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`
    ).then((response) => response.json());
    const latlon = [getData[0].lat, getData[0].lon];
    return latlon;
  } catch (error) {
    console.error("ERROR", error);
  }
}

//get weather data
async function getWeather(city) {
  console.log(city);
  let Lat_Lon = await getLatLon(city);
  const key = "a9de98f22dc1ace2ee4db7eb1429af36";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${Lat_Lon[0]}&lon=${Lat_Lon[1]}&appid=${key}`;
  //let weather = null;
  try {
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    console.error("ERROR", error);
  }
  console.log("getWeather ", weather);
}

async function display(getCity) {
  const weatherData = await getWeather(getCity);
  console.log(weatherData);
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ main, description, id, icon }],
    wind: { deg, speed },
  } = weatherData;

  let temp_celsius = temp - 273.15;
  let temp_fahrenheit = temp_celsius * 1.8 + 32;

  console.log(
    city + "의 기온",
    Math.floor(temp_celsius) + "℃ / " + Math.floor(temp_fahrenheit) + "℉"
  );
  console.log(description);
  console.log("습도", humidity, "%");
  console.log("풍속", speed, "m/s");
  console.log(main);

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const windDisplay = document.createElement("p");
  const descriptionDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `기온 : ${Math.floor(temp_celsius)}℃`;
  humidityDisplay.textContent = `습도 : ${humidity}%`;
  windDisplay.textContent = `풍속 : ${speed}m/s`;
  descriptionDisplay.textContent = description;
  weatherEmoji.textContent = getEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  windDisplay.classList.add("windDisplay");
  descriptionDisplay.classList.add("descriptionDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(windDisplay);
  card.appendChild(descriptionDisplay);
  card.appendChild(weatherEmoji);
}

function getEmoji(id) {
  console.log("id", id);
  if (id >= 200 && id < 300) return "⛈️";
  else if (id >= 300 && id < 400) return "☔";
  else if (id >= 500 && id < 600) return "☔";
  else if (id >= 600 && id < 700) return "❄️";
  else if (id >= 700 && id < 800) return "🌫️";
  else if (id === 800) return "☀️";
  else if (id >= 801 && id < 810) return "☁️";
  else return "❓";
}
// async function getMap() {
//   const Lat_Lon = await getLatLon("Seoul");
//   try {
//     let map = new google.maps.Map(document.getElementById("google-map"), {
//       center: {
//         lat: Lat_Lon[0],
//         lng: Lat_Lon[1],
//       },
//       zoom: 15,
//     });
//   } catch (error) {
//     console.error("FAILED TO LOAD GOOGLE MAP", error);
//   }
//   //console.log("map", map);
// }

//display("Seoul");
=======
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
>>>>>>> 74d18d9965c436cb44305ff977823a176972569d
