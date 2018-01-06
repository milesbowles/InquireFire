// JavaScript function that wraps everything
$(document).ready(function() {

    // Gets Link for SFX
    // var gameover_sfx = new Audio('Assets/media/sound-effects/game-over.wav');
    // var explosion_sfx = new Audio('Assets/media/sound-effects/explosion.wav');


    var gameViewWidth = $('#gameView').width();

    // Level determines enemy character
    var level = 1;
    

    // Player Object
    var player = {
        hitPoints: 50,
        sfx: {
            // move: new Audio('Assets/media/sound-effects/tank-move.wav'),
            // attack: new Audio('Assets/media/sound-effects/cannon-blast.wav')
        },
        state: {
            stationary: 'Assets/media/player/cannon/cannon-stationary.gif',
            attack: 'Assets/media/player/cannon/cannon-attack.gif',
            hit: ''
        },
        stop: function () {
            setTimeout(function() {
                $('#player-img').attr('src', player.state.stationary);
            }, 1000);
            // enemy.turn();

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
        hitPoints: 50,
        sfx: {
            // move: new Audio('Assets/media/sound-effects/ufo-move.wav'),
            // attack: new Audio('Assets/media/sound-effects/lazer-blast.wav')
        },
        character: {
            dragon: {
                stationary: '',
                attack: '',
                hit: '',
                projectile: ''
            },
            eyeball: {
                stationary: '',
                attack: '',
                hit: '',
                projectile: ''
            },
            knight: {
                stationary: '',
                attack: '',
                hit: '',
                projectile: ''
            }


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
            switch (level) {
                case 1:
                $('#enemy').attr('src', this.character.eyeball.attack).css();
                $('#attack').attr('src', this.character.eyeball.projectile).css();
                    break;
                case 2:
                $('#attack').attr('src', this.character.knight.attack).css();
                    break;
                default:
                    break;
            }
            $('#enemyo').attr('src', this.state.attack);
            $('#attack').attr('src', this.state.attack);
            enemy.sfx.attack.play();
            player.updateHitPoints();
            enemy.stop();
        },
        updateHitPoints: function () {
            var percentage = this.hitPoints.toString() + '%';
            $('#enemy-hit-points').attr('aria-valuenow', this.hitPoints).css('width', percentage).text(this.hitPoints.toString());
            gameover();
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

    function distanceBetweenElements(element1, element2) {
        var e1Rect = element1.getBoundingClientRect();
        var e2Rect = element2.getBoundingClientRect();
        var dx = (e1Rect.left+(e1Rect.right-e1Rect.left)/2) - (e2Rect.left+(e2Rect.right-e2Rect.left)/2);
        var dy = (e1Rect.top+(e1Rect.bottom-e1Rect.top)/2) - (e2Rect.top+(e2Rect.bottom-e2Rect.top)/2);
        var distance = Math.sqrt(dx * dx + dy * dy);
        return distance;
    }

});



function main() {
    // settup game
    
}




// TODO: create state function

// TODO: create new round logic

// TODO: add logic for varied attacks based on speed of answers

// TODO: add timer logic

// TODO: add function for attack area


var attackView = {
    state: {
        //Player
        player: '',
        //Enemy
        dragon: './assets/graphics/attacks/fire.gif',
        //Placeholder
        placeholder: ''
    },
    engage: function (level) {
        console.log(character);
        switch (level) {
            case 1:
            $('#attack').attr('src', this.state.dragon).css();
                break;
        
            default:
                break;
        }
        
    },
    disengage: function () {
        $('#attack-area').attr('src', this.state.off).css({
            'margin-top' : '35%',
            'height' : '190%',
            'width' : '190%'
        });
    },
    characterCheck: function () {

        return character;
    },
    check: function () {
        if (player.state == attack || enemy.state == attack) {
            setTimeout(function() {
                attackView.engage();
            }, 1000);
            attackView.disengage();
        }
    }
}