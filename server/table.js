const PDFDocument = require('pdfkit');
const fs = require('fs');

function createCV() {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream('V.pdf'));

    // Title
    doc.fontSize(20).text('Curriculum Vitae', { align: 'center' });

    // Personal Details
    doc.moveDown();
    doc.fontSize(16).text('Personal Details', { align: 'center', underline: true });
    doc.fontSize(12).text('Name: John Doe', { align: 'left' });
    doc.text('Email: john.doe@example.com', { align: 'left' });
    doc.text('Phone: 123-456-7890', { align: 'left' });
    doc.text('Address: 1234 Street, City, Country', { align: 'left' });

    // Two-Column Table
    doc.moveDown();
    doc.fontSize(16).text('Professional Skills', { align: 'center', underline: true });
    const skillsTop = doc.y;
    const skillsHeaders = ["Skill", "Proficiency"];
    const skillsData = [
        ["JavaScript", "Advanced"],
        ["Node.js", "Intermediate"],
        ["React", "Advanced"],
        ["HTML/CSS", "Advanced"],
        ["Git", "Intermediate"],
        ["SQL", "Intermediate"]
    ];

    // Draw Skills Table
    drawTwoColumnTable(doc, skillsTop, skillsHeaders, skillsData);

    // Close the PDF and write to file
    doc.end();
}

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

createCV();