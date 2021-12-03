/** @format */

const pictures = document.querySelectorAll(".pictures div");
const img = document.createElement("img");
const imgs = document.querySelectorAll(".pictures div img");

const onClickimg = [];
const removeElements = () => {
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener("click", (e) => {
      e.target.firstChild.style.display = "unset";
      e.target.classList = "onClick";
      onClickimg.push(e.target.firstChild.src);
      console.log(e);
      const onTarget = document.querySelectorAll(".onClick");
      if (onClickimg[0] === onClickimg[1]) {
        console.log(onTarget);
        onClickimg.splice(0, 2);
        onTarget.forEach((element) => {
          setTimeout(() => {
            element.remove();
          }, 500);
        });
      }
      else if (onClickimg[0] !== onClickimg[1] && onClickimg.length >1){
          setTimeout(() => {
            imgs.forEach(element => {
                element.style.display = "none";
            })
            onClickimg.splice(0, 2);
            e.target.classList = "";
          }, 500);
        
      }
    });
  }

  /////////////////////////////////////
  //   pictures.forEach((element) => {
  //     element.addEventListener("click", (e) => {
  //       e.target.firstChild.style.display = "unset";
  //       e.target.classList = "onClick";
  //       event = e
  //       onClickimg.push(e.target.firstChild.src);
  //       console.log(e);
  //       const onTarget = document.querySelectorAll(".onClick");
  //       if (onClickimg[0] === onClickimg[1]) {
  //         console.log(onTarget);
  //         onClickimg.splice(0, 2);
  //         onTarget.forEach((element) => {
  //           setTimeout(() => {
  //             element.remove();
  //           }, 500);
  //         });
  //       }
  //     });
  //   });
};

removeElements();
// else

// if (events) {
//   console.log(e);
//   onTarget.forEach((element) => {
//     setTimeout(() => {
//       element.classList = "";
//       imgs.forEach((element) => {
//         console.log("hi");
//         element.style.display = "none";
//       });
//     }, 500);
//   });
// }
