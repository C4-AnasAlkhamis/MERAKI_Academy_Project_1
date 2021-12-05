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
const h3Elements = document.querySelectorAll(".score h3");
/////////////////
const onClickimg = [];
let correct = 0;
let notCorrect = 0;
let cooldown = 0;
let win = 0;
let lose = 0;
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
// //funcStart here-- start the game
const starting = () => {
  h3Elements.forEach((element) => {
    element.style.visibility = "visible";
  });
  rightMove.innerText = '0'
  wrongMove.innerText = '0'
  enterTheContent();
  ComparingItems();
  notCorrect = 0;
  correct = 0;
  cooldown = 0;
  timeSet(60);
  setTimeout(() => {
    start.style.display = "none";
  }, 200);
};
start.addEventListener("click", starting);
//funcEnd here-- stop the game

//funcStart here-- stop the game
const gameStop = () => {
  start.style.display = "unset";
  const pictures = document.querySelectorAll(".pictures div");
  timer.innerText = "0";
  pictures.forEach((element) => {
    element.remove();
  });
};
//funcEnd here-- stop the game

//funcStart here-- play again
const popUp = () => {
  if (correct !== 8) {
    lose++;
  }
  score.innerHTML = `<span> win: ${win} lose: ${lose}</span>`;
  start.innerText = "Play again";
  start.style.display = "unset";
  return gameStop();
};
//funcEnd here-- play again

//funcStart here-- Entering The Content of game
const enterTheContent = () => {
  img_arr.forEach((element) => {
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
      }, 400);
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
  cooldown++;
  if(correct === 8){
    return time
  }
  if (time === 0) {
    return time + popUp();
  } else {
    return setTimeout(() => {
      timer.innerText = cooldown;
      timeSet(time - 1);
    }, 1000);
  }
};
//funcEnd here-- Time update and comparison
