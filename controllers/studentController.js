const Student = require("../models/Student");

// GET /api/students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// POST /api/students
exports.createStudent = async (req, res) => {
  try {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = await Student.create({ name, email, course });
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// PUT /api/students/:id
exports.updateStudent = async (req, res) => {
  try {
    const { name, email, course } = req.body;

    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, course },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// DELETE /api/students/:id
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};