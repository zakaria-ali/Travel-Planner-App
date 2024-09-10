import { removeTrip } from './formHandler'
import { updateWeatherImage } from './updateWeatherImage'
import { handleExportToPDF } from './exportToPDFHandler'
import { handlePrint } from './printHandler'

function renderTrips(trips) {
    // Sort trips: expired ones at the bottom
    trips.sort((b, a) => {
        const dateA = new Date(a.departureDate);
        const dateB = new Date(b.departureDate);
        return dateA - dateB;
    });

    const tripsList = document.getElementById('tripsList');

    if (tripsList) {
        tripsList.innerHTML = '';  // Clear the list before rendering
        if (Array.isArray(trips)) {
            trips.forEach(trip => {

                const tripCard = document.createElement('div');
                tripCard.className = 'card';

                // Add a class if the trip is expired
                if (trip.isExpired) {
                    tripCard.classList.add('expired');
                    tripCard.innerHTML = `<p class= "expiredText">Trip Expired!</p>`
                }

                tripCard.innerHTML += `
                    <img src="${trip.imageUrl}" alt="Trip Image" class="card__image" />
                    <div class="card__overlay">
                        <div class="card__header">
                            <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                <path />
                            </svg>

                            <img class="card__thumb" src="" />

                            <div class="card__header-text">
                                <h3 class="card__title">Weather forecast:</h3>
                                <span id="weather" class="card__status"></span>
                                <span id="weather" class="card__status">${trip.weather}</span>
                            </div>
                        </div>

                        <h2 class="divider line glow" contenteditable>Trip Details</h2>

                        <div class="tripInfo">
                            <p class="card__description">Trip Length: ${trip.tripLength} days</p>
                            <p class="card__description">Staying at: ${trip.hotelName || 'N/A'} ${trip.hotelName ? "hotel" : ""}</p>
                        </div>

                        <h4>Country Information</h4>

                        <div id="countryInfo" class="card__country-info">
                            <p>Capital: ${trip.countryData.capital}</p>
                            <p>Population: ${trip.countryData.population.toLocaleString()}</p>
                            <p>Region: ${trip.countryData.region}</p>
                            <p>Subregion: ${trip.countryData.subregion}</p>
                            <p>Currency: ${trip.countryData.currencies}</p>
                        </div>

                        <div class="btns"> 
                            <button class="removeTripButton btnPushable" data-id="${trip.id}">
                                <span class="btnShadow"></span>
                                <span class="btnEdge"></span>
                                <span class="btnFront text">
                                Remove Trip
                                </span>
                            </button>

                            <button class="printTripButton btnPushable">
                                <span class="btnShadow"></span>
                                <span class="btnEdge"></span>
                                <span class="btnFront text">
                                Print Trip
                                </span>
                            </button>

                            <button class="exportPdfButton btnPushable">
                                <span class="btnShadow"></span>
                                <span class="btnEdge"></span>
                                <span class="btnFront text">
                                Export to PDF
                                </span>
                            </button>
                        </div>
                    </div>
                `;

                tripsList.appendChild(tripCard);

                // Update weather image for this specific trip
                updateWeatherImage(trip.description, tripCard.querySelector('.card__thumb'));

                // Add event listener to remove trip
                tripCard.querySelector('.removeTripButton').addEventListener('click', () => {
                    removeTrip(trip.id);
                });

                // Add event listener to export trip
                tripCard.querySelector('.exportPdfButton').addEventListener('click', () => {
                    handleExportToPDF([trip]);
                });

                // Add event listener to print trip
                tripCard.querySelector('.printTripButton').addEventListener('click', () => {
                    handlePrint([trip]);
                });
            });
        }
    }
}

export { renderTrips };
