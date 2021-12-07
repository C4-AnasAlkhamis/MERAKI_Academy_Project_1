/** @format */
// dom element
const pictures = document.querySelectorAll(".pictures div");
const img = document.createElement("img");
const imgs = document.querySelectorAll(".pictures div img");
const poki = document.querySelectorAll(".poki");
const rightMove = document.querySelector(".right span");
const wrongMove = document.querySelector(".wrong span");
const score = document.querySelector(".win_lise");
const timer = document.querySelector(".timer span");
const start = document.querySelector(".start-btn");
const btnDiv = document.querySelector(".btn");

const h3Elements = document.querySelectorAll(".score h3");
const scoreElement = document.querySelector(".score");
const header = document.querySelector(".header");
const audio = document.querySelector("#backg_audio");
/////////////////
let win = 0;
let lose = 0;
const onClickimg = [];
let correct = 0;
let notCorrect = 0;
let cooldown = "60";
const random_imgArr = [];
const img_arr = [
  "poki_2.png",
  "poki_1.png",
  "poki_4.png",
  "poki_8.png",
  "poki_6.png",
  "poki_3.png",
  "poki_8.png",
  "poki_5.png",
  "poki_7.png",
  "poki_1.png",
  "poki_6.png",
  "poki_3.png",
  "poki_2.png",
  "poki_7.png",
  "poki_5.png",
  "poki_4.png",
];
const playAudio = () => {
  audio.play();
};
const stopAudio = () => {
  audio.pause();
};
//funcStart here-- makeing an new arra weith random elements
const getRandomArr = (array) => {
  if (array.length === 0) {
    return random_imgArr;
  }
  let ri = Math.floor(Math.random() * array.length);
  random_imgArr.push(array[ri]);
  array.splice(ri, 1);
  return getRandomArr(array);
};
// //funcEnd here-- makeing an new arra weith random elements
// //funcStart here-- start the game
const starting = () => {
  playAudio(audio);
  h3Elements.forEach((element) => {
    element.style.visibility = "visible";
  });
  if (win == 3 || lose == 3) {
    win = 0;
    lose = 0;
  }
  score.innerHTML = `<span>win: ${win}</span><span>lose: ${lose}</span>`;
  scoreElement.style.visibility = "visible";
  rightMove.innerText = "0";
  wrongMove.innerText = "0";
  getRandomArr(img_arr);
  enterTheContent();
  ComparingItems();
  notCorrect = 0;
  correct = 0;
  cooldown = "60";
  timeSet(0);
  setTimeout(() => {
    btnDiv.style.display = "none";
  }, 100);
};
start.addEventListener("click", starting);
//funcEnd here-- stop the game

//funcStart here-- stop the game
const gameStop = () => {
  stopAudio(audio);
  score.innerHTML = `<span>win: ${win}</span><span>lose: ${lose}</span>`;
  start.style.display = "unset";
  timer.innerText = "60";
  const pictures = document.querySelectorAll(".pictures div");
  pictures.forEach((element) => {
    element.remove();
  });
  if (win == 3) {
    start.innerText = "You win Start again";
  }
  if (lose == 3) {
    start.innerText = "You lose Start again";
  }

  btnDiv.style.display = "unset";
};
//funcEnd here-- stop the game

//funcStart here-- play again
const popUp = () => {
  if (correct !== 8) {
    lose++;
  }
  start.innerText = "Play again";
  start.style.display = "unset";
  return gameStop();
};
//funcEnd here-- play again

//funcStart here-- Entering The Content of game
const enterTheContent = () => {
  random_imgArr.forEach((element) => {
    var parent = document.querySelector(".pictures");
    parent.innerHTML += `<div><img class="poki" src="./poki/${element}" alt=""></div>`;
  });
};
//funcEnd here-- Entering The Content of game

//funcStart here-- Comparing items in the game
const ComparingItems = () => {
  const pictures = document.querySelectorAll(".pictures div");
  const imgs = document.querySelectorAll(".pictures div img");
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener("click", (e) => {
      onClickimg.push(e.target.firstChild.src);
      e.target.classList = "onClick";
      setTimeout(() => {
        e.target.firstChild.style.display = "unset";
      }, 250);
      //if the first click === the second click or not
      if (onClickimg[0] === onClickimg[1]) {
        correct++;
        if (correct === 8) {
          win++;
          setTimeout(() => {
            popUp();
          }, 1000);
        }
        onClickimg.splice(0, 2);
        var onTarget = document.querySelectorAll(".onClick");
        onTarget.forEach((element) => {
          setTimeout(() => {
            element.style.visibility = "hidden";
            update();
          }, 800);
        });
      } else if (onClickimg[0] !== onClickimg[1] && onClickimg.length > 1) {
        notCorrect++;
        setTimeout(() => {
          pictures.forEach((element) => {
            element.classList = "";
          });
        }, 800);
        setTimeout(() => {
          imgs.forEach((element) => {
            element.style.display = "none";
            update();
          });
          onClickimg.splice(0, 2);
          e.target.classList = "";
        }, 800);
      }
    });
  }
};
//funcEnd here-- Comparing items in the game

//funcStart here-- update the moves
const update = () => {
  rightMove.innerText = correct;
  wrongMove.innerText = notCorrect;
};
//funcEnd here-- update the moves

//funcStart here-- Time update and comparison
const timeSet = (time) => {
  cooldown--;
  if (correct === 8) {
    return time;
  }
  if (time === 60) {
    return time + popUp();
  } else {
    timer.innerText = cooldown;
    return setTimeout(() => {
      timeSet(time + 1);
    }, 1000);
  }
};
//funcEnd here-- Time update and comparison
