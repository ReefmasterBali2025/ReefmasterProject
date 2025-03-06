import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
import UserGsheet from '../models/userGsheetModel.js';


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


// Route for user login
const loginUser = async (req, res) => {

    try {
        const { ID, PASSWORD } = req.body;

        // 🔍 Cek apakah user ada di database berdasarkan ID
        const user = await UserGsheet.findOne({ ID });

        if (!user) {
            return res.status(404).json({ success: false, message: "User ID tidak ditemukan!" });
        }

        // 🔑 Cek apakah password cocok (tidak dienkripsi)
        if (user.PASSWORD !== PASSWORD) {
            return res.status(401).json({ success: false, message: "Password salah!" });
        }

        // 🛡️ Buat token JWT
        const token = createToken(user._id);

        res.json({ success: true, token, user: { ID: user.ID, ROLE: user.ROLE } });

    } catch (error) {
        console.error("❌ Error saat login:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Route for user create acc
const registerUser = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        // checking user already exists or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists boss" });
        }

        // Validating email format and strong pass
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // Hasing user password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashPassword,
            role
        });

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({ success: true, token })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// Route for admin login
const adminLogin = async (req, res) => {


    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

const listUser = async (req, res) => {
    try {
        const users = await UserGsheet.find({});
        res.json({ success: true, users });
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await UserGsheet.findByIdAndDelete(id);


        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        res.json({ success: true, message: "User deleted successfully!" });
    } catch (error) {
        console.error("❌ Error deleting user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export { loginUser, registerUser, adminLogin, listUser, deleteUser };