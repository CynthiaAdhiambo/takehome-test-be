const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");

const QuestionsController = require("../controllers/questions-controller");

// Handle incoming GET requests to /orders
/**
 * @swagger
 * /questions:
 *   get:
 *     description: Get all questions - Admin role
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/", QuestionsController.get_all_questions);
// TO DO //
// /**
//  * @swagger
//  * /questions:
//  *  post:
//  *      description: Get 3 answers - player role
//  *      parameters:
//  *       - in: header
//  *        name: security
//  *  
//  *       - in: body 
//  *        question:
//  *         schema:
//  *          type: string,
//  *        choices:
//  *         schema: 
//  *          type: array
//  *        correct_answer:
//  *         schema: string
//  *        examples: {question: What was Fry's job in 1999?, choices: [Manager, Bounty Hunter, Delivery Boy, Factory Worker, cook], correct_answer: Delivery Boy}
//  *      responses:
//  *       201:
//  *        description: Score posted successfully,
//  *        createdQuestion: 
//  *        {
//  *         id: string,
//  *         question: string,
//  *         choices:  [],
//  *         correct_answer: boolean,
//  *        }
//  * 
//  */
router.post("/", checkAuth, QuestionsController.create_questions);

/**
 * @swagger
 * /questions/play:
 *   get:
 *     description: Get 3 questions - player role
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/play", QuestionsController.get_session_questions);
/**
 * @swagger
 * /questions/play:
 *   post:
 *     description: Get 3 answers - player role
 *     parameters:
 *         - in : body 
 *           question:
 *             schema:
 *                 type: string
 *           answer:
 *             schema: string
 *           example: [
 *              {
 *                  question: 63e8b0610422fe99447490a2,
 *                  answer: Delivery Boy
 *              },
 *              {
 *                  question: 63e8b0610422fe99447490a2,
 *                  answer: Manager
 *              },
 *              {
 *                  question: 63e8b0610422fe99447490a2,
 *                  answer: Delivery Boy
 *              },
 *           ]

 *     responses:
 *       201:
 *         description: Score posted successfully
 *         createdScoreResult: [
 *          {
 *              _id: string,
                question: string,
                answer:  string,
                is_correct: boolean,
                score: number,
 *          },
 *          {
 *              total_score: number
 *          }
 *         ]
 * 
 */
router.post("/play", QuestionsController.player_submitted_answers);

router.delete("/:questionId", checkAuth, QuestionsController.delete_question);

module.exports = router;
