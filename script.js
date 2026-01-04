/* ===== DATA ===== */
const images = [
  "images/KL407498.jpg",
  "images/KL407507.jpg",
  "images/KL407599.jpg",
  "images/KL407740.jpg",
  "images/KL407768.jpg",
  "images/KL407801.jpg",
  "images/KL407856.jpg",
  "images/KL407876.jpg",
  "images/KL407901.jpg",
  "images/KL407944.jpg",
  "images/KL407949.jpg",
  "images/KL407972.jpg",
  "images/KL408016.jpg",
  "images/KL408051.jpg",
  "images/KL408102.jpg",
  "images/KL408107.jpg",
  "images/KL408169.jpg",
];

/* ===== ELEMENT ===== */
const wrapper = document.querySelector(".image-wrapper");
const mainImage = wrapper.querySelector("img");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const thumbs = document.querySelectorAll(".thumb:not(.more)");
const moreThumb = document.querySelector(".thumb.more");

let index = 0;
let timer = null;

/* ===== CORE ===== */
function show(i) {
  index = (i + images.length) % images.length;

  // reset animation
  wrapper.classList.remove("animate");
  void wrapper.offsetWidth;

  // đổi ảnh
  mainImage.src = images[index];
  lightboxImage.src = images[index];

  // chạy animation
  wrapper.classList.add("animate");

  // active thumb
  thumbs.forEach((t) => t.classList.remove("active"));
  if (thumbs[index]) thumbs[index].classList.add("active");
}

/* ===== AUTOPLAY ===== */
function startAuto() {
  timer = setInterval(() => {
    show(index + 1);
  }, 5000);
}

function stopAuto() {
  clearInterval(timer);
}

/* ===== THUMB CLICK ===== */
thumbs.forEach((thumb, i) => {
  thumb.addEventListener("click", () => {
    stopAuto();
    show(i);
    startAuto();
  });
});

/* ===== +12 CLICK ===== */
moreThumb.addEventListener("click", () => {
  stopAuto();
  show(4);
  lightbox.classList.add("active");
});

/* ===== LIGHTBOX ===== */
mainImage.addEventListener("click", () => {
  stopAuto();
  lightbox.classList.add("active");
});

document.querySelector(".close").onclick = () => {
  lightbox.classList.remove("active");
  startAuto;
};

document.querySelector(".next").onclick = () => show(index + 1);
document.querySelector(".prev").onclick = () => show(index - 1);

/* ===== SWIPE MOBILE ===== */
let startX = 0;

lightbox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) show(index + 1);
  if (endX - startX > 50) show(index - 1);
});

/* ===== INIT ===== */
show(0);
startAuto();

// Thời điểm mục tiêu: 09:00 27/01/2026 (GMT+7)
const targetDate = new Date("2026-01-27T09:00:00+07:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    clearInterval(timer);
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    alert("⏰ Đã đến 9h sáng 27/01/2026!");
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
const timers = setInterval(updateCountdown, 1000);

window.addEventListener("load", () => {
  const music = document.getElementById("bg-music");
  const btn = document.getElementById("music-btn");

  music.volume = 0.5;

  // thử autoplay
  music
    .play()
    .then(() => {
      btn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    })
    .catch(() => {
      // autoplay bị chặn
      btn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    });

  btn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      btn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    } else {
      music.pause();
      btn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
  });
});

const openBtn = document.getElementById("open-invite");
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const music = document.getElementById("bg-music");

openBtn.addEventListener("click", () => {
  setTimeout(() => {
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    intro.style.display = "none";
    main.style.display = "block";

    // bật nhạc sau user interaction (không bị chặn)
    music.volume = 0.5;
    music.play();
  }, 500);
});

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let width, height;
let snowflakes = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

function createSnowflakes() {
  snowflakes = [];
  for (let i = 0; i < 120; i++) {
    snowflakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 1,
      d: Math.random() + 0.5,
    });
  }
}

function drawSnow() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.beginPath();

  for (let i = 0; i < snowflakes.length; i++) {
    const f = snowflakes[i];
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
  }

  ctx.fill();
  moveSnow();
}

let angle = 0;

function moveSnow() {
  angle += 0.01;
  for (let i = 0; i < snowflakes.length; i++) {
    const f = snowflakes[i];
    f.y += Math.pow(f.d, 2) + 0.5;
    f.x += Math.sin(angle) * 0.5;

    if (f.y > height) {
      snowflakes[i] = {
        x: Math.random() * width,
        y: 0,
        r: f.r,
        d: f.d,
      };
    }
  }
}

