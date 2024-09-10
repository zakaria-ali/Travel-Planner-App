import jsPDF from 'jspdf';

function handleExportToPDF(tripsToExport) {
  const doc = new jsPDF();

  // Set initial styles
  doc.setFont('Arial');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 10;
  let yPosition = 20; // Start position on the page
  const rectHeight = 50;
  const headerText = 'Your Trips';
  const textWidth = doc.getStringUnitWidth(headerText) * doc.internal.scaleFactor;
  const headerTextX = (pageWidth - textWidth) / 2; // Center header text horizontally

  // Add header on the first page
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0); // Black text
  doc.text(headerText, headerTextX, yPosition);
  yPosition += 10; // Move below header

  tripsToExport.forEach((trip, index) => {
    if (yPosition > 270) { // Check if the content goes beyond the page height
      doc.addPage();
      yPosition = 20; // Reset yPosition for new page
    }

    // Align trip details to the left
    doc.setFontSize(14);
    doc.text(`Trip to ${trip.countryData.capital}`, margin, yPosition + 10);
    doc.setFontSize(12);
    doc.text(`Hotel Name: ${trip.hotelName}`, margin, yPosition + 20);
    doc.text(`Weather: ${trip.weather}`, margin, yPosition + 30);
    doc.text(`Departure Date: ${trip.departureDate}`, margin, yPosition + 40);
    doc.text(`End Date: ${trip.endDate}`, margin, yPosition + 50);
    doc.text(`Trip Length: ${trip.tripLength}`, margin, yPosition + 60);
    doc.text(` ${trip.isExpired ? "Trip Expired!" : ""}`, margin, yPosition + 70);

    // Draw a border line below each trip details
    doc.setDrawColor(0, 0, 0); // Black line
    const lineSpace = trip.isExpired ? 25 : 15
    doc.line(margin, yPosition + rectHeight + lineSpace, pageWidth - margin, yPosition + rectHeight + lineSpace);

    yPosition += rectHeight + 20; // Move to the next position for the next trip
  });

  // Save the PDF
  doc.save('Your_Trips.pdf');
}

export { handleExportToPDF };
