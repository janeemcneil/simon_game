buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(".container").hide();
startGame();


$(".btn").click(function(){
  // Detect user-clicked button
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  var n = userClickedPattern.length;

  // If user successfully repeating pattern, play button sounds and animations as buttons are clicked
  if(userClickedPattern[n-1] === gamePattern[n-1] && n<gamePattern.length){
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // If user successfully repeats full gamePattern, play button sound and animation and move on to nextSequence
  } else if(userClickedPattern[n-1] === gamePattern[n-1] && n === gamePattern.length){
    playSound(userChosenColour);
    animatePress(userChosenColour);
    setTimeout(function(){
      nextSequence();
    }, 1000);
    userClickedPattern = [];

    // If user makes a mistake, game ends and game over animation runs
  } else if(userClickedPattern[n-1] != gamePattern[n-1]) {
    gameOver();
    playSound("wrong");
    startGame();
    userClickedPattern = [];
    gamePattern = [];
  }
});

function gameOver(){
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game over man!");
  setTimeout(function(){
    $("h1").text("Press any key to restart");
  }, 2500);
}

// Game starts with a single key press. Only the first keypress initiates action because of jQuery one() function
function startGame(){
  $(document).one("keydown", (function(){
  setTimeout(function () {nextSequence();}, 1000);
  $("h1").text("Level 1");
  $(".container").show();
  $(".giphy-embed").hide();
}));
}

function nextSequence(){
  // Choose random number, assign to random color from buttonColours array. Adding that to the gamePattern array.
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  console.log("game pattern " + gamePattern);
  // Run random color animation
  animatePress(randomChosenColour);
  // $('.' + randomChosenColour).fadeIn().fadeOut().fadeIn();

  // Play random color sound
  playSound(randomChosenColour);

  // Level up in header!
  level++;
  $("h1").text("Level " + level);
  return(gamePattern);
}

function playSound(name){
  var colourSound = new Audio('sounds/' + name + '.mp3');
  colourSound.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);


}

function checkAnswer(userPattern, gamePattern){
  for(i=0; i<=userPattern.length; i++){

  }
}
