const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    // Links this student to the user who created them
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name:           { type: String, required: true, trim: true },
    email:          { type: String, required: true, trim: true },
    course:         { type: String, required: true, trim: true },
    enrollmentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);