function drawTwoColumnTable(doc, top, headers, data) {
    let startX = 50, startY = top;
    let columnWidth = 250; // Adjusted for two columns

    // Headers
    headers.forEach((header, i) => {
        doc.fontSize(12).text(header, startX + i * columnWidth, startY, { width: columnWidth, align: 'center' });
    });

    startY += 20;

    // Rows
    data.forEach(row => {
        row.forEach((text, i) => {
            doc.fontSize(10).text(text, startX + i * columnWidth, startY, { width: columnWidth, align: 'center' });
        });
        startY += 20;
    });

    // Draw lines
    doc.strokeColor("#aaaaaa").lineWidth(1);
    doc.moveTo(startX, top).lineTo(startX + headers.length * columnWidth, top).stroke(); // Top border
    doc.moveTo(startX, top).lineTo(startX, startY).stroke(); // Left border
    for (let i = 0; i <= headers.length; i++) {
        doc.moveTo(startX + i * columnWidth, top).lineTo(startX + i * columnWidth, startY).stroke(); // Column borders
    }
    doc.moveTo(startX, startY).lineTo(startX + headers.length * columnWidth, startY).stroke(); // Bottom border
}

module.exports = {
    drawTwoColumnTable
}