const express = require("express");
const router = express.Router();
const {createUser,getAllUsers,updateUser,deleteUser,getUserByID,} = require("../controllers/userController");

router.post('/register', createUser)
router.get('/all', getAllUsers)
router.get('/:id', getUserByID)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)



module.exports = router;

// const express = require('express');
// const UserController = require('./userController');
// const authMiddleware = require('../../middlewares/authMiddleware');
// const router = express.Router();

// router.post('/register', UserController.registerUser);
// router.get('/me', authMiddleware, UserController.getUserProfile);
// router.get('/:id', authMiddleware, UserController.getUserById);
// router.put('/:id', authMiddleware, UserController.updateUser);

// module.exports = router;