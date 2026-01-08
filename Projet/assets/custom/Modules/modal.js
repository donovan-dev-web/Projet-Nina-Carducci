export function initModal() {
	let overlay, modalContainer, imgElement, prevBtn, nextBtn;
	let images = [];
	let currentIndex = 0;

	// ===== INITIALISATION =====
	function createModal() {
		// Overlay
		overlay = document.createElement("div");
		overlay.className = "modal-overlay";

		// Container
		modalContainer = document.createElement("div");
		modalContainer.className = "modal-container";

		// Image
		imgElement = document.createElement("img");
		imgElement.className = "modal-image";

		// Buttons
		prevBtn = document.createElement("button");
		prevBtn.className = "modal-btn prev";
		prevBtn.textContent = "<";
        prevBtn.ariaLabel = "Images précédentes";

		nextBtn = document.createElement("button");
		nextBtn.className = "modal-btn next";
		nextBtn.textContent = ">";
        prevBtn.ariaLabel = "Images suivante";

		// Assemble
		modalContainer.appendChild(prevBtn);
		modalContainer.appendChild(imgElement);
		modalContainer.appendChild(nextBtn);
		overlay.appendChild(modalContainer);
		document.body.appendChild(overlay);

		// Events
		overlay.addEventListener("click", e => {
			if (e.target === overlay) closeModal();
		});

		prevBtn.addEventListener("click", e => {
			e.stopPropagation();
			showPrev();
		});

		nextBtn.addEventListener("click", e => {
			e.stopPropagation();
			showNext();
		});
	}

	// ===== OUVERTURE =====
	function openModal(imgs, startIndex = 0) {
		if (!overlay) createModal();

		images = imgs;
		currentIndex = startIndex;
		updateImage();

		overlay.classList.add("active");
	}

	// ===== FERMETURE =====
	function closeModal() {
		overlay.classList.remove("active");
	}

	// ===== NAVIGATION =====
	function showPrev() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
		updateImage();
	}

	function showNext() {
		currentIndex = (currentIndex + 1) % images.length;
		updateImage();
	}

	function updateImage() {
		imgElement.style.opacity = 0;
		const { src, alt } = images[currentIndex];
		imgElement.src = src;
		imgElement.alt = alt;

		setTimeout(() => {
			imgElement.style.opacity = 1;
		}, 50);
	}

	return {
		openModal,
		closeModal,
	};
}
