// controllers/bookingController.js
const Booking = require('../models/bookingModel');

// Lấy danh sách lịch đặt chỗ
const getBookings = async(req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Thêm đặt chỗ mới
const addBooking = async(req, res) => {
    try {
        const { customerName, date, time } = req.body;
        if (!customerName || !date || !time) {
            return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin!' });
        }
        const booking = new Booking({ customerName, date, time });
        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Sửa đặt chỗ
const updateBooking = async(req, res) => {
    try {
        const { id } = req.params;
        const { customerName, date, time, status } = req.body;

        // Kiểm tra xem trạng thái có được truyền không và có hợp lệ không
        const validStatuses = ['Pending', 'Confirmed', 'Cancelled'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Trạng thái không hợp lệ!' });
        }

        // Cập nhật thông tin đặt chỗ
        const updatedData = { customerName, date, time };

        // Nếu có trạng thái thì thêm vào updatedData
        if (status) {
            updatedData.status = status;
        }

        // Cập nhật đặt chỗ
        const booking = await Booking.findByIdAndUpdate(id, updatedData, { new: true });
        if (!booking) {
            return res.status(404).json({ error: 'Không tìm thấy đặt chỗ!' });
        }
        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Hủy đặt chỗ
const cancelBooking = async(req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByIdAndUpdate(
            id, { status: 'Cancelled' }, { new: true }
        );
        if (!booking) {
            return res.status(404).json({ error: 'Không tìm thấy đặt chỗ!' });
        }
        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy thông tin đặt chỗ theo id
const getBookingById = async(req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ error: 'Không tìm thấy đặt chỗ!' });
        }
        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật thông tin đặt chỗ
const updateBookingStatus = async(req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Kiểm tra trạng thái có phải là một trong các giá trị hợp lệ không
        const validStatuses = ['Pending', 'Confirmed', 'Cancelled'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Trạng thái không hợp lệ!' });
        }

        // Cập nhật trạng thái hoặc các trường khác
        const updatedBooking = await Booking.findByIdAndUpdate(
            id, { status }, // Chỉ cập nhật trạng thái
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ error: 'Không tìm thấy đặt chỗ!' });
        }
        res.json(updatedBooking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    getBookings,
    addBooking,
    updateBooking,
    cancelBooking,
    getBookingById,
    updateBookingStatus,
};