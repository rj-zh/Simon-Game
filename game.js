var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

/*
press a key for the first time to trigger nextSequence() and start the game
use the gameStart variable to avoid nextSequence() being called on subsequence keydowns
 */

var gameStart = false;

$(document).on("keydown", function() {
    if(gameStart === false) {
        $("h1").text("level 0");
        nextSequence();
    } else {
        return;
    }
    gameStart = true;
});

/* 
at each click of each button:
1. add the color of the clicked button into the useClickButton array
2. play the sound of the specific button
3. check the user's answer
*/

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);

    checkAnswer();
    if (checkAnswer() === "success") {
        setTimeout(function() {
            nextSequence();
        }, 1000)
    
    } else if (checkAnswer() === "fail"){
        var audioFail = new Audio("sounds/wrong.mp3");
        audioFail.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")}, 200);
        $("h1").text("Game over 😫 Press any key to restart");
        StartOver();

    }
  })

/* functions */

function nextSequence() {
    $("h1").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    /* make the chosen button flash and play sound */
    $("#" + randomChosenColor).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    playSound(randomChosenColor)
    /********** *****/

    gamePattern.push(randomChosenColor);

    level = level + 1;
    userClickedPattern = [];
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
    //make the button play sound
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed")
    }, 100)
} 

function checkAnswer() {

    if (userClickedPattern.length < level) {
        console.log("incomplete")
        return "incomplete";
    } else if (userClickedPattern.length === level) {
         /*
    two arrays cannot be compared directly since arrays are objects in type
    therefore, use toString or loop through each of the items in the array to compare
    the second measure is more precise
    */

        if (userClickedPattern.toString() === gamePattern.toString()) {
            console.log("success");
            return "success";
        } else {
            console.log("fail");
            return "fail";
        }

}}

function StartOver() {
    level = 0;
    gamePattern = [];
    gameStart = false;

}