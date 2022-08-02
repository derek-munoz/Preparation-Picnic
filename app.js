var button = document.querySelector(".button")
var inputValue = document.querySelector(".inputValue")
var name = document.querySelector(".name");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");

button.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=e936469d950b5f2f6f5dc8a008f7af5b')
    .then(response => response.json())
    .then(data =>{
        var nameValue = data['name'];
        var tempValue = data['main']['temp'];
        var descValue = data['weather'][0]['description'];

        name.innerHTML = nameValue;
        temp.innerHTML = tempF(tempValue);
        desc.innerHTML = descValue;

    })

.catch(err => alert("Wrong city name!"))
})

function tempF(kelvin) {
    var num = ((kelvin-273.15)*1.8)+32;
    num = num.toFixed(2);
    return num;
}

const parks = [
    {
        name: "Freedom Park",
        water: "yes"
    },
    {
        name: "Romare Bearden Park",
        water: "no"
    },
    {
        name: "First Ward Park",
        water: "no"
    },
    {
        name:"McDowell Nature Center and Preserve",
        water: "yes"
    },
    {
        name:"Independence Park",
        water: "no"
    },
    {
        name:"UNC Botanical Gardens",
        water: "no"
    },
    {
        name: "Anne Springs Close Greenway",
        water: "yes"
    },
    {
        name: "Latta Nature Preserve",
        water: "yes"
    },
    {
        name: "Latta Park",
        water: "no"
    },
    {
        name: "Reedy Creek Park",
        water: "yes"
    }
]
