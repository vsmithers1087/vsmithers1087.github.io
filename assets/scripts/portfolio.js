// Get the modal, close button, and modal content as before
const imageContainer = document.getElementById('image-container'); // Get the image container div
const liveUrl = '../assets/db/db.json';
const localhostUrl = 'http://localhost:3000/images';


// Add an event listener to the document (outside the modal)
document.addEventListener('click', (event) => {
    if (modal.style.display === 'block' && event.target !== modal && !modal.contains(event.target)) {
        // If the modal is open and the click target is not the modal or its descendants
        closeModal();
    }
});

// Function to load data from the JSON file and create image containers
function loadImagesFromJson() {
    fetch(liveUrl) // Updated to use 'bells.json' in the same directory
        .then(response => {
             if (!response.ok) {
                 throw new Error('Network response was not ok');
             }
             return response.json();
         })
        .then(data => {
            console.log('Received JSON data:', data);
            const imageContainer = document.getElementById('image-container');
            data.data.forEach(entry => {
                const imageDiv = document.createElement('div');
                imageDiv.className = 'image-container';
                imageDiv.dataset.title = entry['data-title'];
                imageDiv.dataset.material = entry['data-material'];
                imageDiv.dataset.dimensions = entry['data-dimensions'];
                imageDiv.dataset.year = entry['data-year'];
                imageDiv.dataset.available = entry['available'];
                const image = document.createElement('img');
                image.src = entry['img src'];
                image.alt = entry['data-title'];
                imageDiv.appendChild(image);
                imageContainer.appendChild(imageDiv);
            });

            // Add an event listener to open the modal when clicking on an image
            const imageContainers = document.querySelectorAll('.image-container');
            imageContainers.forEach(container => {
                container.addEventListener('click', (event) => {
                    const image = container.querySelector('img');
                    const title = container.dataset.title;
                    const material = container.dataset.material;
                    const dimensions = container.dataset.dimensions;
                    const year = container.dataset.year;
                    const available = container.dataset.available;
                    // Construct the URL with parameters and navigate to the image detail page
                    const detailPageUrl = `image_details.html?title=${encodeURIComponent(title)}&material=${encodeURIComponent(material)}&dimensions=${encodeURIComponent(dimensions)}&year=${encodeURIComponent(year)}&available=${encodeURIComponent(available)}&imageSrc=${encodeURIComponent(image.src)}`;
                    window.location.href = detailPageUrl;
                    event.stopPropagation(); // Prevent the click from propagating to the document
                });
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
}

// Call the function to load data and create image containers when the page loads
window.addEventListener('load', loadImagesFromJson);
