import { initCarousel } from "./carousel.js";
import { initGallery } from "./gallery.js";
import { initModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
	// 1️⃣ Initialiser la modal (création du DOM)
	const modal = initModal();

	// 2️⃣ Initialiser la gallery en passant la modal
	initGallery(modal);

	// 3️⃣ Initialiser le carrousel
	initCarousel();
});
