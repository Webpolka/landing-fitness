import { BaseHelpers } from "./helpers/base-helpers";
BaseHelpers.addLoadedClass();
BaseHelpers.calcScrollbarWidth();
BaseHelpers.addTouchClass();

/* ------------------------------------------------------------------------------------------------------------------------------
KEEN ABONEMENT SLIDER
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
	function initSliderAgain() {
		keenSlider = new KeenSlider("#abonement-slider", {
			loop: true,
			slides: {
				perView: 2.2,
				spacing: 20,
			},
			breakpoints: {
				"(max-width: 660px)": {
					slides: { perView: 1.54, spacing: 18 },
				},
			},
		});
	}

	// Инициализация слайдера
	var keenSlider = new KeenSlider("#abonement-slider", {
		loop: true,
		slides: {
			perView: 2.2,
			spacing: 20,
		},
		breakpoints: {
			"(max-width: 660px)": {
				slides: { perView: 1.54, spacing: 18 },
			},
		},
	});

	updateKeenDestroyer(keenSlider);

	window.onresize = updateKeenDestroyer;
	window.onchange = updateKeenDestroyer;

	function updateKeenDestroyer() {
		const sliderContainer = document.querySelector("#abonement-slider");
		const screenWidth = window.innerWidth;

		// Переключение на адаптивные блоки при ширине экрана меньше breakpoint
		if (screenWidth >= 992) {
			removeClasses(sliderContainer, "keen-slider");
			addClasses(sliderContainer, "row g-20");

			for (let slide of sliderContainer.children) {
				removeClasses(slide, "keen-slider__slide");
				addClasses(slide, "col-lg-6 col-xl-3"); // Используем Bootstrap классы
			}
			keenSlider.destroy();
		} else if (screenWidth < 992) {
			removeClasses(sliderContainer, "row g-20");
			addClasses(sliderContainer, "keen-slider");

			for (let slide of sliderContainer.children) {
				removeClasses(slide, "col-lg-6 col-xl-3");
				addClasses(slide, "keen-slider__slide");
			}
			initSliderAgain();
		}
	}

	function addClasses(el, classes) {
		var classNames = classes.split(" ");
		classNames.forEach((name) => el.classList.add(name));
		return el;
	}
	function removeClasses(el, classes) {
		var classNames = classes.split(" ");
		classNames.forEach((name) => el.classList.remove(name));
		return el;
	}
});
/* ------------------------------------------------------------------------------------------------------------------------------
BURGER
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
	const burger = document.querySelector("#burger");
	const burgerClose = document.querySelector("#burger-close");

	const mobileMenu = document.querySelector("#mobile-menu");
	const allMobileLinks = mobileMenu.querySelector(".mobile-menu_list").querySelectorAll("a");

	// const siteOverlay = document.querySelector("#site-overlay");

	allMobileLinks.forEach((link) => {
		link.addEventListener("click", function () {
			mobileMenu.classList.remove("active");
			removeNoScroll();
		});
	});

	burger.addEventListener("click", function () {
		mobileMenu.classList.add("active");
		addNoScroll();
	});
	burgerClose.addEventListener("click", function () {
		mobileMenu.classList.remove("active");
		removeNoScroll();
	});
	function addNoScroll() {
		document.documentElement.classList.add("no-scroll");
		// siteOverlay && siteOverlay.classList.add("active");
	}

	function removeNoScroll() {
		document.documentElement.classList.remove("no-scroll");
		// siteOverlay && siteOverlay.classList.remove("active");
	}
});

/* ------------------------------------------------------------------------------------------------------------------------------
SWIPER COMMAND
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
	const allCommandSwipers = document.querySelectorAll(".command-swiper");

	allCommandSwipers.forEach((slider) => {
		new Swiper(slider, {
			// Optional parameters
			loop: true,

			// Navigation arrows
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
	});
});

const welcomeSwiper = document.querySelector(".welcome-swiper");

welcomeSwiper &&
	new Swiper(welcomeSwiper, {
		// Optional parameters
		loop: true,

		// Navigation arrows
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		spaceBetween: 15,

		breakpoints: {
			640: {
				slidesPerView: 2,
				spaceBetween: 15,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1440: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
		},
	});

/* ------------------------------------------------------------------------------------------------------------------------------
Timer 24 hours
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
	const mainCounter = document.querySelector("#digits");

	if (mainCounter) {
		let totalSeconds = 24 * 60 * 60 - 1;

		const digitsContainer = document.getElementById("digits");
		const digitElements = [];

		const numDigits = 6; // HH:MM:SS
		for (let i = 0; i < numDigits; i++) {
			const digitDiv = document.createElement("div");
			digitDiv.className = "digit";

			// Внутри создаем контейнер для анимации
			digitDiv.innerHTML = `
      <div class="digit-inner">
        <div class="digit-old">${i === 0 ? "0" : "0"}</div>
      </div>
    `;
			digitsContainer.appendChild(digitDiv);
			digitElements.push(digitDiv);
		}

		function updateDigits(newDigits) {
			for (let i = 0; i < digitElements.length; i++) {
				const digitDiv = digitElements[i];
				const inner = digitDiv.querySelector(".digit-inner");

				// Получаем текущий отображаемый символ
				const currentOld = inner.querySelector(".digit-old");
				let currentChar;
				if (currentOld) {
					currentChar = currentOld.innerText;
				}

				const newChar = newDigits[i];

				if (currentChar !== newChar) {
					// Создаем элемент для новой цифры
					const newDigitDiv = document.createElement("div");
					newDigitDiv.className = "newDigit";
					newDigitDiv.innerText = newChar;

					// Создаем элемент для старой цифры (чтобы анимировать)
					const oldDigitDiv = document.createElement("div");
					oldDigitDiv.className = "oldDigit";
					oldDigitDiv.innerText = currentChar;

					// Удаляем старую цифру и добавляем новую
					inner.innerHTML = "";
					inner.appendChild(oldDigitDiv);
					inner.appendChild(newDigitDiv);

					// Анимация старой цифры (выезжает вниз)
					oldDigitDiv.style.animation = "slideUp 0.6s forwards";

					// Анимация новой цифры (выезжает снизу)
					newDigitDiv.style.animation = "slideInFromBottom 0.6s forwards";

					// После завершения анимации заменяем на простую цифру
					setTimeout(() => {
						inner.innerHTML = `<div class="digit-old">${newChar}</div>`;
					}, 600);
				}
			}
		}

		function getDigitsFromSeconds(seconds) {
			const h = Math.floor(seconds / 3600);
			const m = Math.floor((seconds % 3600) / 60);
			const s = seconds % 60;

			const hh = String(h).padStart(2, "0");
			const mm = String(m).padStart(2, "0");
			const ss = String(s).padStart(2, "0");

			return [...hh, ...mm, ...ss];
		}

		function startTimer() {
			if (totalSeconds < 0) {
				totalSeconds = 0;
				clearInterval(timerInterval);
			}
			const digitsArr = getDigitsFromSeconds(totalSeconds);
			updateDigits(digitsArr);
			totalSeconds--;
		}

		startTimer();
		const timerInterval = setInterval(startTimer, 1000);
	}
});

/* ------------------------------------------------------------------------------------------------------------------------------
Main gallery
--------------------------------------------------------------------------------------------------------------------------------*/
const mainGallery = document.querySelector("#main-gallery");
if (mainGallery) {
	const startIndex = 1;
	// Получаем все элементы миниатюр и просмотров
	const thumbnails = document.querySelectorAll(".gallery_thumbnails .gallery_thumbnail");
	const views = document.querySelectorAll(".gallery_views .gallery_view");
	const viewsContainer = document.querySelector(".gallery_views");

	// Обработчик наведения
	thumbnails.forEach((thumbnail, index) => {
		thumbnail.addEventListener("mouseenter", () => {
			// Убираем активные клссы для тумбнейлов
			thumbnails.forEach((thumb) => {
				thumb.classList.remove("active");
			});

			thumbnail.classList.add("active");
			// Скрываем все views
			views.forEach((view) => view.classList.remove("active"));
			// Показываем нужный view по индексу
			if (views[index]) {
				views[index].classList.add("active");
			}
		});
	});

	// Изначально показываем первый view
	thumbnails[startIndex].classList.add("active");
	views.forEach((view, index) => {
		if (index === startIndex) {
			view.classList.add("active");
		}
	});
}
