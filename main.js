/** @format */
// dom element
const pictures = document.querySelectorAll(".pictures div");
const img = document.createElement("img");
const imgs = document.querySelectorAll(".pictures div img");
const poki = document.querySelectorAll(".poki");
const rightMove = document.querySelector(".right spam");
const wrongMove = document.querySelector(".wrong spam");
const score = document.querySelector(".score spam");
const timer = document.querySelector(".timer spam");
const start = document.querySelector(".start-btn");
//  function check the Image
const onClickimg = [];
let correct = 0;
let notCorrect = 0;
let cooldown = 0;
// starting game function
const starting = () => {
  enterTheContent();
  ComparingItems();
  timeSet(61);
  setTimeout(() => {
    start.style.display = "none";
  }, 200);
};
const gameStop = () => {
  start.style.display = "unset";
  const pictures = document.querySelectorAll(".pictures div");
  cooldown = 0;
  correct = 0;
  notCorrect = 0;
  pictures.forEach((element) => {
    element.remove();
  });
};
const popUp = () => {
  gameStop();
  if (confirm("Play again")) {
    setTimeout(() => {
      starting();
    }, 500);
  } else gameStop();
};

start.addEventListener("click", starting);
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

const enterTheContent = () => {
  img_arr.forEach((element) => {
    var parent = document.querySelector(".pictures");
    parent.innerHTML += `<div><img class="poki" src="./poki/${element}" alt=""></div>`;
  });
};
// Comparing items
const ComparingItems = () => {
  const pictures = document.querySelectorAll(".pictures div");
  const imgs = document.querySelectorAll(".pictures div img");
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener("click", (e) => {
      e.target.firstChild.style.display = "unset";
      e.target.classList = "onClick";
      onClickimg.push(e.target.firstChild.src);
      //if the first click === the second click or not
      if (onClickimg[0] === onClickimg[1]) {
        correct++;
        if (correct === 8) {
          setTimeout(() => {
            popUp();
          }, 500);
        }
        onClickimg.splice(0, 2);
        const onTarget = document.querySelectorAll(".onClick");
        onTarget.forEach((element) => {
          setTimeout(() => {
            element.style.visibility = "hidden";
            udate();
          }, 500);
        });
      } else if (onClickimg[0] !== onClickimg[1] && onClickimg.length > 1) {
        notCorrect++;
        pictures.forEach((element) => {
          element.classList = "";
        });
        setTimeout(() => {
          imgs.forEach((element) => {
            element.style.display = "none";
            udate();
          });
          onClickimg.splice(0, 2);
          e.target.classList = "";
        }, 500);
      }
    });
  }
};

const udate = () => {
  rightMove.innerText = correct;
  wrongMove.innerText = notCorrect;
};

const timeSet = (time) => {
  if (time === 0) {
    return time + popUp();
  } else {
    return setTimeout(() => {
      timer.innerText = cooldown;
      timeSet(time - 1);
      cooldown++;
    }, 1000);
  }
};
