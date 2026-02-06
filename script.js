document.addEventListener("DOMContentLoaded", () => {

  /* ===== CONFIG ===== */

  const redditVideo = "https://preview.redd.it/2m5zz3mex5hg1.gif?width=720&format=mp4";
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
      bgVideo.src = redditVideo;
      bgVideo.play().catch(()=>{});

      bgAudio.src = audioFondo;
      bgAudio.play().catch(()=>{});

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

    popup.innerHTML = `<span class="close">&times;</span>`;

    const video = document.createElement("video");
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    const source = document.createElement("source");
    source.src = elegido.src;
    source.type = "video/mp4";

    video.appendChild(source);
    popup.appendChild(video);

    popup.querySelector(".close").onclick = e => {
      e.stopPropagation();
      popup.remove();
    };

    popupZone.appendChild(popup);
  });

});


