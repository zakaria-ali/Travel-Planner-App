// Import the necessary functions
import { calculateTripLength } from './tripLengthCalculator'
import { renderTrips } from './renderTrips'
import { handleExportToPDF } from './exportToPDFHandler'
import { handlePrint } from './printHandler'

let trips = []; // Store the trips

// Check if there's existing trip data in Local Storage
if (window.localStorage.getItem('trips')) {
    trips = JSON.parse(window.localStorage.getItem('trips'));
    renderTrips(trips)

    // Make the section visible and apply the slide-in animation
    const resultSection = document.querySelector('#resultSection');
    resultSection.style.opacity = '1';
}

// URL Variables for API endpoints on the server
const geonamesURL = 'http://localhost:5000/geonames';
const weatherURL = 'http://localhost:5000/weather';
const locationImageURL = 'http://localhost:5000/image';
const countryInfoURL = 'http://localhost:5000/country';

// Export All Trips to PDF
document.getElementById('exportAllTripsPdfButton').addEventListener('click', () => {
    handleExportToPDF(trips);  // Pass all trips
});

// Print All Trips
document.getElementById('printAllTripsButton').addEventListener('click', () => {
    handlePrint(trips);  // Pass all trips
});


const form = document.getElementById('travelFormButton');
form.addEventListener('click', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    // Get the user inputs
    const location = document.getElementById('location').value;
    const departureDate = document.getElementById('departureDate').value;
    const endDate = document.getElementById('endDate').value;
    const hotelName = document.getElementById('hotelName').value;

    // Validate dates
    const today = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
    if (departureDate < today) {
        alert('Departure date cannot be earlier than today.');
        return;
    }

    if (endDate < departureDate) {
        alert('End date cannot be earlier than departure date.');
        return;
    }

    // Calculate the trip length
    const tripLength = calculateTripLength(departureDate, endDate);

    // Check if the trip is Expired
    const isExpired = isExpiredF(departureDate);
    
    try {
        // Get coordinates from Geonames API
        const geoResponse = await fetch(`${geonamesURL}?location=${location}`);
        const geoData = await geoResponse.json();
        const { lat, lng, country } = geoData;

        // Get weather data from Weatherbit API
        const weatherResponse = await fetch(`${weatherURL}?lat=${lat}&lng=${lng}&date=${departureDate}`);
        const weatherData = await weatherResponse.json();
        const { description, temperature } = weatherData;

        // Get location image from Pixabay API
        const imageResponse = await fetch(`${locationImageURL}?location=${location}&country=${country}`);
        const imageData = await imageResponse.json();
        const imageUrl = imageData.imageUrl || 'default-image-url.jpg'; // Fallback image URL if no result

        // Fetch country information from the backend
        const countryResponse = await fetch(`${countryInfoURL}?country=${country}`);
        const countryData = await countryResponse.json();

        // Create a trip object
        const trip = {
            id: Date.now(),  // Unique ID for each trip
            departureDate,
            endDate,
            isExpired,
            hotelName,
            tripLength,
            imageUrl,
            description,
            weather: `${description}, ${temperature}°C`,
            countryData: {
                capital: countryData.capital,
                population: countryData.population,
                region: countryData.region,
                subregion: countryData.subregion,
                currencies: countryData.currencies.join(', ')
            }
        };

        trips.push(trip); // Add trip to the array

        // Save trips to Local Storage
        saveTripsToLocalStorage();

        // Render the updated trips list
        renderTrips(trips);

        // Make the section visible and apply the slide-in animation
        const resultSection = document.querySelector('#resultSection');
        resultSection.style.opacity = '1';
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function removeTrip(tripId) {
    trips = trips.filter(trip => trip.id !== tripId);  // Remove trip by ID
    saveTripsToLocalStorage();
    renderTrips(trips);  // Re-render the trips list
}

function saveTripsToLocalStorage() {
    localStorage.setItem('trips', JSON.stringify(trips));
}

function isExpiredF(departureDate) {
    const today = new Date();
    const depDate = new Date(departureDate);
    return depDate < today;
}

export { handleSubmit, removeTrip };
