
const images = [
  "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2xhc3Nyb29tfGVufDF8fHx8MTc2MzczNzI0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1718327453695-4d32b94c90a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwc3R1ZHklMjByb29tfGVufDF8fHx8MTc2MzczNDQwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1703355685952-03ed19f70f51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwcm9vbSUyMG1vZGVybnxlbnwxfHx8fDE3NjM3MjkxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGhhbGx8ZW58MXx8fHwxNzYzNzQ5MTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

const carousel = document.getElementById("carousel");
let index = 0;

// Crear elementos <img>
images.forEach((src, i) => {
  const img = document.createElement("img");
  img.src = src;
  img.classList.add("carousel-img");
  if (i === 0) img.classList.add("active");
  carousel.appendChild(img);
});

// Carrusel automático
setInterval(() => {
  const imgs = document.querySelectorAll(".carousel-img");

  const current = imgs[index];
  current.classList.remove("active");
  current.classList.add("slide-out");

  index = (index + 1) % imgs.length;

  const next = imgs[index];
  next.classList.add("active");
  next.classList.remove("slide-out");

}, 4000);

// PARALLAX : mueve el fondo levemente al hacer scroll
window.addEventListener("scroll", () => {
  const offset = window.scrollY * 0.3;
  carousel.style.transform = `translateY(${offset}px)`;
});