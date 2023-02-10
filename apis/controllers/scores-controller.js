const express = require("express");
const router = express.Router();

const Score = require("../models/scores_model");

const mongoose = require("mongoose");

exports.get_all_scores = (req, res, next) => {
    res.status(200).json({
      message: "Handling get requests",
    });

};

exports.get_score_details = (req, res, next) => {
    res.status(200).json({
      message: "Handling get details requests",
    });

};