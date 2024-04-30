var buttonColors=["red","yellow","green","blue"];
var gamePattern=[];
var clickedPattern=[];
var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    sequence();
    started = true;
  }
});

$(".btn").click(function(){
    var userChosenColor= $(this).attr("id");
    clickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(clickedPattern.length-1);

});
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === clickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (clickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          sequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");

      //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();


    }

}

function sequence(){
    ClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

    var randomNumber=Math.floor(Math.random()*4);
   var  randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
   $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColor);

}
function playSound(color){
    var audio=new Audio("sounds/"+color+".mp3");
    audio.play();
}
function animatePress(key){
   $("#"+key).addClass("pressed");
   setTimeout(function(){
    $("#"+key).removeClass("pressed");
   },100);
}
function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
  }
  