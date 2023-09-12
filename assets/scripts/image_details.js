// Function to parse URL parameters
function getUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
   
    return {
        title: urlParams.get('title'),
        material: urlParams.get('material'),
        dimensions: urlParams.get('dimensions'),
        year: urlParams.get('year'),
        imgSrc: urlParams.get('imageSrc'),
        available: urlParams.get('available')// Added imgSrc parameter
    };
}

// Function to populate content with URL parameters
function populateContent() {
    const params = getUrlParameters();
    
    // Populate the content with the retrieved parameters
    document.querySelector('#modal-title').textContent = params.title;
    document.querySelector('#modal-material').textContent = params.material;
    document.querySelector('#modal-dimensions').textContent = params.dimensions;
    document.querySelector('#modal-year').textContent = params.year;
    document.querySelector('#modal-available').textContent = params.available;
    // Set the src attribute of the enlarged-image
    const enlargedImage = document.querySelector('#enlarged-image');
    enlargedImage.src = params.imgSrc;
    enlargedImage.alt = params.title;
}

// Call the function to populate content when the page loads
window.addEventListener('load', populateContent);
