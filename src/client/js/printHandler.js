function handlePrint(tripsToPrint) {
  let printContent = `
    <h1>Your Trips</h1>
    <hr>
    <div class= "container">
    `;

  tripsToPrint.forEach(trip => {
    printContent += `
        <div class="tripCard">
          <h2>Trip to ${trip.countryData.capital}</h2>
          <p><strong>Hotel Name: </strong>${trip.hotelName}</p>
          <p><strong>Weather: </strong>${trip.weather}</p>
          <p><strong>Departure Date: </strong>${trip.departureDate}</p>
          <p><strong>End Date: </strong>${trip.endDate}</p>
          <p><strong>Trip Length: </strong>${trip.tripLength} days</p>
          <p><strong>${trip.isExpired ? "Trip Expired!" : ""} </strong></p>
        </div>
      `;
  });
  
  const styles = `
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 20px;
      }

      h1 {
        text-align: center;
      }

      .container {
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 2rem;
      }

      .tripCard {
        text-align: center;
      }

      h2 {
        margin-top: 0px;
        margin-bottom: 9px;
        text-align: center;
      }

      p {
        margin: 5px 0;
      }

      hr {
        margin: 20px 0;
      }
    </style>
  `;

  const printWindow = window.open('', '', 'height=400,width=600');
  printWindow.document.open();
  printWindow.document.write('<html><head><title>Your Trips</title>' + styles + '</head><body>');
  printWindow.document.write(printContent);
  printWindow.document.write('</div></body></html>');
  printWindow.document.close();

  printWindow.focus();
  printWindow.print();
}

export { handlePrint };
