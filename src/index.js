const locationInputUs = document.querySelector('.location-input-us')
const locationInputZip = document.querySelector('.location-input-zip')
const locationSearchButton = document.querySelector('.location-inputs-search-button')

const city = document.querySelector('.city')
const states = document.querySelector('.states')

// ***** CURRENT WEATHER DOM VARIABLES *****

const currentWeatherContainer = document.querySelector('.current-weather')
const currentWeatherTitleCity = document.querySelector('.current-weather-title-city')
const currentWeatherTitleState = document.querySelector('.current-weather-title-state')
const currentWeatherTemperature = document.querySelector('.current-weather-temperature')
const currentWeatherCondition = document.querySelector('.current-weather-condition')
const currentWeatherSvg = document.querySelector('.current-weather-svg')
const currentWeatherHigh = document.querySelector('.current-weather-high')
const currentWeatherLow = document.querySelector('.current-weather-low')

// ***** FORECAST DOM VARIABLES *****

const sevenDayForecastContainer = document.querySelector('.seven-day-forecast-container')

locationSearchButton.addEventListener('click', async () => {
    timeOfDayColors()

    const key = 'ae0aad49efd890348b878da1481b397c'

    // ******* CURRENT WEATHER API CALL *******
    
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value},${states.value},us&appid=${key}`

    const currentWeatherResponse = await fetch(currentWeatherUrl)
    const currentWeatherData = await currentWeatherResponse.json()
    

    // ******* FORECAST WEATHER API CALL *******
    
    const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentWeatherData.coord.lat}&lon=${currentWeatherData.coord.lon}&appid=${key}`
    
    const forecastResponse = await fetch(forecastWeatherUrl)
    const forecastData = await forecastResponse.json()

    const sevenDayForecast = forecastData.daily.slice().splice(1, 7)

    for(let i = 0; i < 56; i++) {
        if(states[i].value == states.value) {
            currentWeatherTitleState.textContent = states[i].textContent
        }
    }

    currentWeatherTitleCity.textContent = currentWeatherData.name + ', '
    currentWeatherTemperature.innerHTML =  `${Math.round((((currentWeatherData.main.temp - 273.15)) * 9/5) + 32)}&#176;`
    currentWeatherCondition.textContent = currentWeatherData.weather[0].main
    currentWeatherHigh.innerHTML = `${Math.round((((forecastData.daily[0].temp.max - 273.15)) * 9/5) + 32)}&#176;`
    currentWeatherLow.innerHTML = `${Math.round((((forecastData.daily[0].temp.min - 273.15)) * 9/5) + 32)}&#176;`

    if(forecastData.daily[0].weather[0].main == 'Rain') {
        currentWeatherSvg.setAttribute( 'src','./svgs/rainy-1.svg')
    } else if(forecastData.daily[0].weather[0].main == 'Clear') {
        currentWeatherSvg.setAttribute( 'src','./svgs/day.svg')
    } else if(forecastData.daily[0].weather[0].main == 'Clouds' || forecastData.daily[0].weather[0].main == 'Haze') {
        currentWeatherSvg.setAttribute( 'src','./svgs/cloudy-day-1.svg')
    } else {
        currentWeatherSvg.setAttribute( 'src','./svgs/thunder.svg')
    }

    console.log(forecastData.daily[0].weather[0].main)

    currentWeatherContainer.classList.remove('null')

    gsap.from('.current-weather', { opacity: 0, delay: .5, duration: 1, y: 100 })

    // FORECAST MAP

    sevenDayForecastContainer.innerHTML = ``

    sevenDayForecast.map( (forecastInfo, x) => {

        const svgImageForecast = () => {
            if(forecastInfo.weather[0].main == 'Rain') {
                return './svgs/rainy-1.svg'
            } else if(forecastInfo.weather[0].main == 'Clear') {
                return './svgs/day.svg'
            } else if(forecastInfo.weather[0].main == 'Clouds') {
                return './svgs/cloudy-day-1.svg'
            } else {
                return './svgs/thunder.svg'
            }
        }

        sevenDayForecastContainer.innerHTML += `
            <div class="days-forecast-container forecast-container-${x}">
                <h2 class="forecast-day-${x} forecast-day">Sun</h2>
                <img class="forecast-svg" src=${svgImageForecast()} alt="">
                <h3 class="forecast-high-low">
                    <span class="forecast-high">${
                        Math.round((((forecastInfo.temp.max - 273.15)) * 9/5) + 32)
                    }&#176;</span> / <span class="forecast-low">${
                        Math.round((((forecastInfo.temp.min - 273.15)) * 9/5) + 32)
                    }&#176;</span>
                </h3>
            </div>
        `
    })

    const todaysDate = new Date().getDay()

    switch(todaysDate) {
        case 0:
            document.querySelector('.forecast-day-0').textContent = 'Mon'
            document.querySelector('.forecast-day-1').textContent = 'Tues'
            document.querySelector('.forecast-day-2').textContent = 'Wed'
            document.querySelector('.forecast-day-3').textContent = 'Thu'
            document.querySelector('.forecast-day-4').textContent = 'Fri'
            document.querySelector('.forecast-day-5').textContent = 'Sat'
            document.querySelector('.forecast-day-6').textContent = 'Sun'
            break
        case 1:
            document.querySelector('.forecast-day-0').textContent = 'Tues'
            document.querySelector('.forecast-day-1').textContent = 'Wed'
            document.querySelector('.forecast-day-2').textContent = 'Thu'
            document.querySelector('.forecast-day-3').textContent = 'Fri'
            document.querySelector('.forecast-day-4').textContent = 'Sat'
            document.querySelector('.forecast-day-5').textContent = 'Sun'
            document.querySelector('.forecast-day-6').textContent = 'Mon'
            break
        case 2:
            document.querySelector('.forecast-day-0').textContent = 'Wed'
            document.querySelector('.forecast-day-1').textContent = 'Thu'
            document.querySelector('.forecast-day-2').textContent = 'Fri'
            document.querySelector('.forecast-day-3').textContent = 'Sat'
            document.querySelector('.forecast-day-4').textContent = 'Sun'
            document.querySelector('.forecast-day-5').textContent = 'Mon'
            document.querySelector('.forecast-day-6').textContent = 'Tues'
            break
        case 3:
            document.querySelector('.forecast-day-0').textContent = 'Thu'
            document.querySelector('.forecast-day-1').textContent = 'Fri'
            document.querySelector('.forecast-day-2').textContent = 'Sat'
            document.querySelector('.forecast-day-3').textContent = 'Sun'
            document.querySelector('.forecast-day-4').textContent = 'Mon'
            document.querySelector('.forecast-day-5').textContent = 'Tues'
            document.querySelector('.forecast-day-6').textContent = 'Wed'
            break
        case 4:
            document.querySelector('.forecast-day-0').textContent = 'Fri'
            document.querySelector('.forecast-day-1').textContent = 'Sat'
            document.querySelector('.forecast-day-2').textContent = 'Sun'
            document.querySelector('.forecast-day-3').textContent = 'Mon'
            document.querySelector('.forecast-day-4').textContent = 'Tues'
            document.querySelector('.forecast-day-5').textContent = 'Wed'
            document.querySelector('.forecast-day-6').textContent = 'Thu'
            break
        case 5:
            document.querySelector('.forecast-day-0').textContent = 'Sat'
            document.querySelector('.forecast-day-1').textContent = 'Sun'
            document.querySelector('.forecast-day-2').textContent = 'Mon'
            document.querySelector('.forecast-day-3').textContent = 'Tues'
            document.querySelector('.forecast-day-4').textContent = 'Wed'
            document.querySelector('.forecast-day-5').textContent = 'Thu'
            document.querySelector('.forecast-day-6').textContent = 'Fri'
            break
        case 6:
            document.querySelector('.forecast-day-0').textContent = 'Sun'
            document.querySelector('.forecast-day-1').textContent = 'Mon'
            document.querySelector('.forecast-day-2').textContent = 'Tues'
            document.querySelector('.forecast-day-3').textContent = 'Wed'
            document.querySelector('.forecast-day-4').textContent = 'Thu'
            document.querySelector('.forecast-day-5').textContent = 'Fri'
            document.querySelector('.forecast-day-6').textContent = 'Sat'
            break
        default:
    }

    gsap.from('.forecast-container-0', { opacity: 0, delay: 1.7, duration: .5, y: 100 })
    gsap.from('.forecast-container-1', { opacity: 0, delay: 1.9, duration: .5, y: 100 })
    gsap.from('.forecast-container-2', { opacity: 0, delay: 2.1, duration: .5, y: 100 })
    gsap.from('.forecast-container-3', { opacity: 0, delay: 2.3, duration: .5, y: 100 })
    gsap.from('.forecast-container-4', { opacity: 0, delay: 2.5, duration: .5, y: 100 })
    gsap.from('.forecast-container-5', { opacity: 0, delay: 2.7, duration: .5, y: 100 })
    gsap.from('.forecast-container-6', { opacity: 0, delay: 2.9, duration: .5, y: 100 })
})

const time = new Date().getHours()

const timeOfDayColors = () => {
    if(time > 5 && time < 12) {
        document.querySelector('body').style.background = 'rgb(255,255,255)'
        document.querySelector('body').style.background = 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(178,252,255,1) 100%)'

        currentWeatherContainer.style.background = 'rgb(251,255,155)';
        currentWeatherContainer.style.background = 'linear-gradient(135deg, rgba(251,255,155,1) 0%, rgba(88,127,255,1) 100%)';
        currentWeatherContainer.style.color = 'black';
    } else if(time > 11 && time < 20) {
        document.querySelector('body').style.background = 'rgb(255,255,255)'
        document.querySelector('body').style.background = 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(144,165,255,1) 100%)'

        currentWeatherContainer.style.background = 'rgb(208,215,255)';
        currentWeatherContainer.style.background = 'linear-gradient(135deg, rgba(208,215,255,1) 0%, rgba(45,80,253,1) 100%)';
        currentWeatherContainer.style.color = 'black';
    } else {
        document.querySelector('body').style.background = 'rgb(155,157,255)'
        document.querySelector('body').style.background = 'radial-gradient(circle, rgba(155,157,255,1) 0%, rgba(0,38,196,1) 100%)'
    }
}

timeOfDayColors()