// import Swiper JS
import Swiper from "swiper";

export const homeSwiper = () => {
  const logoSwiper = new Swiper(".c-logos__swiper", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: ".c-logos__button--next",
      prevEl: ".c-logos__button--prev",
    },
  });

  const nextButton = document.querySelector(".c-logos__button--next");
  const prevButton = document.querySelector(".c-logos__button--prev");

  nextButton.addEventListener("click", () => {
    logoSwiper.slideNext();
  });

  prevButton.addEventListener("click", () => {
    logoSwiper.slidePrev();
  });
};
