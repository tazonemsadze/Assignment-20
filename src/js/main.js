"use strict";
// 1. setTimeout ან setInterval - ის გამოყენებით გააკეთეთ საათი რომელიც იმუშავებს როგორც ნამდვილი სააათი. გამოიყენეთ ატვირთული სურათი (საათი.png).

function getDateTime() {
  const now = new Date();

  let hours = now.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  hours = hours.toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateString = now.toLocaleDateString("en-US", options);

  document.querySelector("#time").textContent = timeString;
  document.querySelector("#date").textContent = dateString;
}

getDateTime();

// Using setInterval to update the clock function every second
setInterval(getDateTime, 1000);

// Using setTimeout to update the clock function every second
// function startClock() {
//   getDateTime();
//   setTimeout(startClock, 1000);
// }

// startClock();

// 2. ლექციაზე შექმნილ სლაიდერს დავამატოთ: ArrowLeft-ზე კლიკის დროს გადავიდეთ წინა სლაიდზე ArrowRight-ზე კლიკის დროს მომდევნო სლაიდზე

let activeSlide = 0;
const slides = document.querySelectorAll(".slide-item");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const pgnbtns = document.querySelector(".pgn-btns");
slides.forEach((slide) => {
  const createdBtn = document.createElement("button");
  pgnbtns.appendChild(createdBtn);
});

const btns = document.querySelectorAll(".pgn-btns button");

function renderActiveSLide() {
  slides.forEach((slide, index) => {
    if (index === activeSlide) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });

  btns.forEach((btn, index) => {
    if (index === activeSlide) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  // slides[activeSlide].classList.add("active");
}

renderActiveSLide();

function renderNextSlide() {
  if (activeSlide === slides.length - 1) {
    activeSlide = 0;
  } else {
    activeSlide++;
  }

  renderActiveSLide();
}

function renderPrevSlide() {
  if (activeSlide === 0) {
    activeSlide = slides.length - 1;
  } else {
    activeSlide--;
  }

  renderActiveSLide();
}

nextBtn.addEventListener("click", renderNextSlide);
prevBtn.addEventListener("click", renderPrevSlide);

let interval = setInterval(() => {
  renderNextSlide();
}, 3000);

btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    activeSlide = index;
    renderActiveSLide();
  });
});

const wrapper = document.querySelector(".slider-wrapper");

// wrapper.addEventListener("mouseenter", () => {
//   console.log("mouseenter");
//   if (interval) {
//     clearInterval(interval);
//     interval = null;
//   }
// });

// wrapper.addEventListener("mouseleave", () => {
//   interval = setInterval(() => {
//     renderNextSlide();
//   }, 3000);
// });

document.addEventListener("keydown", (e) => {
  e.key === "ArrowRight" && renderNextSlide();
});

document.addEventListener("keydown", (e) => {
  e.key === "ArrowLeft" && renderPrevSlide();
});

// document.addEventListener("keyup", (e) => {
//   console.log(e);
// });

// 3*(optional) დავამატოთ მარტივი countdown რომელიც გვიჩვენებს მომდევნო ლექციამდე (4 ივლისი, 20:00) დარჩენილ დროს (დღე, საათი, წუთი)

function timeTillLecture() {
  const currDate = new Date();
  const targetDate = new Date(currDate.getFullYear(), 6, 4, 20, 0, 0); // July 4th, 20:00 (8:00 PM)

  const timeLeft = targetDate - currDate;

  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const countdownText = `${hours.toString().padStart(2, "0")} : ${minutes
    .toString()
    .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;

  document.getElementById("countdown").textContent = countdownText;
}

function startCountdown() {
  timeTillLecture();
  setTimeout(startCountdown, 1000);
}

startCountdown();
