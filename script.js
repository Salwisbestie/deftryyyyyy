/* ===== CONFIG ===== */

// Vídeo fondo (reddit o local)
const redditVideo = "https://preview.redd.it/2m5zz3mex5hg1.gif?width=720&format=mp4";

// Audio local
const audioFondo = "media/audio/fondo.mp3";

/* 📦 LIBRERÍA LOCAL */
const libreria = {
  oso: [
    { tipo: "video", src: "media/videos/oso1.mp4" },
    { tipo: "video", src: "media/videos/oso2.mp4" },
    { tipo: "video", src: "media/videos/oso3.mp4" }
    { tipo: "video", src: "media/videos/oso4.mp4" },
    { tipo: "video", src: "media/videos/oso5.mp4" },
    { tipo: "video", src: "media/videos/oso6.mp4" }
    { tipo: "video", src: "media/videos/oso7.mp4" },
    { tipo: "video", src: "media/videos/oso8.mp4" },
    { tipo: "video", src: "media/videos/oso9.mp4" },
{ tipo: "video", src: "media/videos/oso9.mp4" }
  ]
};

/* ===== ESTADO ===== */
let categoriaActual = null;
let primeraVez = true;
let zIndex = 10;

/* ===== ELEMENTOS ===== */
const selector = document.getElementById("selector");
const main = document.getElementById("main");
const btn = document.getElementById("openBtn");
const popupZone = document.getElementById("popupZone");
const bgVideo = document.getElementById("bgVideo");
const bgWrap = document.getElementById("videoBackground");
const bgAudio = document.getElementById("bgAudio");

/* ===== SELECCIÓN ===== */
document.querySelectorAll(".selector-btn").forEach(b => {
  b.onclick = () => {
    categoriaActual = b.dataset.cat;
    selector.style.display = "none";
    main.style.display = "flex";
  };
});

/* ===== POPUPS ===== */
btn.onclick = () => {

  /* PRIMERA VEZ */
  if (primeraVez) {
    bgVideo.src = redditVideo;
    bgVideo.play();

    bgAudio.src = audioFondo;
    bgAudio.play();

    bgWrap.style.opacity = "1";
    primeraVez = false;
  }

  const lista = libreria[categoriaActual];
  const elegido = lista[Math.floor(Math.random() * lista.length)];

  const popup = document.createElement("div");
  popup.className = "popup";
  popup.style.zIndex = ++zIndex;

  let x, y, r;
  do {
    r = btn.getBoundingClientRect();
    x = Math.random() * (innerWidth - 360);
    y = Math.random() * (innerHeight - 420);
  } while (
    x < r.right &&
    x + 340 > r.left &&
    y < r.bottom &&
    y + 380 > r.top
  );

  popup.style.left = x + "px";
  popup.style.top = y + "px";

  popup.innerHTML = `
    <span class="close">&times;</span>
    <video autoplay loop muted playsinline>
      <source src="${elegido.src}" type="video/mp4">
    </video>
  `;

  popup.querySelector(".close").onclick = e => {
    e.stopPropagation();
    popup.remove();
  };

  popupZone.appendChild(popup);
};
