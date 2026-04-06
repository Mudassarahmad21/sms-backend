const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/studentController");

// All student routes require authentication
router.use(protect);

router.get("/", ctrl.getStudents);
router.post("/", ctrl.createStudent);
router.put("/:id", ctrl.updateStudent);
router.delete("/:id", ctrl.deleteStudent);

module.exports = router;