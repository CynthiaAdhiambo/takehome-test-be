const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const checkAuth = require('../middleware/check-auth');

const ScoresController = require('../controllers/scores-controller');

// Handle incoming GET requests to /orders
router.get("/", ScoresController.get_all_scores);

router.get("/:questionId",  ScoresController.get_score_details);

router.delete("/:questionId", checkAuth, ScoresController.delete_score);


module.exports = router;