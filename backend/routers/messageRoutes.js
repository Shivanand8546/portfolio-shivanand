const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middlewares/auth");
const {
    sendMessage,
    getAllMessages,
    deleteMessage,
    getSingleMessage
} = require("../controllers/messageController");


router.post("/", sendMessage);

// Protected routes — sirf admin
router.delete("/:id", authMiddleware, deleteMessage);
router.get("/all", authMiddleware, getAllMessages);
router.get("/:id", authMiddleware, getSingleMessage);

module.exports = router;
