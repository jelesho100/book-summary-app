const User = require("../models/User");

createUser = async (req, res) => {
    const newUser = new User(req.body);  // Create a new user using the request body data
    try {
        // console.log(req.body); 
        const savedUser = await newUser.save();  // Save the user in the database
        res.status(201).json(savedUser);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Error creating user' });
    }

};

getAllUsers = async (req, res) => {
    try {
        const users = await User.find();  // Fetch all users from the database
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }

};
updateUser = async (req, res) => {
    try {
        const userId = req.params.id 
        // console.log(req.body);
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true, runValidators: true});
        if(!updatedUser) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error updating user' });
    }

};

deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const deletedUser = await User.findByIdAndDelete(userId)
        if(!deletedUser) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User has been deleted"})
    } catch (err) {
        res.status(500).json({message: "Error deleting user"})
    }
    

};

getUserByID = async (req, res) => {
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

module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserByID,
}