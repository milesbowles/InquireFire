var express = require("express");
var hBars = require("express-handlebars");
var db = require("../models");
module.exports = function(app){
    app.get("/", function(req, res){
        db.UserStats.findAll(
            {limit: 5},
            [sequelize.fn('max', sequelize.col('highScoreMulti')), 'DESC']
        ).then(function(dbUserStats){
            res.json(dbUserStats);
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