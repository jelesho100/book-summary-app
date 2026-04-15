const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const LOG_TYPE = {
    SIGN_IN: "sign in",
    LOGOUT: "logout",
};

const LEVEL = {
    INFO: "info",
    ERROR: "error",
    WARN: "warn",
};

const MESSAGE = {
    SIGN_IN_ATTEMPT: "User attempting to sign in",
    SIGN_IN_ERROR: "Error occurred while signing in user: ",
    INCORRECT_EMAIL: "Incorrect email",
    INCORRECT_PASSWORD: "Incorrect password",
    DEVICE_BLOCKED: "Sign in attempt from blocked device",
    CONTEXT_DATA_VERIFY_ERROR: "Context data verification failed",
    MULTIPLE_ATTEMPT_WITHOUT_VERIFY:
        "Multiple sign in attempts detected without verifying identity.",
    LOGOUT_SUCCESS: "User has logged out successfully",
};
const createUser = async (req, res) => {
    //check if user already exists

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });  // Create a new user using the request body data
    try {
        // console.log(req.body); 
        if (!newUser.isNew) {
            throw new Error("Failed to add user");
        }
        const savedUser = await newUser.save();  // Save the user in the database
        res.status(201).json({ message: "User added successfully" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Error creating user' });
    }

};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();  // Fetch all users from the database
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }

};
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        // console.log(req.body);
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error updating user' });
    }

};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const deletedUser = await User.findByIdAndDelete(userId)
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User has been deleted" })
    } catch (err) {
        res.status(500).json({ message: "Error deleting user" })
    }


};

const getUserByID = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);  // Fetch user by ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user' });
    }
};

const loginUser = async (req, res) => {
    // await saveLogInfo(
    //     req,
    //     "User attempting to sign in",
    //     LOG_TYPE.SIGN_IN,
    //     LEVEL.INFO
    // );
    try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({
        email
    });
        if (!existingUser) {
            // await saveLogInfo(
            //     req,
            //     MESSAGE.INCORRECT_EMAIL,
            //     LOG_TYPE.SIGN_IN,
            //     LEVEL.ERROR
            // );
            return res.status(404).json({
                message: "Invalid credentials",
            });
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );  

        if (!isPasswordCorrect) {
            // await saveLogInfo(
            //     req,
            //     MESSAGE.INCORRECT_PASSWORD,
            //     LOG_TYPE.SIGN_IN,
            //     LEVEL.ERROR
            // );

            return res.status(400).json({
                message: "Invalid credentials",
            });
        } else {          
            res.status(200).json({
                email: req.body.email,
            })
        }

    } catch (err) {
        // await saveLogInfo(
        //     req,
        //     MESSAGE.SIGN_IN_ERROR + err.message,
        //     LOG_TYPE.SIGN_IN,
        //     LEVEL.ERROR
        // );
        console.log(err);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
}





module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserByID,
    loginUser,
}
//new user i created after hashed passwords
// {
//   "username": "newUser",
//   "email": "newUser@gmail.com",
//   "password": "newUser1"
// }

// const loginUser = async (req, res) => {
//     // await saveLogInfo(
//     //     req,
//     //     "User attempting to sign in",
//     //     LOG_TYPE.SIGN_IN,
//     //     LEVEL.INFO
//     // );
//     try {
//     const { email, password } = req.body;
//     const existingUser = await User.findOne({
//         email
//     });
//         if (!existingUser) {
//             // await saveLogInfo(
//             //     req,
//             //     MESSAGE.INCORRECT_EMAIL,
//             //     LOG_TYPE.SIGN_IN,
//             //     LEVEL.ERROR
//             // );
//             return res.status(404).json({
//                 message: "Invalid credentials",
//             });
//         }
//         const isPasswordCorrect = await bcrypt.compare(
//             password,
//             existingUser.password
//         );  

//         if (!isPasswordCorrect) {
//             // await saveLogInfo(
//             //     req,
//             //     MESSAGE.INCORRECT_PASSWORD,
//             //     LOG_TYPE.SIGN_IN,
//             //     LEVEL.ERROR
//             // );

//             return res.status(400).json({
//                 message: "Invalid credentials",
//             });
//         } else {          
//             res.status(200).json({
//                 email: req.body.email,
//             })
//         }

//     } catch (err) {
//         // await saveLogInfo(
//         //     req,
//         //     MESSAGE.SIGN_IN_ERROR + err.message,
//         //     LOG_TYPE.SIGN_IN,
//         //     LEVEL.ERROR
//         // );
//         console.log(err);
//         res.status(500).json({
//             message: "Something went wrong",
//         });
//     }
// }