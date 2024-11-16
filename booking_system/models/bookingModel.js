// models/bookingModel.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, default: 'Pending' }, // Pending, Confirmed, Cancelled
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;