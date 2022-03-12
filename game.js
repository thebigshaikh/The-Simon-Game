"use strict";

let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
    let userClickedPattern = [];

let level = 0;
let nextSequence = () => {
    userClickedPattern=[];
    $("#level-title").text("Level "+level);
    level += 1;

    let randomNum =  Math.floor(Math.random() * (3 + 1));
    let randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

};


let btnCount = 0;
$(".btn").click(function(event){

    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
        gameOver();
    }
}


let playSound = (randomChosenColour) => {
    let path = "/sounds/"+randomChosenColour+".mp3";
    var sound = new Audio(path);
    sound.play();
};

// let checkUserInput = () => {
//     for (let i =0; i < userClickedPattern.length; i++){
//         if(gamePattern[i] != userClickedPattern[i]){
//             // gameOver();
//             console.log('game over');
//             return false;
//         }
//     }
//     // userClickedPattern=[];
//     return true;
// };

let animatePress = (buttonPressed) => {
        $("#"+buttonPressed).addClass("pressed")
        setTimeout(function(){
            $("#"+buttonPressed).removeClass("pressed");
        }, 100);
};

let started = false;
$(document).keypress(function(){
    if(started == false){
        nextSequence();
        started = true;
    }
});


function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over")
    setTimeout(function(){
        $("body").removeClass("game-over")
    }, 100)
    started = false;
    level = 0;
    $("#level-title").text("Press any key to start");
    userClickedPattern=[];
    gamePattern = [];
    btnCount = 0;
}