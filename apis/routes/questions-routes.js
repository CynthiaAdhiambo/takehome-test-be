const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const checkAuth = require('../middleware/check-auth');

const QuestionsController = require('../controllers/questions-controller');

// Handle incoming GET requests to /orders
router.get("/", QuestionsController.get_all_questions);

router.post("/", checkAuth, QuestionsController.create_questions);

router.get("/:questionId",  QuestionsController.get_question_details);

router.delete("/:questionId", checkAuth, QuestionsController.delete_question);


module.exports = router;