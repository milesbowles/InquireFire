// JavaScript function that wraps everything
$(document).ready(function() {

    // Gets Link for Theme Song
    // var gameover_sfx = new Audio('Assets/media/sound-effects/game-over.wav');
    // var explosion_sfx = new Audio('Assets/media/sound-effects/explosion.wav');


    var gameViewWidth = $('#gameView').width();
    // var coins = 0;


    // Player Object
    var player = {
        power: 30,
        hitPoints: 50,
        speed: 20,
        range: 1200,
        location: document.querySelector('#player'),
        sfx: {
            move: new Audio('Assets/media/sound-effects/tank-move.wav'),
            attack: new Audio('Assets/media/sound-effects/cannon-blast.wav')
        },
        state: {
            forward: 'Assets/media/player/cannon/cannon-forward.gif',
            back: 'Assets/media/player/cannon/cannon-back.gif',
            stationary: 'Assets/media/player/cannon/cannon-stationary.gif',
            attack: 'Assets/media/player/cannon/cannon-attack.gif'
        },
        moveForward: function () {
            var move_forward = '+=' + (gameViewWidth / this.speed) + 'px';
            player.sfx.move.play();
            $('#player-img').attr('src', player.state.forward);
            $('#player').animate({ left: move_forward }, 1800);
            this.stop();
        },
        moveBackward: function () {
            var move_back = '-=' + (gameViewWidth / this.speed) + 'px';
            player.sfx.move.play();
            $('#player-img').attr('src', player.state.back);
            $('#player').animate({ left: move_back }, 1800);
            this.stop();
        },
        stop: function () {
            setTimeout(function() {
                $('#player-img').attr('src', player.state.stationary);
            }, 1000);
            enemy.turn();

        },
        attack: function () {
            $('#player-img').attr('src', this.state.attack);
            if (distanceBetweenElements(enemy.location,player.location) < player.range){
                player.sfx.attack.play();
                enemy.hitPoints = enemy.hitPoints - roll(player.power);
                console.log(enemy.hitPoints);
                enemy.updateHitPoints();
            }
            player.stop();
        },
        updateHitPoints: function () {
            var percentage = this.hitPoints.toString() + '%';
            $('#player-hit-points').attr('aria-valuenow', this.hitPoints).css('width', percentage).text(this.hitPoints.toString());
            gameover();
        },
        turn: function () {
            setTimeout(function() {
                if (player.hitPoints > 0) {
                    if (distanceBetweenElements(player.location,enemy.location) < player.range){
                        player.attack();
                    } else {
                        player.moveForward();
                    }
                }
            }, 1000);
        },
        endTurn: function () {
            // $('#controlView').fadeTo('slow', 0.3);
            // $('#header-label').fadeTo('slow', 0.0);
            enemy.turn();
        },
        explode: function () {
            $('#player-img').attr('src', 'Assets/media/death/explosion.gif');
            explosion_sfx.play();
            gameover_sfx.play();
        },
        death: function () {
            setTimeout(function() {
                $('#player-img').attr('src', 'Assets/media/death/skull.gif').css({
                    // 'margin-top' : '130%',
                    // 'margin-left' : '50%',
                    'height' : '40%',
                    'width' : '40%'
                });
            }, 1300);
        }
    };

    // Enemy Object

    var enemy = {
        power: 20,
        hitPoints: 50,
        speed: 10,
        range: 1200,
        location: document.querySelector('#enemy'),
        sfx: {
            move: new Audio('Assets/media/sound-effects/ufo-move.wav'),
            attack: new Audio('Assets/media/sound-effects/lazer-blast.wav')
        },
        state: {
            forward: 'Assets/media/enemy/enemy-ufo-forward.gif',
            back: 'Assets/media/enemy/enemy-ufo-back.gif',
            stationary: 'Assets/media/enemy/enemy-ufo-stationary.gif',
            attack: 'Assets/media/enemy/enemy-ufo-lazer-attack.gif'
        },
        moveForward: function () {
            var move_forward = '-=' + (gameViewWidth / this.speed) + 'px';
            enemy.sfx.move.play();
            $('#enemy-img').attr('src', this.state.forward).css({
                'margin-top' : '35%',
                'height' : '190%',
                'width' : '190%'
            });
            $('#enemy').animate({ left: move_forward }, 1800);
            this.stop();
        },
        moveBackward: function () {
            var move_back = '+=' + (gameViewWidth / this.speed) + 'px';
            enemy.sfx.move.play();
            $('#enemy-img').attr('src', this.state.back);
            $('#enemy').animate({ left: move_back }, 1800);
            this.stop();
        },
        stop: function () {
            setTimeout(function() {
                $('#enemy-img').attr('src', enemy.state.stationary).css({
                    'margin-top' : '40%',
                    'height' : '170%',
                    'width' : '170%'
                });
                $('#controlView').fadeTo('slow', 1);
                $('#header-label').fadeTo('slow', 1);
                player.turn();
            }, 1000);
        },
        attack: function () {
            $('#enemy-img').attr('src', this.state.attack);
            enemy.sfx.attack.play();
            player.hitPoints = player.hitPoints - roll(enemy.power);
            player.updateHitPoints();
            enemy.stop();
        },
        updateHitPoints: function () {
            var percentage = this.hitPoints.toString() + '%';
            $('#enemy-hit-points').attr('aria-valuenow', this.hitPoints).css('width', percentage).text(this.hitPoints.toString());
            gameover();
        },
        turn: function () {
            setTimeout(function() {
                if (enemy.hitPoints > 0) {
                    if (distanceBetweenElements(enemy.location,player.location) < enemy.range){
                        enemy.attack();
                    } else {
                        enemy.moveForward();
                    }
                }
            }, 1000);
        },
        endTurn: function () {
            $('#controlView').fadeTo('slow', 1);
            $('#header-label').fadeTo('slow', 1);

        },
        explode: function () {
            $('#enemy-img').attr('src', 'Assets/media/death/explosion.gif').css({
                'margin-bottom' : '5%',
                'margin-left' : '10%',
                'height' : '120%',
                'width' : '120%'
            });
            explosion_sfx.play();
            gameover_sfx.play();
        },
        death: function () {
            setTimeout(function() {
                $('#enemy-img').attr('src', 'Assets/media/death/skull.gif').css({
                    'margin-top' : '150%',
                    'margin-left' : '60%',
                    'height' : '40%',
                    'width' : '40%'
                });
            }, 1500);
        }
    };

    function gameover() {
        if (player.hitPoints <= 0) {
            console.log("you lose");
            enemy.explode();
            enemy.death();
            $('#header-label-text').text('You Lose!').fadeTo('slow', 1);
            $('#gameOver').show('slow');


        } else if (enemy.hitPoints <= 0) {
            console.log("you win!");
            enemy.explode();
            enemy.death();
            $('#header-label-text').text('You Win!').fadeTo('slow', 1);
            $('#gameOver').show('slow');
            console.log(coins);
            coins += 100;
            console.log(coins);
        }
    }



    function roll(max) {
        return Math.floor(Math.random() * max) + 1
    }

    function distanceBetweenElements(element1, element2) {
        var e1Rect = element1.getBoundingClientRect();
        var e2Rect = element2.getBoundingClientRect();
        var dx = (e1Rect.left+(e1Rect.right-e1Rect.left)/2) - (e2Rect.left+(e2Rect.right-e2Rect.left)/2);
        var dy = (e1Rect.top+(e1Rect.bottom-e1Rect.top)/2) - (e2Rect.top+(e2Rect.bottom-e2Rect.top)/2);
        var distance = Math.sqrt(dx * dx + dy * dy);
        return distance;
    }

    player.turn();

    $('#coins').html(coins.toString);
    // // Move Buttons
    // $("#attack-btn").on("click", function() {
    //     player.attack();
    // });
    //
    // $(".left-button").on("click", function() {
    //     player.moveBackward()
    // });
    //
    // $(".right-button").on("click", function() {
    //     player.moveForward()
    // });


});