/** @format */
// dom element

const pictures = document.querySelectorAll(".pictures div");
const img = document.createElement("img");
const imgs = document.querySelectorAll(".pictures div img");
const rightMove = document.querySelector(".right spam");
const wrongMove = document.querySelector(".wrong spam");
const score = document.querySelector(".score spam");
const timer = document.querySelector(".timer spam");
const start = document.querySelector('.start-btn')
//  function check the Image

const onClickimg = [];
let correct = 0;
let notCorrect = 0;
let cooldown = 0;
const starting = () => {
  removeElements();
  timeSet(60)
  if(!pictures){
    console.log('hi');
  }
}
start.addEventListener('click',starting)



const removeElements = () => {
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener("click", (e) => {
      e.target.firstChild.style.display = "unset";
      e.target.classList = "onClick";
      onClickimg.push(e.target.firstChild.src);
      //if the first click === the second click
      if (onClickimg[0] === onClickimg[1]) {
        correct++;
        onClickimg.splice(0, 2);
        const onTarget = document.querySelectorAll(".onClick");
        onTarget.forEach((element) => {
          setTimeout(() => {
            element.remove();
            udate();
          }, 500);
        });
      } else if (onClickimg[0] !== onClickimg[1] && onClickimg.length > 1) {
        notCorrect++;
        pictures.forEach(element => {
          element.classList = ''
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
// removeElements();



const udate = () => {
  rightMove.innerText = correct;
  wrongMove.innerText = notCorrect;
};

const timeSet = (time) => {
  
  if (time === 0) {
    return time;
  } else {
    return setTimeout(() => {
      timer.innerText = cooldown
      timeSet(time - 1);
      cooldown++;
    }, 1000);
  }
  
};
// if(removeElements()){
//   timeSet()
// }
