document.addEventListener("DOMContentLoaded", () => {

  /* ===== CONFIG ===== */

  const videoFondoLocal = "media/videos/fondo.mp4";
  const audioFondo = "media/audio/fondo.mp3";

  const libreria = {
    oso: [
      { tipo: "video", src: "media/videos/oso1.mp4" },
      { tipo: "video", src: "media/videos/oso2.mp4" },
      { tipo: "video", src: "media/videos/oso3.mp4" },
 { tipo: "video", src: "media/videos/oso4.mp4" },
      { tipo: "video", src: "media/videos/oso5.mp4" },
      { tipo: "video", src: "media/videos/oso6.mp4" },
 { tipo: "video", src: "media/videos/oso7.mp4" },
      { tipo: "video", src: "media/videos/oso8.mp4" },
      { tipo: "video", src: "media/videos/oso9.mp4" },

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
    b.addEventListener("click", () => {
      categoriaActual = b.dataset.cat;
      selector.style.display = "none";
      main.style.display = "flex";
    });
  });

  /* ===== POPUPS ===== */
  btn.addEventListener("click", () => {

    if (!categoriaActual || !libreria[categoriaActual]) return;

if (primeraVez) {

  bgVideo.src = videoFondoLocal;
  bgVideo.muted = true;
  bgVideo.loop = true;
  bgVideo.playsInline = true;
  bgVideo.preload = "auto";

  bgVideo.oncanplay = () => {
    bgVideo.play().catch(()=>{});
    bgWrap.style.opacity = "1";
  };

  bgAudio.src = audioFondo;
  bgAudio.loop = true;
  bgAudio.play().catch(()=>{});

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

    popup.innerHTML = `<span class="close">&times;</span>`;

const video = document.createElement("video");
video.autoplay = true;
video.loop = true;
video.muted = true;        // empieza muted
video.playsInline = true;
video.preload = "auto";

video.src = elegido.src;

video.oncanplay = () => {
  // 🔊 activar sonido tras interacción del usuario
  video.muted = false;
  video.volume = 1.0;

  video.play().catch(err => {
    console.warn("No se pudo reproducir con sonido:", err);
  });
};

popup.appendChild(video);


    popup.querySelector(".close").onclick = e => {
      e.stopPropagation();
      popup.remove();
    };

    popupZone.appendChild(popup);
  });

});


