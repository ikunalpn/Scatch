// models/userModel.js
const pool = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    create: async (fullName, email, password, contact, picture) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.execute(
            'INSERT INTO Users (FullName, Email, Password, Contact, Picture) VALUES (?, ?, ?, ?, ?)',
            [fullName, email, hashedPassword, contact, picture]
        );
        return result.insertId;
    },
    findByEmail: async (email) => {
        const [rows] = await pool.execute('SELECT * FROM Users WHERE Email = ?', [email]);
        return rows[0];
    },
    // Add other user-related database operations here (e.g., update, delete)
};

module.exports = User;