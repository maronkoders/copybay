
flatpickr("#dateOfBirth", {
    dateFormat: "Y-m-d", // Date format
    altInput: true, // Show a readable date input
    altFormat: "F j, Y", 
    maxDate: new Date().getFullYear() - 18 + "-01-01" // Set minDate to 18 years ago// Readable date format
});
