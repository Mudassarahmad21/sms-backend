const express = require("express");
const router = express.Router();
const {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createStudent);
router.get("/", protect, getStudents);
router.put("/:id", protect, updateStudent);
router.delete("/:id", protect, deleteStudent);

module.exports = router;
