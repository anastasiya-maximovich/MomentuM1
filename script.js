// DOM elements
const time = document.querySelector('.time')
const dateLabel = document.querySelector('.date-label')
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
const focus = document.querySelector('.focus')
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const reverseBtn = document.querySelector('.reverse-btn')
const weatherIcon = document.querySelector('.weather-icon')
const city = document.querySelector('.city')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const windSpeed = document.querySelector('.wind-speed')
const humidity = document.querySelector('.humidity')
const wrongCity = document.querySelector('.wrong-city')
const changeBG = document.querySelector('.change-bg')
const line = document.querySelector('.line')
const changeBGLeft = document.querySelector('.change-bg-left')
const changeBGRight = document.querySelector('.change-bg-right')
const inputElement = document.querySelector('.input-el')

function showTime(){
    let day = new Date()
    let hour = day.getHours()
    let min = day.getMinutes()
    let sec = day.getSeconds()

    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`

    setTimeout(showTime, 1000)
}

function addZero(number){
    return (parseInt(number, 10) < 10 ? '0' : '') + number;
}

function showDate(){
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    let date = new Date()

    let day = days[date.getDay()]
    let month = months[date.getMonth()]


    dateLabel.innerHTML = `${day}, ${date.getDate()} ${month}`
}


// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
      hour = today.getHours();
      min = today.getMinutes();
      sec = today.getSeconds();

    if(hour >= 6 && hour<= 11 && min<=59 && sec <= 59){
        // Morning
        greeting.textContent = "Good morning, "
        document.body.style.backgroundImage = "url('images/morning/10.jpg')"
        changeIconsColorsToDark()
    } else if (hour >= 12 && hour<= 17 && min<=59 && sec <= 59){
        // Day
        greeting.textContent = "Good day, "
        document.body.style.backgroundImage = "url('images/day/06.jpg')"
        changeIconsColorsToDark()
    } else if (hour >= 18 && hour<= 23 && min<=59 && sec <= 59){
        // Evening
        greeting.textContent = "Good evening, "
        document.body.style.backgroundImage = "url('images/evening/01.jpg')"
        document.body.style.color = "white"
        changeIconsColorsToLight()
    } else if (hour >= 0 && hour<= 5 && min<=59 && sec <= 59){
        // Night
        greeting.textContent = "Good night, "
        document.body.style.backgroundImage = "url('images/night/02.jpg')"
        document.body.style.color = "white"
        changeIconsColorsToLight()
    }
  }

  function changeIconsColorsToDark(){
    line.style.setProperty('background-color', 'black')
    reverseBtn.style.setProperty('background-image', 'url(./icons/refresh-icon.png)')
    changeBGLeft.style.setProperty('background-image', 'url(./icons/left-icon.png)')
    changeBGRight.style.setProperty('background-image', 'url(./icons/rigth-icon.png)')
  }

  function changeIconsColorsToLight(){
    line.style.setProperty('background-color', 'white')
    reverseBtn.style.setProperty('background-image', 'url(./icons/refresh-icon.png)')
    changeBGLeft.style.setProperty('background-image', 'url(./icons/left-icon.png)')
    changeBGRight.style.setProperty('background-image', 'url(./icons/rigth-icon.png)')
  }
  
  // Get Name
  function getName() {
    if (localStorage.getItem('name') === null) {
      name.textContent = '[Enter Name]';
    } else {
      name.textContent = localStorage.getItem('name');
    }
  }
  
  // Set Name
  function setName(e) {
    if (e.type === 'keypress') {
      // Make sure enter is pressed
      if (e.which == 13 || e.keyCode == 13) {
        if(name.textContent === ""){
            getName();
            name.blur();
        } else {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
        }
    } else {
       if(name.textContent === ""){
           getName();
       } else {
        localStorage.setItem('name', e.target.innerText); 
       }
    }    
    }

  function clearName(){
      name.textContent = ""
  }
  
  // Get Focus
  function getFocus() {
    if (localStorage.getItem('focus') === null) {
      focus.textContent = '[Enter Focus]';
    } else {
      focus.textContent = localStorage.getItem('focus');
    }
  }
  
  // Set Focus
  function setFocus(e) {
    if (e.type === 'keypress') {
      // Make sure enter is pressed
      if (e.which == 13 || e.keyCode == 13) {
        if(focus.textContent === ""){
            getFocus();
            focus.blur();
        } else {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
        }
    } else {
       if(focus.textContent === ""){
           getFocus();
       } else {
        localStorage.setItem('focus', e.target.innerText); 
       }
    }    
}

    // Clear Focus
    function clearFocus(){
        focus.textContent = ""
    }

    // Get City
  function getCity() {
    if (localStorage.getItem('city') === null) {
      city.textContent = '[Enter City]';
    } else {
      city.textContent = localStorage.getItem('city');
    }
  }
  
  // Set City
  function setCity(e) {
    if (e.type === 'keypress') {
      // Make sure enter is pressed
      if (e.which == 13 || e.keyCode == 13) {
        if(city.textContent === ""){
            getCity();
            city.blur();
        } else {
            localStorage.setItem('city', e.target.innerText);
            city.blur();
            getWeather(city.textContent)
        }
        }

    } else {
       if(city.textContent === ""){
           getCity();
       } else {
        localStorage.setItem('city', e.target.innerText);
        getWeather(city.textContent) 
       }
    }    
    }

  // Clear city
  function clearCity(){
      city.textContent = ""
      wrongCity.textContent = ""
  }

    

    // Get quote
    async function getQuote() {  
        const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
        const res = await fetch(url);
        const data = await res.json(); 
        quote.textContent = data.quote.quoteText;
        author.textContent = data.quote.quoteAuthor;
    }


    // Get weather
    async function getWeather(city){
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=dd6be90a16121aee247f2cb12a37afb2&units=metric`;
        try {
          const res = await fetch(url);
          const data = await res.json();
          weatherIcon.className = "weather-icon owf";
          weatherIcon.classList.add(`owf-${data.weather[0].id}`);
          weatherIcon.classList.add(`owf-5x`);
          temperature.textContent = `${data.main.temp.toFixed(0)}ºC`;
          weatherDescription.textContent = `${data.weather[0].description}`;
          windSpeed.textContent = `wind-speed: ${data.wind.speed.toFixed(0)}m/s`;
          humidity.textContent = `humidity: ${data.main.humidity}%`;
        } catch {
          wrongCity.textContent = "Wrong city"
          temperature.textContent = "NoneºC"
          weatherDescription.textContent = "description"
          windSpeed.textContent = "wind-speed"
          humidity.textContent = "humidity"
        }
    }
  // Run
  showTime();
  showDate()
  setBgGreet();
  getName();
  getFocus();
  getCity();


  // DOM events    
  document.addEventListener('DOMContentLoaded', getQuote);
  document.addEventListener('DOMContentLoaded', getWeather(city.textContent));
  reverseBtn.addEventListener('click', getQuote);
  name.addEventListener('keypress', setName);
  name.addEventListener('blur', setName);
  name.addEventListener('click', clearName);
  focus.addEventListener('keypress', setFocus);
  focus.addEventListener('blur', setFocus);
  focus.addEventListener('click', clearFocus);
  city.addEventListener('keypress', setCity)
  city.addEventListener('blur', setCity)
  city.addEventListener('click', clearCity)