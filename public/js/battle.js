

    // Gets Link for SFX
    // var gameover_sfx = new Audio('Assets/media/sound-effects/game-over.wav');
    // var explosion_sfx = new Audio('Assets/media/sound-effects/explosion.wav');


    // var gameViewWidth = $('#gameView').width();



    // function gameover() {
    //     if (player.hitPoints <= 0) {
    //         console.log("you lose");
    //         enemy.explode();
    //         enemy.death();
    //         $('#header-label-text').text('You Lose!').fadeTo('slow', 1);
    //         $('#gameOver').show('slow');


    //     } else if (enemy.hitPoints <= 0) {
    //         console.log("you win!");
    //         enemy.explode();
    //         enemy.death();
    //         $('#header-label-text').text('You Win!').fadeTo('slow', 1);
    //         $('#gameOver').show('slow');
    //         console.log(coins);
    //         coins += 100;
    //         console.log(coins);
    //     }
    // }

    // function distanceBetweenElements(element1, element2) {
    //     var e1Rect = element1.getBoundingClientRect();
    //     var e2Rect = element2.getBoundingClientRect();
    //     var dx = (e1Rect.left+(e1Rect.right-e1Rect.left)/2) - (e2Rect.left+(e2Rect.right-e2Rect.left)/2);
    //     var dy = (e1Rect.top+(e1Rect.bottom-e1Rect.top)/2) - (e2Rect.top+(e2Rect.bottom-e2Rect.top)/2);
    //     var distance = Math.sqrt(dx * dx + dy * dy);
    //     return distance;
    // }


// Level determines enemy character
var parseUrlforRound = function() {
    var initUrlArr = window.location.href.split('/')
    var finalUrlArr = initUrlArr[initUrlArr.length - 1].split('&')
    return finalUrlArr[2].split('=')[1]
}
var level = parseUrlforRound();


// Enemy Object
var enemy = {
    hitPoints: 50,
    sfx: {
        // move: new Audio('Assets/media/sound-effects/ufo-move.wav'),
        // attack: new Audio('Assets/media/sound-effects/lazer-blast.wav')
    },
    character: {
        dragon: {
            stationary: '/assets/graphics/enemies/dragon/stationaryDragon.gif',
            attack: '/assets/graphics/enemies/dragon/attackDragon.gif',
            hit: '/assets/graphics/enemies/dragon/hitDragon.gif',
            projectile: './assets/graphics/enemies/dragon/projectileDragon.gif'
        },
        eyeball: {
            stationary: '/assets/graphics/enemies/eyeball/stationaryEyeball.gif',
            attack: '/assets/graphics/enemies/eyeball/attackEyeball.gif',
            hit: '/assets/graphics/enemies/eyeball/hitEyeball.gif',
            projectile: '/assets/graphics/enemies/eyeball/projectileEyeball.gif'
        },
        knight: {
            stationary: '/assets/graphics/enemies/knight/stationaryKnight.gif',
            attack: '/assets/graphics/enemies/knight/attackKnight.gif',
            hit: '/assets/graphics/enemies/knight/hitKnight.gif',
            projectile: '/assets/graphics/enemies/knight/projectileKnight.gif'
        }
    },
    stop: function () {
        switch (level) {
            case 1:
                document.getElementById("enemy").src=this.character.eyeball.stationary;
                document.getElementById("attack").src='./assets/graphics/placeholder.png';
                break;
            case 2:
                document.getElementById("enemy").src=this.character.knight.stationary;
                document.getElementById("attack").src='./assets/graphics/placeholder.png';
                break;
            case 3:
                document.getElementById("enemy").src=this.character.dragon.stationary;
                document.getElementById("attack").src='./assets/graphics/placeholder.png';
                break;
            default:
                break;
        };
    },
    attack: function () {
        switch (level) {
            case 1:
                document.getElementById("enemy").src=this.character.eyeball.attack;
                document.getElementById("attack").src=this.character.eyeball.projectile;
                player.hit();
                setTimeout(function() {
                    enemy.stop();
                }, 1300);
                break;
            case 2:
                document.getElementById("enemy").src=this.character.knight.attack;
                document.getElementById("attack").src=this.character.knight.projectile;
                player.hit();
                setTimeout(function() {
                    enemy.stop();
                }, 1300);
                break;
            case 3:
                document.getElementById("enemy").src=this.character.dragon.attack;
                document.getElementById("attack").src=this.character.dragon.projectile;
                player.hit();
                setTimeout(function() {
                    enemy.stop();
                }, 1300);
                break;
            default:
                break;
        };

        // enemy.sfx.attack.play();
        // player.updateHitPoints();
        
    },
    hit: function () {
        switch (level) {
            case 1:
                document.getElementById("enemy").src=this.character.eyeball.hit;
                setTimeout(function() {
                    enemy.stop();
                }, 1300);
                break;
            case 2:
                document.getElementById("enemy").src=this.character.knight.hit;
                setTimeout(function() {
                    enemy.stop();
                }, 1300);
                break;
            case 3:
                document.getElementById("enemy").src=this.character.dragon.hit;
                setTimeout(function() {
                    enemy.stop();
                }, 1300);
                break;
            default:
                break;
        };

        // enemy.sfx.attack.play();
        // player.updateHitPoints();
        
    }
    // updateHitPoints: function () {
    //     var percentage = this.hitPoints.toString() + '%';
    //     $('#enemy-hit-points').attr('aria-valuenow', this.hitPoints).css('width', percentage).text(this.hitPoints.toString());
    //     gameover();
    // },
    // explode: function () {
    //     $('#enemy-img').attr('src', 'Assets/media/death/explosion.gif').css({
    //         'margin-bottom' : '5%',
    //         'margin-left' : '10%',
    //         'height' : '120%',
    //         'width' : '120%'
    //     });
    //     explosion_sfx.play();
    //     gameover_sfx.play();
    // },
    // death: function () {
    //     setTimeout(function() {
    //         $('#enemy-img').attr('src', 'Assets/media/death/skull.gif').css({
    //             'margin-top' : '150%',
    //             'margin-left' : '60%',
    //             'height' : '40%',
    //             'width' : '40%'
    //         });
    //     }, 1500);
    // }
};

