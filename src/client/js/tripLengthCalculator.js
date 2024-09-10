function calculateTripLength(departureDate, endDate) {
    const startDate = new Date(departureDate);
    const finishDate = new Date(endDate);
    const differenceInTime = finishDate - startDate;
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
}

export { calculateTripLength };
