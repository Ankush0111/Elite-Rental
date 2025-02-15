import ScrollReveal from 'scrollreveal';
import Swiper, { Navigation, Pagination } from 'swiper';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';


const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

// Toggle Menu
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.className = isOpen ? "ri-close-line" : "ri-menu-line";
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.className = "ri-menu-line";
});

// ScrollReveal Options
const scrollRevealOption = {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
};

// Applying ScrollReveal Animations
ScrollReveal().reveal(".header__container h1", { ...scrollRevealOption });
ScrollReveal().reveal(".header__container form", { ...scrollRevealOption, delay: 500 });
ScrollReveal().reveal(".header__container img", { ...scrollRevealOption, delay: 1000 });
ScrollReveal().reveal(".range__card", { duration: 1000, interval: 500 });
ScrollReveal().reveal(".location__image img", { ...scrollRevealOption, origin: "right" });
ScrollReveal().reveal(".location__content .section__header", { ...scrollRevealOption, delay: 500 });
ScrollReveal().reveal(".location__content p", { ...scrollRevealOption, delay: 1000 });
ScrollReveal().reveal(".location__content .location__btn", { ...scrollRevealOption, delay: 1500 });
ScrollReveal().reveal(".story__card", { ...scrollRevealOption, interval: 500 });
ScrollReveal().reveal(".download__image img", { ...scrollRevealOption, origin: "right" });
ScrollReveal().reveal(".download__content .section__header", { ...scrollRevealOption, delay: 500 });
ScrollReveal().reveal(".download__links", { ...scrollRevealOption, delay: 1000 });

// Initial Select Card and Price Update
const selectCards = document.querySelectorAll(".select__card");
selectCards[0].classList.add("show__info");

const prices = ["225", "455", "275", "625", "395"];
const priceEl = document.getElementById("select-price");

function updateSwiperImage(index) {
  priceEl.innerText = prices[index];
  selectCards.forEach((item, i) => {
    item.classList.toggle("show__info", i === index);
  });
}

// Initialize Swiper with specific event listener
const swiper = new Swiper(".swiper", {
  loop: true,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    depth: 500,
    modifier: 1,
    scale: 0.75,
    slideShadows: false,
    stretch: -100,
  },
  on: {
    slideChangeTransitionStart() {
      updateSwiperImage(swiper.realIndex);
    }
  }
});

// Duplicate Banner Content Once
const banner = document.querySelector(".banner__wrapper");
if (banner && banner.children.length > 0 && !banner.querySelector("[aria-hidden='true']")) {
  const bannerContent = Array.from(banner.children);
  bannerContent.forEach((item) => {
    const duplicateNode = item.cloneNode(true);
    duplicateNode.setAttribute("aria-hidden", true);
    banner.appendChild(duplicateNode);
  });
}
