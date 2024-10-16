// Function to open the modal
function openModal(modalId) {
	// Add 'active' class to modal environment and the specific modal
	document.getElementById('modalEnv').classList.add('active');
	document.getElementById(modalId).classList.add('active');
	document.body.classList.remove('is-mobile-overlay-active');
}

// Function to close the modal
function closeModal() {
	// Remove 'active' class from modal environment and all modals
	document.getElementById('modalEnv').classList.remove('active');
	document.querySelectorAll('.modal.active').forEach(function(modal) {
		modal.classList.remove('active');
	});
}

// Add event listeners for modal trigger buttons
document.querySelectorAll('.modal-trigger').forEach(function(button) {
	button.addEventListener('click', function() {
		openModal(button.name); // Open corresponding modal
	});
});

// Add event listeners for close buttons in modals
document.querySelectorAll('.modal .btn-sq').forEach(function(closeButton) {
	closeButton.addEventListener('click', closeModal);
});

// Add event listener for clicking on the backdrop (modalEnv)
document.getElementById('modalEnv').addEventListener('click', function(event) {
	// Close modal if the clicked element is the backdrop (modalEnv) itself, not the modal
	if (event.target === this) {
		closeModal();
	}
});


// Smooth scroll to anchor links with a fixed 5rem offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function(event) {
		// Prevent default anchor behavior
		event.preventDefault();

		// Get the target element by its ID (removing the '#' from the href)
		const targetId = this.getAttribute('href').substring(1);
		const targetElement = document.getElementById(targetId);

		// Check if the target element exists
		if (targetElement) {
			// Set a fixed 5rem offset (80px)
			const fixedOffset = 5 * 16; // Convert rem to pixels (1rem = 16px)

			// Get the Y position of the target element and subtract the fixed offset
			const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - fixedOffset;

			// Smooth scroll to the target position
			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			});
		}

		// Optionally close the navigation if it is active (for mobile users)
		if (mainNav.classList.contains('active')) {
			mainNav.classList.remove('active');
		}
	});
});

/* Video Hero Script */
document.addEventListener("DOMContentLoaded", function() {
	// Get all elements with the class .sqs-video-overlay
	var videoOverlays = document.querySelectorAll('.sqs-video-overlay');

	videoOverlays.forEach(function(overlay) {
		// Find the video caption outside the .sqs-video-overlay
		var captionWrapper = overlay.closest('.sqs-block-content').querySelector('.video-caption-wrapper');
		
		if (captionWrapper) {
			var caption = captionWrapper.querySelector('.video-caption');

			if (caption) {
				// Move the .video-caption inside .sqs-video-overlay
				overlay.appendChild(caption);
				// Optionally hide the original caption wrapper
				captionWrapper.style.display = 'none'; 

				// Add the "New!" paragraph to the beginning of the caption
				var newTag = document.createElement('span');
				newTag.classList.add('tag', 'wiggle-continuous');
				newTag.innerHTML = 'New!';
				
				// Insert the newTag at the beginning of the .video-caption
				caption.insertBefore(newTag, caption.firstChild);
			}
		}
	});
});

/* Wiggle Script */
document.addEventListener("DOMContentLoaded", function() {
	// Select all elements you want to observe
	const elementsToObserve = document.querySelectorAll('.tag, .heading-h2, .album-title,  .btn-group-h .btn, #cast li');

	// Set up the observer with a callback for when elements enter or leave the viewport
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('in-view');
			} else {
				entry.target.classList.remove('in-view');
			}
		});
	}, { threshold: 0.5 }); // Threshold of 50% visibility

	// Start observing each element
	elementsToObserve.forEach(element => {
		observer.observe(element);
	});
});

// Function to modify venue names, locations, and append the year
function modifyTourDates() {
	// Target all venue name elements and trim text after the '@' symbol
	const venueNames = document.querySelectorAll('.sqs-tourdates__venue-name');
	venueNames.forEach(function(venue) {
		const text = venue.textContent;
		if (text.includes('@')) {
			venue.textContent = text.split('@')[0].trim();
		}
	});

	// Target all location anchor tags and remove ", United States"
	const locations = document.querySelectorAll('.sqs-tourdates__location a');
	locations.forEach(function(location) {
		const text = location.textContent;
		if (text.includes(', United States')) {
			location.textContent = text.replace(', United States', '').trim();
		}
	});

	// Append the year to the date elements
	const timeframes = document.querySelectorAll('.sqs-tourdates__timeframe');
	timeframes.forEach(function(timeframe) {
		const dateTime = timeframe.getAttribute('data-tour-datetime');
		if (dateTime) {
			const year = new Date(dateTime).getFullYear(); // Extract the year from the datetime
			const dateElement = timeframe.querySelector('.sqs-tourdates__date');
			if (dateElement && !dateElement.textContent.includes(year)) {
				dateElement.textContent += `, ${year}`; // Append the year to the date
			}
		}
	});
}
	
// Set up a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		if (mutation.addedNodes.length) {
			modifyTourDates(); // Call the function whenever new nodes are added
		}
	});
});

// Start observing the document's body for any changes
observer.observe(document.body, { childList: true, subtree: true });

// Call the function once initially to handle already loaded content
modifyTourDates();
