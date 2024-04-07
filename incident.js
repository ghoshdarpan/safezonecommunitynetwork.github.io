const mongoose = require('mongoose');

const incidentReportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    incidentDate: {
        type: Date,
        required: true
    },
    incidentDescription: {
        type: String,
        required: true
    },
    incidentPhotos: [{
        type: String  // Assuming you store image URLs
    }]
});

const IncidentReport = mongoose.model('IncidentReport', incidentReportSchema);

module.exports = IncidentReport;
