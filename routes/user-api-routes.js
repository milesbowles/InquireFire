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
    // *************************************** Login Authentication + New Account Creation
    app.post("/login", function(req, res) {
        if (req.body.hasOwnProperty('username')) {
            db.UserAuth.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }).then(function() {
                db.UserStats.create({
                    gamesWon: 0,
                    gamesPlayed: 0,
                    highScoreMulti: 0,
                    highScoreSingle: 0,
                    categoryMulti: null,
                    categorySingle: null
                }).then(function() {
                    res.send('Welcome to the home page ' + req.body.username + '!')
                })
            })
        } else {
            db.UserAuth.findAll({attributes: ['email','password']}).then(function(emails) {
                var authenticated = false
                for (var i = 0; i < emails.length; i++) {
                    if ( req.body.email === emails[i].dataValues.email && req.body.password === emails[i].dataValues.password) {
                        authenticated = true
                    }
                }
                if (authenticated) {
                    // will eventually redirect to a url which holds username as a parameter so we know who the user is that is on the page and will display for them the homescreen
                    db.UserAuth.update({
                        loggedIn: true
                    }, {
                        where: {
                            username: req.body.username
                        }
                    }).then(function() {
                        res.send('You have been logged in!')    
                    })
                } else {
                    // will eventually redirect back to the login screen with an error message indicating failed login attempt
                   res.send('Incorrect login info!')
                }
            })
        }
    })
    // **********************************************************************************
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