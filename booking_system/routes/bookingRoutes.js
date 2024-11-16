// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const {
    getBookings,
    addBooking,
    updateBooking,
    cancelBooking,
    getBookingById,
    updateBookingStatus,
} = require('../controllers/bookingController');

// API: Lấy danh sách lịch đặt chỗ
router.get('/api/bookings', getBookings);

// API: Thêm đặt chỗ mới
router.post('/api/bookings', addBooking);

// API: Sửa đặt chỗ
router.put('/api/bookings/:id', updateBooking);

// API: Hủy đặt chỗ
router.put('/api/bookings/:id/cancel', cancelBooking);

// API: Lấy thông tin đặt chỗ theo id
router.get('/api/bookings/:id', getBookingById);

// API: Cập nhật thông tin đặt chỗ
router.put('/api/bookings/:id', updateBookingStatus);

module.exports = router;