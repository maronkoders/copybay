const PDFDocument = require('pdfkit');
const table = require('./drawTable.js');
const fs = require('fs');

// Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('CV.pdf'));

// Add title
doc.fontSize(25).text('John Doe', {
  align: 'center'
});
doc.fontSize(12).text('Address: 21 Chawora Street, Mabvuku, Harare', {
    align: 'center'
  });
// Add contact info
doc.fontSize(12).text('Email: john.doe@example.com', {
  align: 'center'
});
doc.text('Phone: (555) 555-5555', {
  align: 'center'
});
doc.text('LinkedIn: linkedin.com/in/johndoe', {
  align: 'center'
});
doc.moveDown();

// Add a horizontal line
doc.moveTo(50, 160)
  .lineTo(550, 160)
  .stroke();

// Add a section for Education
doc.moveDown();
doc.fontSize(14).font('Helvetica-Bold').text('Personal Details', {
  underline: true
});
doc.moveDown();

doc.fontSize(12).text('Name', {
  continued: true
}).text(' : Brian', {
  align: 'right'
});

doc.fontSize(12).text('Surname', {
    continued: true
  }).text(' : Thomas', {
    align: 'right'
  });


doc.fontSize(12).text('Date of Birth', {
    continued: true
  }).text(' : 09 / 07 / 2000', {
    align: 'right'
  });

doc.fontSize(12).text('Gender', {
    continued: true
  }).text(' : Other', {
    align: 'right'
  });

doc.fontSize(12).text('Marital Status', {
    continued: true
  }).text(' : Divorced', {
    align: 'right'
  });

  doc.moveDown();
// Add a horizontal line
doc.moveTo(50, 290)
  .lineTo(550, 290)
  .stroke();
// Add a section for Education
doc.moveDown().fontSize(14).text('Educational Background', {
  underline: true
});

doc.fontSize(12).text('Primary School', {
  continued: true
}).text(' - Simudzai School', {
  align: 'right'
});
doc.text('January 2021 - Present', {
  align: 'right'
});


doc.font('Helvetica-Bold').text('Grades:');

doc.fontSize(12).text('Shona', {
    continued: true
  }).text(' : 6', {
    align: 'right'
  });
  
  doc.fontSize(12).text('English', {
      continued: true
    }).text(' : 1 ', {
      align: 'right'
    });


doc.moveTo(50, 410)
    .lineTo(550, 410)
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
  doc.moveDown();
  
  doc.fontSize(12).text('Software Developer', {
    continued: true
  }).font('Helvetica-Bold').text(' - Tech Company', {
    align: 'right'
  });
  doc.text('January 2021 - Present', {
    align: 'right'
  });
  
  doc.text('Responsibilities:');
  doc.list([
    'Developed web applications using JavaScript and Node.js',
    'Collaborated with cross-functional teams',
    'Maintained and updated existing applications'
  ]);
  doc.moveDown();
  
  doc.moveTo(50, 550)
    .lineTo(550, 550)
    .stroke();


    // Add a section for Reference
  doc.moveDown().fontSize(14).text('Work Reference', {
    underline: true
  });
  doc.moveDown();
  
  doc.fontSize(12).text('Software Developer', {
    continued: true
  }).font('Helvetica-Bold').text(' - Tech Company', {
    align: 'right'
  });
  doc.text('January 2021 - Present', {
    align: 'right'
  });
  
  doc.text('Contact Details:');
  doc.list([
    'Mr Chitima (Manager)',
    '+636548363',
    'chitima@gmail.com'
  ]);
  doc.moveDown();
  
  doc.moveTo(50, 700)
    .lineTo(550, 700)
    .stroke();

// Add a section for Skills
doc.moveDown().fontSize(14).text('Skills', {
  underline: true
});

doc.fontSize(12).list([
  'JavaScript',
  'Node.js',
  'React',
  'HTML/CSS',
  'Git',
  'SQL'
]);

// Finalize PDF file
doc.end();

