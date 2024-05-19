const PDFDocument = require('pdfkit');
const fs = require('fs');

function createCV() {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream('CV01.pdf'));

    // Title
    doc.fontSize(20).text('Curriculum Vitae', { align: 'center' });

    // Personal Details
    doc.moveDown();
    doc.fontSize(16).text('Personal Details', { align: 'center', underline: true });
    doc.fontSize(12).text('Name: John Doe',{ align: 'center' ,margin: 10});
    doc.text('Email: john.doe@example.com',{ align: 'center' });
    doc.text('Phone: 123-456-7890',{ align: 'center' });
    doc.text('Address: 1234 Street, City, Country',{ align: 'center' });

    // Education
    doc.moveDown();
    doc.fontSize(16).text('Education', { underline: true });
    doc.fontSize(12).text('B.Sc. in Computer Science');
    doc.text('University of Example, 2015 - 2019');
    doc.text('GPA: 3.8/4.0');

    // Work Experience
    doc.moveDown();
    doc.fontSize(16).text('Work Experience', { underline: true });
    doc.fontSize(12).text('Software Developer at Tech Solutions');
    doc.text('June 2019 - Present');
    doc.text('Responsibilities:');
    doc.list(['Developing web applications using JavaScript, Node.js, and React.', 'Collaborating with design teams to implement user-friendly interfaces.', 'Optimizing application performance for maximum speed and scalability.']);

    // Skills
    doc.moveDown();
    doc.fontSize(16).text('Skills', { underline: true });
    doc.fontSize(12).list(['JavaScript', 'Node.js', 'React', 'HTML/CSS', 'Git', 'SQL']);

    // Close the PDF and write to file
    doc.end();
}

createCV();