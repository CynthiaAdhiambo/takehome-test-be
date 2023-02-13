const express = require("express");
const router = express.Router();

const Question = require("../models/questions-model");
const Score = require("../models/scores-model");

const mongoose = require("mongoose");

//GET ALL QUESTIONS - ADMIN //
exports.get_all_questions = (req, res, next) => {
  Question.find()
    .select("_id question choices correct_answer")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        questions: docs.map((doc) => {
          return {
            question: doc.question,
            choices: doc.choices,
            correct_answer: doc.correct_answer,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/questions/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// CREATE NEW QUESTIONS - ADMIN //
exports.create_questions = (req, res, next) => {
  const question = new Question({
    _id: new mongoose.Types.ObjectId(),
    question: req.body.question,
    choices: req.body.choices,
    correct_answer: req.body.correct_answer,
  });
  question
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created question successfully",
        createdQuestion: {
          question: result.question,
          choices: result.choices,
          correct_answer: result.correct_answer,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/questions/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// DELETE QUESTIONS - ADMIN

exports.delete_question = (req, res, next) => {
  const id = req.params.questionId;
  Question.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Question deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/questions",
          body: {
            question: "String",
            choices: "Array",
            correct_answer: "String",
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// GET RANDOM 3 QUESTIONS FROM DATABASE WHEN PLAYING
exports.get_session_questions = (req, res, next) => {
  Question.aggregate([
    {
      $sample: { size: 3 },
    },
  ])
    .then((docs) => {
      const response = {
        count: docs.length,
        questions: docs.map((doc) => {
          console.log(doc.choices.value1);
          return {
            question: doc.question,
            choices: doc.choices,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/questions/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// POST PLAYER ANSWER
exports.player_submitted_answers = (req, res, next) => {
  let count = 0;
  let total = 0;
  let correct = false;
  let scoring;
  let allScores = []
  let submission = req.body
  // console.log("submission", submission.length)
  submission.forEach(element => {

    // console.log("my element", element.question)
    if(!element.question){
      return res.status(404).json({
      message: "question not found"
      });
    }
    Question.findById(element.question)
    .then(question => {
        if(element.answer == question.correct_answer ){
          count = 1
          correct = true;

          total += 1
         
        }else{
          count = 0;
          correct = false;
        } 
        scoring = new Score({
          _id: mongoose.Types.ObjectId(),
          question: element.question,
          answer: element.answer,
          is_correct: correct,
          score: count
        });
      // console.log("working scores",scoring)
        allScores.push(scoring)

        return scoring.save();

      
    })
    .then(result => {
      console.log("submission2", allScores)
      return res.status(201).json({
        message: "Scores stored",
        createdScoreResult: [allScores, {total_score: total}],
        request: {
          type: "GET",
          url: "http://localhost:3000/questions/" 
        }
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    });
    
// TO DO: fix failing build when post request is sent
/*
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at new NodeError (node:internal/errors:400:5)
    at ServerResponse.setHeader (node:_http_outgoing:663:11)
    at ServerResponse.header (/home/cynthia/learning/namiri/takehome-test-be/node_modules/express/lib/response.js:794:10)
    at ServerResponse.send (/home/cynthia/learning/namiri/takehome-test-be/node_modules/express/lib/response.js:174:12)
    at ServerResponse.json (/home/cynthia/learning/namiri/takehome-test-be/node_modules/express/lib/response.js:278:15)
    at /home/cynthia/learning/namiri/takehome-test-be/apis/controllers/questions-controller.js:201:30
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  code: 'ERR_HTTP_HEADERS_SENT'
}
*/
  
});

  
 
 
};

