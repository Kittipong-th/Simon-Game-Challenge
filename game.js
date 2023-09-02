const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

//random color of game patterns
nextSequence = () => {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  console.log(gamePattern);
};

//play sound
playSound = (name) => {
  const audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
};

//animate background when clicked color button
animatePress = (currentColor) => {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
};

//Check answers user and game pattern
checkAnswer = (currentLevel) => {
  console.log(userClickedPattern);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("successfully");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    playSound("wrong");
    gameOver();
  }
};

//Reset values when game over
gameOver = () => {
  $("h1").text("Game Over,Press A restart");
  level = 0;
  gamePattern = [];
  started = false;
};

// Keyboard press events
$(document).on("keypress", function (e) {
  if (e.key === "a") {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  }
});

// Click on screen
$(".btn").click(function () {
  const userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  
  checkAnswer(userClickedPattern.length - 1);
  animatePress(userChosenColor);
  playSound(userChosenColor);
});
