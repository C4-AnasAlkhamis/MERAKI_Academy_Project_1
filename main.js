/** @format */

const pictures = document.querySelectorAll(".pictures div");
const img = document.createElement("img");
const imgs = document.querySelectorAll(".pictures div img");

        pictures.forEach((element) => {

        element.addEventListener('click',() => {
            element.innerHTML = '<img src = "https://media.istockphoto.com/vectors/yellow-thinking-face-vector-icon-vector-id924215138"></img>'
        })

});
