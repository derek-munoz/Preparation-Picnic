const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItemsE1 = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const locationE1 = document.getElementById('location');
const weatherForecast = document.getElementById('weather-forecast');
const currentTempE1 = document.getElementById('current-temp');
let parkSelection = 0;

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const parks = [
    {
        name: "Freedom Park",
        water: "yes",
        imgFile: "parks/freedom_park.jpg"
    },
    {
        name: "Romare Bearden Park",
        water: "no",
        imgFile: "parks/romare_bearden.jpg"
    },
    {
        name: "First Ward Park",
        water: "no",
        imgFile: "parks/first_ward.jpg"
    },
    {
        name:"McDowell Nature Center and Preserve",
        water: "yes",
        imgFile: "parks/mcDowell.jpg"
    },
    {
        name:"Independence Park",
        water: "no",
        imgFile: "parks/independence.jpg"
    },
    {
        name:"Midtown Park",
        water: "no",
        imgFile: "parks/midtown.jpg"
    },
    {
        name: "Anne Springs Close Greenway",
        water: "yes",
        imgFile: "parks/anne_springs.jpg"
    },
    {
        name: "Latta Nature Preserve",
        water: "yes",
        imgFile: "parks/latta_nature.jpg"
    },
    {
        name: "Latta Park",
        water: "no",
        imgFile: "parks/latta_park.jpg"
    },
    {
        name: "Reedy Creek Park",
        water: "yes",
        imgFile: "parks/reedy.jpg"
    }
]
// callback function
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHour();
    const hoursFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeE1.innerHTML = hoursFormat + ':' + minutes+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateE1.innerHTML = days[day] + ', ' +date+ ' ' + months[month]

}, 1000)

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${35.2271}&lon=${80.8431}&exclude=hourly,minutely&units=metric&appid=${AIzaSyCGoEVirZsw8wK3qM3cVgH9VVtTUqZo_Jk}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;
    locationEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}

function changeParkDisplay(value) {
    document.getElementById('pD').src = parks[value].imgFile;
    parkSelection = value;
    console.log(parkSelection)
}
