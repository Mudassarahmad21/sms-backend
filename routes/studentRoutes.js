const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/studentController");

router.use(protect);

router.get("/", ctrl.getStudents);
router.post("/", ctrl.createStudent);
router.put("/:id", ctrl.updateStudent);
router.delete("/:id", ctrl.deleteStudent);

module.exports = router;
