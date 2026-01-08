import { initCarousel } from "./Modules-min/carousel min.js";
import { initGallery } from "./Modules-min/gallery min.js";
import { initModal } from "./Modules-min/modal min.js";

document.addEventListener("DOMContentLoaded", () => {
	// Initialiser la modal (création du DOM)
	const modal = initModal();

	// Initialiser la gallery en passant la modal
	initGallery(modal);

	// Initialiser le carrousel
	initCarousel();
});
