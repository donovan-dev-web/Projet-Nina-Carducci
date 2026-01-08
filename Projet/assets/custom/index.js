import { initCarousel } from "./carousel min.js";
import { initGallery } from "./gallery min.js";
import { initModal } from "./modal min.js";

document.addEventListener("DOMContentLoaded", () => {
	// Initialiser la modal (création du DOM)
	const modal = initModal();

	// Initialiser la gallery en passant la modal
	initGallery(modal);

	// Initialiser le carrousel
	initCarousel();
});
