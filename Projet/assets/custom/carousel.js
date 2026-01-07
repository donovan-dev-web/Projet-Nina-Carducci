export function initCarousel() {
	const wrapper = document.querySelector(".carousel-wrapper");
	const slides = [...wrapper.querySelectorAll(".carousel-items")];
	const prevBtn = document.getElementById("carousel-prev");
	const nextBtn = document.getElementById("carousel-next");
	const indicatorContainer = document.getElementById("carousel-indocator");

	/* ===== CREATE TRACK ===== */
	const track = document.createElement("div");
	track.className = "carousel-track";

	slides.forEach(slide => track.appendChild(slide));
	wrapper.appendChild(track);

	const total = slides.length;
	let index = 1;
	let isAnimating = false;

	/* ===== CLONES ===== */
	const firstClone = slides[0].cloneNode(true);
	const lastClone = slides[total - 1].cloneNode(true);

	track.appendChild(firstClone);
	track.insertBefore(lastClone, track.firstChild);

	const allSlides = [...track.children];

	/* ===== DIMENSIONS ===== */
	let slideWidth = wrapper.offsetWidth;

	window.addEventListener("resize", () => {
		slideWidth = wrapper.offsetWidth;
		setTranslate(false);
	});

	/* ===== INITIAL POSITION ===== */
	setTranslate(false);

	/* ===== EVENTS ===== */
	nextBtn.addEventListener("click", () => moveTo(index + 1));
	prevBtn.addEventListener("click", () => moveTo(index - 1));

	track.addEventListener("transitionend", () => {
		if (allSlides[index] === firstClone) {
			track.style.transition = "none";
			index = 1;
			setTranslate(false);
		}

		if (allSlides[index] === lastClone) {
			track.style.transition = "none";
			index = total;
			setTranslate(false);
		}

		isAnimating = false;
	});

	/* ===== INDICATORS ===== */
	createIndicators();
	updateIndicators();

	/* ===== FUNCTIONS ===== */

	function setTranslate(animate = true) {
		track.style.transition = animate ? "transform 0.5s ease" : "none";
		track.style.transform = `translateX(${-index * slideWidth}px)`;
	}

	function moveTo(newIndex) {
		if (isAnimating) return;
		isAnimating = true;

		index = newIndex;
		setTranslate(true);
		updateIndicators();
	}

	function createIndicators() {
		slides.forEach((_, i) => {
			const btn = document.createElement("button");
			btn.className = "carousel-indicator-btn";
            btn.ariaLabel = "Afficher image carrousel"
			btn.addEventListener("click", () => moveTo(i + 1));
			indicatorContainer.appendChild(btn);
		});
	}

	function updateIndicators() {
		const indicators = indicatorContainer.querySelectorAll("button");
		indicators.forEach(btn => btn.classList.remove("active"));

		let realIndex = index - 1;
		if (realIndex < 0) realIndex = total - 1;
		if (realIndex >= total) realIndex = 0;

		indicators[realIndex].classList.add("active");
	}
}
