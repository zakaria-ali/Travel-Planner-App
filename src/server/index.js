var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);

// API variables
const geonamesApiURL = 'http://api.geonames.org/searchJSON';
const weatherApiURL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const locationImageApiURL = 'https://pixabay.com/api/';
const restCountriesApiURL = 'https://restcountries.com/v3.1/name';

const geonamesApiKey = process.env.GEONAMES_USERNAME;
const weatherApiKey = process.env.WEATHERBIT_API_KEY;
const locationImageApiKey = process.env.PIXABAY_API_KEY;


// Serve static files from the dist directory
app.use(express.static('dist'))


app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist', 'index.html'));
});


// Route to get coordinates from Geonames API
app.get('/geonames', async (req, res) => {
    const location = req.query.location;

    try {
        const response = await axios.get(`${geonamesApiURL}?q=${location}&maxRows=1&username=${geonamesApiKey}`);
        const geoData = response.data.geonames[0];

        if (!geoData) {
            return res.status(404).json({ error: 'Location not found' });
        }

        res.json({
            lat: geoData.lat,
            lng: geoData.lng,
            country: geoData.countryName
        });
    } catch (error) {
        console.error('Error fetching data from Geonames API:', error);
        res.status(500).json({ error: 'Error fetching coordinates from Geonames API' });
    }
});

// Route to get weather data from Weatherbit API
app.get('/weather', async (req, res) => {
    const { lat, lng, date } = req.query;

    try {
        // Verify that lat, lng, and date are provided
        if (!lat || !lng || !date) {
            return res.status(400).json({ error: 'Missing required parameters: lat, lng, date' });
        }
        const response = await axios.get(`${weatherApiURL}?lat=${lat}&lon=${lng}&key=${weatherApiKey}`);
        const weatherData = response.data.data.find(forecast => forecast.datetime === date);

        // Check if weatherData is found
        if (!weatherData) {
            return res.status(404).json({ error: 'Weather data not found for the given date' });
        }

        res.json({
            description: weatherData.weather.description,
            temperature: weatherData.temp
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data from Weatherbit API' });
    }
});

// Route to get location image from Pixabay API
app.get('/image', async (req, res) => {
    const { location, country } = req.query;

    try {
        let response = await axios.get(`${locationImageApiURL}?key=${locationImageApiKey}&q=${location}&image_type=photo&per_page=3`);
        let imageUrl = response.data.hits.length > 0 ? response.data.hits[0].webformatURL : null;

        if (!imageUrl) {
            response = await axios.get(`${locationImageApiURL}?key=${locationImageApiKey}&q=${country}&image_type=photo&per_page=3`);
            imageUrl = response.data.hits.length > 0 ? response.data.hits[0].webformatURL : null;
        }

        res.json({ imageUrl });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching image from Pixabay API' });
    }
});

// Route to get country data from REST Countries API
app.get('/country', async (req, res) => {
    const countryName = req.query.country;

    try {
        const countryResponse = await axios.get(`${restCountriesApiURL}/${countryName}`);
        const countryData = countryResponse.data[0];

        if (!countryData) {
            return res.status(404).json({ error: 'Country not found' });
        }

        const capital = countryData.capital[0];
        const population = countryData.population;
        const region = countryData.region;
        const subregion = countryData.subregion;
        const currencies = Object.values(countryData.currencies).map(currency => currency.name);

        res.json({
            capital,
            population,
            region,
            subregion,
            currencies
        });
    } catch (error) {
        console.error('Error fetching data from REST Countries API:', error);
        res.status(500).json({ error: 'Error fetching country data' });
    }
});



// Designates what port the app will listen to for incoming requests
app.listen(5000, function () {
    console.log('Travel Planner app listening on port 5000!');
});


