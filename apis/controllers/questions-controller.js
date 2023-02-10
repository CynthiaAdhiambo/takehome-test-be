const express = require("express");
const router = express.Router();

const Question = require("../models/questions-model");

const mongoose = require("mongoose");

exports.get_all_questions = (req, res, next) => {
    res.status(200).json({
      message: "Handling get requests",
    });

};

exports.create_questions = (req, res, next) => {
    res.status(200).json({
      message: "Handling post requests",
    });

};

exports.get_question_details = (req, res, next) => {
    res.status(200).json({
      message: "Handling get details requests",
    });

};

exports.delete_question = (req, res, next) => {
    res.status(200).json({
      message: "Handling delete requests",
    });

};