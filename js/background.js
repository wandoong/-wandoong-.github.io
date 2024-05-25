const images = [
    "0.jpeg",
    "1.jpeg",
    "2.jpeg",
];

const chosenImage = images[Math.floor(Math.random() * images.length)];
const body = document.querySelector("body");

body.style = `background-image: url(img/${chosenImage});`;