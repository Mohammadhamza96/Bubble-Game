var timer = 60;
var score = 0;
var hitrn = 0;
var highScore = localStorage.getItem("highScore") || 0;

document.querySelector("#scoreval").textContent = score;
document.querySelector("#restartBtn").style.display = "none";

// SOUND ELEMENTS
const hitSound = document.getElementById("hitSound");
const gameOverSound = document.getElementById("gameOverSound");

function makeBubble() {
  var clutter = "";
  for (var i = 1; i <= 168; i++) {
    var rn = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble">${rn}</div>`;
  }
  document.querySelector("#pbtm").innerHTML = clutter;
}

function runTimer() {
  var timerInterval = setInterval(function () {
    if (timer > 0) {
      timer--;
      document.querySelector("#Timerval").textContent = timer;
    } else {
      clearInterval(timerInterval);
      gameOverSound.play();
      document.querySelector("#pbtm").innerHTML = `<h1>Game Over</h1>`;
      document.querySelector("#restartBtn").style.display = "block";

      // Save High Score
      if (score > highScore) {
        localStorage.setItem("highScore", score);
        alert("🎉 New High Score: " + score);
      } else {
        alert("💯 High Score: " + highScore);
      }
    }
  }, 1000);
}

function getnewHit() {
  hitrn = Math.floor(Math.random() * 10);
  document.querySelector("#hitval").textContent = hitrn;
}

function increaseScore() {
  score += 10;
  document.querySelector("#scoreval").textContent = score;
}

document.querySelector("#pbtm").addEventListener("click", function (details) {
  var clickednum = Number(details.target.textContent);
  if (clickednum === hitrn) {
    hitSound.play();
    increaseScore();
    makeBubble();
    getnewHit();
  }
});

// Restart Button Logic
document.querySelector("#restartBtn").addEventListener("click", function () {
  timer = 60;
  score = 0;
  document.querySelector("#scoreval").textContent = score;
  document.querySelector("#Timerval").textContent = timer;
  this.style.display = "none";
  makeBubble();
  getnewHit();
  runTimer();
});

// INITIAL CALLS
runTimer();
makeBubble();
getnewHit();
