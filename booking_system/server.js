// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const bookingRoutes = require('./routes/bookingRoutes');

// Tạo ứng dụng Express
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/booking_system', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Lỗi kết nối MongoDB:'));
db.once('open', () => {
    console.log('Kết nối MongoDB thành công!');
});

// Sử dụng các routes
app.use(bookingRoutes);

// Chạy server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});