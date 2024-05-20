const PDFDocument = require('pdfkit');
const table = require('./drawTable.js');
const fs = require('fs');


function createCV(data) {
    // Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
const outputName = `${data.personalDetails.name}`;
doc.pipe(fs.createWriteStream(outputName + '.pdf'));

// Add title
doc.fontSize(25).text(`${data.personalDetails.name}`, {
  align: 'center'
});
doc.fontSize(12).text(`${data.personalDetails.address}`, {
    align: 'center'
  });
// Add contact info
doc.fontSize(12).text(`${data.personalDetails.email}`, {
  align: 'center'
});
doc.text(`${data.personalDetails.phone}`, {
  align: 'center'
});

doc.moveDown();

// Add a horizontal line
doc.moveTo(50, doc.y)
  .lineTo(550, doc.y)
  .stroke();
// Add a section for Education
doc.moveDown();
doc.fontSize(14).font('Helvetica-Bold').text('Personal Details', {
  underline: true
});
doc.moveDown();

const personalDetails = data.personalDetails.additionalDetails;
doc.fontSize(12).text('Date of Birth:',{continued:true}).text(` ${personalDetails.dateOfBirth}`,{
  align: 'right'
});

doc.text('Gender:',{continued:true}).text(` ${personalDetails.gender}`,{
  align: 'right'
});

doc.text('Marital Status:',{continued:true}).text(` ${personalDetails.maritalStatus}`,{
  align: 'right'
});

// Add a horizontal line
doc.moveTo(50, doc.y + 10)
  .lineTo(550, doc.y + 10)
  .stroke();
  

// Add a section for Education
doc.fontSize(14).text('Educational Background', {
  underline: true
});

const education = data.education;
education.map(ed => { 
  doc.moveDown();
  doc.fontSize(13).text(`${ed.level}`, {
    continued: true
  }).font('Helvetica-Bold').text(` - ${ed.institution}`, {
    align: 'right'
  });
  doc.text(ed.duration, {
    align: 'right'
  });

  doc.text('Grades:');
  ed.grades.map(grade => {
    doc.fontSize(12).text(`${grade.subject}`, {
      continued: true
    }).text(`${grade.score}`, {
      align: 'right'
    });
  
  })
})


doc.moveTo(50, doc.y + 10)
  .lineTo(550, doc.y + 10)
  .stroke();
  
// const skillsTop = doc.y;
// const skillsHeaders = ["Subject", "Units"];
// const skillsData = [
//     ["Shona", "6"],
//     ["English", "6"],
//     ["Maths", "4"],
//     ["Geography", "5"],
// ];
// Draw Primary Grades Table
// table.drawTwoColumnTable(doc, skillsTop, skillsHeaders, skillsData);

// Add a section for Experience
  doc.moveDown().fontSize(14).text('Work Experience', {
    underline: true
  });

  const workExperience = data.workExperience;
  doc.moveDown();
  
  workExperience.map(wE => {
    doc.fontSize(12).text(`${wE.position}`, {
      continued: true
    }).font('Helvetica-Bold').text(`${wE.company}`, {
      align: 'right'
    });
    doc.text(`${wE.duration}`, {
      align: 'right'
    });
    
    doc.text('Responsibilities:'); 
    doc.list(wE.responsibilities);
  });
 
  doc.moveDown();

  doc.moveTo(50, doc.y + 10)
  .lineTo(550, doc.y + 10)
  .stroke();
 

  const workReference = data.workReference
    // Add a section for Reference
  doc.moveDown().fontSize(14).text('Work Reference', {
    underline: true
  });
  doc.moveDown();

  workReference.map(wr => {
    doc.fontSize(12).text(`${wr.position}`, {
      continued: true
    }).font('Helvetica-Bold').text(`${wr.company}`, {
      align: 'right'
    });
    doc.text(`${wr.duration}`, {
      align: 'right'
    });
    
    doc.text('Contact Details:');
    doc.list([
      `${wr.contactDetails.title} ${wr.contactDetails.name} ${wr.contactDetails.surname}  (${wr.contactDetails.position})`,
      `${wr.contactDetails.phone}`,
      `${wr.contactDetails.email}`,
    ]);
  })
  
  doc.moveDown();
  doc.moveTo(50, doc.y + 10)
  .lineTo(550, doc.y + 10)
  .stroke();
 
// Add a section for Skills
doc.moveDown().fontSize(14).text('Skills', {
  underline: true
});

doc.fontSize(12).list(data.skills);

doc.moveTo(50, doc.y + 10)
.lineTo(550, doc.y + 10)
.stroke();
doc.end();

}

module.exports = {
    createCV
}