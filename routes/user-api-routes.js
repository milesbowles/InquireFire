var express = require("express");
var hBars = require("express-handlebars");
var path = require("path");
var db = require("../models");
var fs = require("fs"); 

module.exports = function(app){
    /** Upon navigation to the home-page */
    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });
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
    // *************************************** Login Authentication + New Account Creation
    app.post("/login", function(req, res) {
        if (req.body.hasOwnProperty('username')) {
            db.UserAuth.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }).then(function(user) {
                console.log(user)
                db.UserStats.bulkCreate([
                    {   
                        gamesWon: 0,
                        gamesPlayed: 0,
                        perfectGames: 0,
                        category: 'math',
                        userId: parseInt(user.dataValues.id)
                    }, {
                        gamesWon: 0,
                        gamesPlayed: 0,
                        perfectGames: 0,
                        category: 'history',
                        userId: parseInt(user.dataValues.id)
                    }, {
                        gamesWon: 0,
                        gamesPlayed: 0,
                        perfectGames: 0,
                        category: 'physics',
                        userId: parseInt(user.dataValues.id)
                    }, {
                        gamesWon: 0,
                        gamesPlayed: 0,
                        perfectGames: 0,
                        category: 'chemistry',
                        userId: parseInt(user.dataValues.id)
                    }, {
                        gamesWon: 0,
                        gamesPlayed: 0,
                        perfectGames: 0,
                        category: 'biology',
                        userId: parseInt(user.dataValues.id)
                    }   
                ]).then(function() {
                    res.redirect('/home.html?usr='+user.dataValues.id)
                })
            })
        } else {
            var id = 0
            var userName = ""
            db.UserAuth.findAll({attributes: ['email','password','username', 'id']}).then(function(emails) {
                var authenticated = false
                for (var i = 0; i < emails.length; i++) {
                    if ( req.body.email === emails[i].dataValues.email && req.body.password === emails[i].dataValues.password) {
                        authenticated = true
                        userName = emails[i].dataValues.username
                        id = emails[i].dataValues.id
                    }
                }
                if (authenticated) {
                    // will redirect to a url which holds username as a parameter so we know who the user is that is on the page and will display for them the homescreen
                    db.UserAuth.update({
                        loggedIn: true
                    }, {
                        where: {
                            username: userName
                        }
                    }).then(function() {
                        res.redirect('/home.html?usr='+id)    
                    })
                } else {
                    // will send to a url which will signify to login.js that the user's login info was incorrect
                    res.redirect('/?login=failed')
                }
            })
        }
    })
    // **********************************************************************************
    app.get("/api/user/:userId", function(req, res){
        db.UserStats.findAll({
            where: {
                userId: parseInt(req.params.userId)
            }
        }).then(function(stats) {
            console.log(stats)
            var statsArr = []
            for (var i = 0; i < stats.length; i++) {
                statsArr[i] = {}
                statsArr[i].category = stats[i].dataValues.category
                statsArr[i].gamesPlayed = stats[i].dataValues.gamesPlayed
                statsArr[i].perfectGames = stats[i].dataValues.perfectGames
            }
            res.send(statsArr).status(200)
        })
    });
    app.get("/api/:userId/:category/:isPerfect", function(req, res) {
        if (req.params.isPerfect === "true") {
            db.UserStats.update({
                where: {db.Sequelize.Op.or]: [{userId: parseInt(req.params.userId)},{category: req.params.category}]}
            }).then(function() {
                res.redirect('/home.html?usr='+req.params.userId)
            })
        } else {
            res.redirect('/home.html?usr='+req.params.userId)
        }
    })
    app.get("/game/:userAndCategory", function(req, res) {
        var urlParams = req.params.userAndCategory.split('&')
        for (var i = 0; i < urlParams.length; i++) {
            urlParams[i] = urlParams[i].split('=')
        }
        db.Inquiry.findAll({
            where: {
                subcategory: urlParams[1][1],
            }
        }).then(function(quests) {
            var questObj = {}
            var whereIdArray = []
            for (var i = 1; i < quests.length + 1; i++) {
                questObj['q'+i] = [quests[i-1].dataValues.id, quests[i-1].dataValues.q]
                whereIdArray[i-1] = {id: quests[i-1].dataValues.id}
            }
            db.Choice.findAll({
                where: {
                    [db.Sequelize.Op.or]: whereIdArray
                }
            }).then(function(choices) {
                for (var i = 1; i < choices.length + 1; i++) {
                    var count = 2
                    for (var property in choices[i-1].dataValues) {
                        if (choices[i-1].dataValues.hasOwnProperty(property)) {
                            console.log(choices[i-1].dataValues[property])
                            questObj['q'+i][count] = choices[i-1].dataValues[property]
                            count++
                        }
                    }
                }
                res.render('questions', {questObj: questObj})
            })
        })
    });
}