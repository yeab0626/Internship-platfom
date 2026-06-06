const authService = require("../services/auth.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {
    try {
        const { 
            full_name,
            email,
            password,
            role
        } = req.body;

        // basic validation
        if (!full_name || 
            !email ||
            !password ||
            !role
            ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = 
        await authService.checkIfUserExists(email);

        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const  user = 
        await authService.createUser({
            full_name,
            email,
            password,
            role,
        });

            return res.status(201).json({
                success: true,
                message: "User created successfully",
                data: user,
            });

    } catch (error) {
        console.error("Error in registration:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // check if user exists
       const user = await authService.getUserByEmail(email);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // compare password
        const isPasswordValid =
         await bcrypt.compare(
            password,
             user.password
            );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // create JWT token
        const token = jwt.sign(
            {
                 user_id: user.user_id, 
                 email: user.email, 
                 role: user.role
             },
            process.env.JWT_SECRET,
            { 
                expiresIn: process.env.JWT_EXPIRES_IN 
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token ,
        });

    } catch (error) {
        console.error("login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    register,
    login,
};