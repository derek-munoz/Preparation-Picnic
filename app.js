const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const locationE1 = document.getElementById('location');
const weatherForecast = document.getElementById('weather-forecast');
const currentTempE1 = document.getElementById('current-temp');
let parkSelection = 0;
let bundlechoice = 0;
let dateSelection = "";
const locationEl = document.getElementById('location');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

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
        name: "McDowell Nature Center and Preserve",
        water: "yes",
        imgFile: "parks/mcDowell.jpg"
    },
    {
        name: "Independence Park",
        water: "no",
        imgFile: "parks/independence.jpg"
    },
    {
        name: "Midtown Park",
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
    const hour = time.getHours();
    const hoursFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = hoursFormat + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000)

getWeatherData()
function getWeatherData() {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=35.227085&lon=-80.843124&exclude=hourly,minutely&units=Imperial&appid=e936469d950b5f2f6f5dc8a008f7af5b`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
    })


}

function showWeatherData(data) {
    let { temp, humidity, pressure, sunrise, sunset, wind_speed } = data.current;

    timezone.innerHTML = data.timezone;
    locationEl.innerHTML = data.lat + 'N ' + data.lon + 'E'

    currentWeatherItemsEl.innerHTML =
        `<div class="weather-item">
        <div>Temp</div>
        <div>${temp}&#176; F</div>
    </div>  
    <div class="weather-item">
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
        <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
    </div>
    
    
    `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if (idx == 0) {
            currentTempEl.innerHTML = `<img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt * 1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176; F</div>
                <div class="temp">Day - ${day.temp.day}&#176; F</div>
            </div>
            
            `
        } else {
            otherDayForcast += `<div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176; F</div>
                <div class="temp">Day - ${day.temp.day}&#176; F</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}

function changeParkDisplay(value) {
    document.getElementById('pD').src = parks[value].imgFile;
    parkSelection = value;
    console.log(parkSelection);
    priceCalc();
}

function changeBundle(choice) {
    document.getElementById('purchaseID').setAttribute("style", "display:active");
    if (choice === 1) {
        document.getElementById('couplePic').setAttribute("style", "display:active; width:100%");
        document.getElementById('proposalPic').setAttribute("style", "display:none; width:100%");
        document.getElementById('groupPic').setAttribute("style", "display:none; width:100%");
        document.getElementById('foodChoice2').setAttribute("style", "display:none");
        document.getElementById('wineChoices').setAttribute("style", "display:none");
        bundlechoice = 1;
    }
    else if (choice === 2) {
        document.getElementById('proposalPic').setAttribute("style", "display:active; width:100%");
        document.getElementById('couplePic').setAttribute("style", "display:none; width:100%");
        document.getElementById('groupPic').setAttribute("style", "display:none; width:100%");
        document.getElementById('wineChoices').setAttribute("style", "display:active");
        document.getElementById('foodChoice2').setAttribute("style", "display:none");
        bundlechoice = 2;

    }
    else {
        document.getElementById('groupPic').setAttribute("style", "display:active; width:100%");
        document.getElementById('couplePic').setAttribute("style", "display:none; width:100%");
        document.getElementById('proposalPic').setAttribute("style", "display:none; width:100%");
        document.getElementById('wineChoices').setAttribute("style", "display:none");
        document.getElementById('foodChoice2').setAttribute("style", "display:active");
        bundlechoice = 3;

    }
    priceCalc();

}

function getdate(date) {
    dateSelection = date;
    console.log(dateSelection);
    priceCalc();
}

function priceCalc() {
    let price = 0;
    let weatherF = 1;

    if (parks[parkSelection].water === "yes") {
        price = price + 50;
    }

    if (bundlechoice === 1) {
        document.getElementById('finalPrice').textContent = "$" + ((150 + price) * weatherF);
    }
    else if (bundlechoice === 2) {
        document.getElementById('finalPrice').textContent = "$" + ((200 + price) * weatherF);

    }
    else {
        document.getElementById('finalPrice').textContent = "$" + ((300 + price) * weatherF);

    }
}