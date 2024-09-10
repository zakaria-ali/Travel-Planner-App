// Importing images
import defaultWeather from '../images/defaultWeather.png';
import clearSky from '../images/clearSky.png';
import fewClouds from '../images/fewClouds.png';
import scatteredClouds from '../images/scatteredClouds.png';
import brokenClouds from '../images/brokenClouds.png';
import showerRain from '../images/showerRain.png';
import rain from '../images/rain.png';
import thunderstorm from '../images/thunderstorm.png';
import snow from '../images/snow.png';
import mist from '../images/mist.png';
import overcastClouds from '../images/overcastClouds.png';
import lightRain from '../images/lightRain.png';
import moderateRain from '../images/moderateRain.png';
import heavyRain from '../images/heavyRain.png';
import freezingRain from '../images/freezingRain.png';
import lightSnow from '../images/lightSnow.png';
import heavySnow from '../images/heavySnow.png';
import sleet from '../images/sleet.png';
import hail from '../images/hail.png';
import fog from '../images/fog.png';
import sand from '../images/sand.png';
import dust from '../images/dust.png';
import haze from '../images/haze.png';
import smoke from '../images/smoke.png';
import blizzard from '../images/blizzard.png';
import tornado from '../images/tornado.png';

function updateWeatherImage(weatherStatus, imgElement) {
    // Capitalize the weather status
    const formattedStatus = weatherStatus.replace(/\b\w/g, char => char.toUpperCase());

    const weatherImages = {
        "Clear Sky": clearSky,
        "Few Clouds": fewClouds,
        "Scattered Clouds": scatteredClouds,
        "Broken Clouds": brokenClouds,
        "Shower Rain": showerRain,
        "Rain": rain,
        "Thunderstorm": thunderstorm,
        "Snow": snow,
        "Mist": mist,
        "Overcast Clouds": overcastClouds,
        "Light Rain": lightRain,
        "Moderate Rain": moderateRain,
        "Heavy Rain": heavyRain,
        "Freezing Rain": freezingRain,
        "Light Snow": lightSnow,
        "Heavy Snow": heavySnow,
        "Sleet": sleet,
        "Hail": hail,
        "Fog": fog,
        "Sand": sand,
        "Dust": dust,
        "Haze": haze,
        "Smoke": smoke,
        "Blizzard": blizzard,
        "Tornado": tornado,
    };

    const imagePath = weatherImages[formattedStatus] || defaultWeather; // Default image if status not found
    imgElement.src = imagePath;
}

export { updateWeatherImage };
