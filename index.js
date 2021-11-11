var buttonColours = ["red", "blue", "green", "yellow"];
var rockWords = ["Put in the Work!", "Put in the Hours!", "We Stay Humble!", "We Devour!"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(".btn").on("click", notify)
$("#level-title").on("click", function() {
  if (level == 0) {
    nestSequence();
  }
})


function notify() {
  userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1)
}

function nestSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").html("Round " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".wav");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      var randomWord = Math.floor(Math.random()*4);
      $("#level-title").html(rockWords[randomWord]);
      setTimeout(function() {
        nestSequence();
        userClickedPattern = [];
      }, 1650);
    }

  } else {
    console.log("fail");
    var audio = new Audio("sounds/wrong.wav");
    audio.play();
    $("#level-title").html("You Need to Put in More Hours!");
    setTimeout(function() {
      userClickedPattern = [];
      gamePattern = [];
      level = 0;
      $("#level-title").html("Click to Rumble");
    }, 3000);
  }
}
