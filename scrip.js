const title = document.querySelector('.title')
const leaf1 = document.querySelector('.leaf1')
const leaf2 = document.querySelector('.leaf2')
const bush2 = document.querySelector('.bush2')
const mount1 = document.querySelector('.mount1')
const mount2 = document.querySelector('.mount2')
const home = document.querySelector('.home');

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#ffffff",
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();


var button = document.getElementById('myButton');
var texts = ['𝐍𝐨𝐰 𝐥𝐨𝐚𝐝𝐢𝐧𝐠...', '𝐍𝐨𝐰 𝐥𝐨𝐚𝐝𝐢𝐧𝐠....','𝐍𝐨𝐰 𝐥𝐨𝐚𝐝𝐢𝐧𝐠.....', '𝐍𝐨𝐰 𝐥𝐨𝐚𝐝𝐢𝐧𝐠....'];
var index = 0;

function startPalao() {
document.getElementById('intro-screen').style.display = 'none';

var audio1 = document.getElementById('background-audio');
audio1.volume = 0.1;
audio1.play();
}

function autoStartPalao() {
setTimeout(startPalao, 18000); 
}

document.addEventListener('DOMContentLoaded', function() {
document.getElementById('intro-screen').addEventListener('click', startPalao);
document.body.addEventListener('touchstart', startPalao);
autoStartPalao(); 
});

function onPlayerReady(event) {
  event.target.playVideo();
  document.getElementById('player').style.display = 'none'; 
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('intro-screen').addEventListener('click', startPalao);
  document.body.addEventListener('touchstart', startPalao);
});


document.addEventListener('scroll', function() {
    let value = window.scrollY
    title.style.marginTop = value * 1.1 + 'px'

    leaf1.style.marginLeft = -value + 'px'
    leaf2.style.marginLeft = value + 'px'

    bush2.style.marginBottom = -value + 'px'

    mount1.style.marginBottom = -value * 1.1 + 'px'
    mount2.style.marginBottom = -value * 1.2 + 'px'
})


window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
  });

  window.location.href = window.location.href + '#';


  
  document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
      e.preventDefault();
    }
  });

  document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.keyCode == 83) {
      e.preventDefault();
    }
  });

  const parallax = document.querySelector('.parallax');
const images = parallax.querySelectorAll('img');

document.addEventListener('DOMContentLoaded', function() {
  const parallax = document.querySelector('.parallax');
  if (parallax) {
      const images = parallax.querySelectorAll('img');
      window.addEventListener('scroll', () => {
          const scrollPosition = window.scrollY;
          images.forEach((image, index) => {
              const speed = 0.5 + (index * 0.1);
              const offset = scrollPosition * speed;
              image.style.transform = `translateY(${offset}px) scale(${1 + (offset / 100)})`;
          });
      });
  } else {
      console.error('El elemento .parallax no se encontró en el DOM.');
  }
});

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  images.forEach((image, index) => {
    const speed = 0.5 + (index * 0.1);
    const offset = scrollPosition * speed;
    image.style.transform = `translateY(${offset}px) scale(${1 + (offset / 100)})`;
  });
});

document.addEventListener('contextmenu', function(event) {
  event.preventDefault(); 
});


currentTrack.play().catch(error => {
  console.error("Error al reproducir la pista:", error);
});

const items = document.querySelectorAll('.astro-NEXH5IXR li');
items.forEach(item => {
    const randomX = Math.random() * 100; 
    const randomY = Math.random() * 100; 
    item.style.left = `${randomX}vw`;
    item.style.top = `${randomY}vh`;
    const randomDelay = Math.random() * 5; 
    item.style.animationDelay = `${randomDelay}s`;
});