createSnowflakes();
const snowTimer = setInterval(drawSnow, 30);

// 🔴 TẮT TUYẾT KHI MỞ THIỆP
document.getElementById("open-invite").addEventListener("click", () => {
  clearInterval(snowTimer);
  canvas.remove();
});

function loadGuestName() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("to");

  const guestEl = document.getElementById("guestName");

  if (name) {
    guestEl.textContent = decodeURIComponent(name);
  } else {
    guestEl.textContent = "Bạn";
  }
}

loadGuestName();

const sakuraCanvas = document.getElementById("sakura");
const sCtx = sakuraCanvas.getContext("2d");

let sw, sh;
let petals = [];
let sakuraTimer;

function resizeSakura() {
  sw = sakuraCanvas.width = window.innerWidth;
  sh = sakuraCanvas.height = document.body.scrollHeight;
}

window.addEventListener("resize", resizeSakura);
resizeSakura();

function createPetals() {
  petals = [];
  for (let i = 0; i < 40; i++) {
    petals.push({
      x: Math.random() * sw,
      y: Math.random() * sh,
      r: Math.random() * 6 + 4,
      speedY: Math.random() * 1 + 0.5,
      speedX: Math.random() * 0.5 - 0.25,
      rot: Math.random() * Math.PI,
      rotSpeed: Math.random() * 0.02 - 0.01,
    });
  }
}

function drawPetals() {
  sCtx.clearRect(0, 0, sw, sh);

  petals.forEach((p) => {
    sCtx.save();
    sCtx.translate(p.x, p.y);
    sCtx.rotate(p.rot);

    sCtx.fillStyle = "rgba(255,182,193,0.85)";
    sCtx.beginPath();
    sCtx.moveTo(0, 0);
    sCtx.quadraticCurveTo(p.r, -p.r, p.r * 2, 0);
    sCtx.quadraticCurveTo(p.r, p.r, 0, 0);
    sCtx.fill();

    sCtx.restore();

    p.y += p.speedY;
    p.x += p.speedX;
    p.rot += p.rotSpeed;

    if (p.y > sh || p.x < -50 || p.x > sw + 50) {
      p.y = -20;
      p.x = Math.random() * sw;
    }
  });
}

function startSakura() {
  createPetals();
  sakuraTimer = setInterval(drawPetals, 30);
}

// 🌸 CHẠY HOA ĐÀO KHI MỞ THIỆP
document.getElementById("open-invite").addEventListener("click", () => {
  setTimeout(startSakura, 800); // đợi intro fade xong
});

/* ===== SCROLL REVEAL ===== */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

reveals.forEach((el) => observer.observe(el));

function isMessenger() {
  return /FBAN|FBAV|Messenger/i.test(navigator.userAgent);
}

if (isMessenger()) {
  document.body.classList.add("in-messenger");
}

function openMap() {
  const address = "Hưng Yên Nam 5, Yên Trung, Nghệ An";
  const encoded = encodeURIComponent(address);

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);

  if (isIOS) {
    // iPhone → Apple Maps
    window.open(`https://maps.apple.com/?q=${encoded}`, "_blank");
  } else if (isAndroid) {
    // Android → Google Maps app
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encoded}`,
      "_blank"
    );
  } else {
    // PC
    window.open(`https://www.google.com/maps?q=${encoded}`, "_blank");
  }
}

const video = document.querySelector(".wedding-video");
const bgMusic = document.getElementById("bg-music");

let videoPlaying = false;

if (video) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // ▶️ scroll tới video
          if (!videoPlaying) {
            video.play().catch(() => {});
            videoPlaying = true;

            // tắt nhạc nền
            if (bgMusic && !bgMusic.paused) {
              bgMusic.pause();
            }
          }
        } else {
          // ⏸️ scroll rời khỏi video
          if (videoPlaying) {
            video.pause();
            videoPlaying = false;

            // 🎵 bật lại nhạc nền
            if (bgMusic && bgMusic.paused) {
              bgMusic.play().catch(() => {});
            }
          }
        }
      });
    },
    {
      threshold: 0.6, // thấy 60% video mới play
    }
  );

  videoObserver.observe(video);

  // 🎵 nếu xem hết video → bật lại nhạc
  video.addEventListener("ended", () => {
    videoPlaying = false;
    if (bgMusic) {
      bgMusic.play().catch(() => {});
    }
  });
}

if (video) {
  video.addEventListener("loadeddata", () => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // gán frame đầu làm poster
    video.poster = canvas.toDataURL("image/jpeg");
  });
}