// Player Object
var player = {
    hitPoints: 50,
    sfx: {
        // move: new Audio('Assets/media/sound-effects/ufo-move.wav'),
        // attack: new Audio('Assets/media/sound-effects/lazer-blast.wav')
    },
    state: {
        stationary: '/assets/graphics/characters/wizard/stationaryWizard.gif',
        attack: '/assets/graphics/characters/wizard/attackWizard.gif',
        hit: '/assets/graphics/characters/wizard/hitWizard.gif',
        projectile: '/assets/graphics/characters/wizard/projectileWizard.gif'
    },
    stop: function () {
        document.getElementById("player").src=this.state.stationary;
        document.getElementById("attack").src='/assets/graphics/placeholder.png';
    },
    attack: function () {
        document.getElementById("player").src=this.state.attack;
        document.getElementById("attack").src=this.state.projectile;
        enemy.hit();
        setTimeout(function() {
            player.stop();
        }, 1300);


        // enemy.sfx.attack.play();
        // player.updateHitPoints();
        
    },
    hit: function () {
        document.getElementById("player").src=this.state.hit;
        setTimeout(function() {
            player.stop();
        }, 1300);
    }
    // updateHitPoints: function () {
    //     var percentage = this.hitPoints.toString() + '%';
    //     $('#enemy-hit-points').attr('aria-valuenow', this.hitPoints).css('width', percentage).text(this.hitPoints.toString());
    //     gameover();
    // },
    // explode: function () {
    //     $('#enemy-img').attr('src', 'Assets/media/death/explosion.gif').css({
    //         'margin-bottom' : '5%',
    //         'margin-left' : '10%',
    //         'height' : '120%',
    //         'width' : '120%'
    //     });
    //     explosion_sfx.play();
    //     gameover_sfx.play();
    // },
    // death: function () {
    //     setTimeout(function() {
    //         $('#enemy-img').attr('src', 'Assets/media/death/skull.gif').css({
    //             'margin-top' : '150%',
    //             'margin-left' : '60%',
    //             'height' : '40%',
    //             'width' : '40%'
    //         });
    //     }, 1500);
    // }
};
