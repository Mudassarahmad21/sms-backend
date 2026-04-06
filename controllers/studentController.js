const Student = require("../models/Student");

// GET /api/students — only returns students belonging to logged-in user
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// POST /api/students — creates student under logged-in user
exports.createStudent = async (req, res) => {
  try {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
      return res.status(400).json({ message: "All fields required" });
    }

    const student = await Student.create({
      user: req.user._id, // tie to the logged-in user
      name,
      email,
      course,
    });

    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// PUT /api/students/:id — only update if this student belongs to logged-in user
exports.updateStudent = async (req, res) => {
  try {
    // Only pick the fields we allow to be updated (strip _id, user, __v etc.)
    const { name, email, course } = req.body;
    const allowedUpdates = { name, email, course };

    const updated = await Student.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // must belong to this user
      allowedUpdates,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Student not found or not authorized" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// DELETE /api/students/:id — only delete if this student belongs to logged-in user
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id, // must belong to this user
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Student not found or not authorized" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};