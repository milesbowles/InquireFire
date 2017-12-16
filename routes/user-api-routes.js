var express = require("express");
var hBars = require("express-handlebars");
var path = require("path");
var db = require("../models");
module.exports = function(app){
    /** Upon navigation to the home-page */
    app.get("/home", function(req, res){
        /** Handle multiplayer stats */
        db.UserStats.findAll(
            {limit: 5},
            [sequelize.fn('max', sequelize.col('highScoreMulti')), 'DESC']
        ).then(function(dbUserStats){
            res.json(dbUserStats);
        });
        /** Handle single player stats */
        db.UserStats.findAll(
            {limit: 5},
            [sequelize.fn("max", sequelize. col("highScoreSingle")), "DESC"]
        ).then(function(dbUserStats){
            res.json(dbUserStats);
        });
    });
    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });
    app.put("/", function(req, res){
        db.UserAuth.update({
            loggedIn: true
        }, {
            where: {
                username: req.body.username
            }
        }).then(function(dbUserAuth){
            res.json(dbUserAuth);
        });
    });
    app.get("/api/users", function(req, res){
        db.UserAuth.findAll({}).then(function(dbUsers){
            res.json(dbUsers);
        });
    });
    app.post("/api/users", function(req, res){
        db.UserAuth.create({
            username: req.body.username,
            password: req.body.password
        }).then(function(dbUsers){
            res,json(dbUsers);
        });
    });
    app.put("/api/users", function(req, res){
        db.UserAuth.update({
            username: req.body.username,
            password: req.body.password 
        }).then(function(dbUsers){
            res.json(dbUsers);
        });
    });
}