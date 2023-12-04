
function loadImage() {
    const inputFile = document.getElementById('inputFile');
    const inputCanvas = document.getElementById('inputCanvas');
    const ctx = inputCanvas.getContext('2d');

    const file = inputFile.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
            // Draw the image on the canvas
            ctx.drawImage(img, 0, 0, inputCanvas.width, inputCanvas.height);

            // Call function to convert to grayscale
            convertToGrayscale();
        };
    };

    reader.readAsDataURL(file);
}

function convertToGrayscale() {
    const inputCanvas = document.getElementById('inputCanvas');
    const ctx = inputCanvas.getContext('2d');

    // Get image data from the canvas
    const imageData = ctx.getImageData(0, 0, inputCanvas.width, inputCanvas.height);
    const data = imageData.data;

    // Convert each pixel to grayscale
    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        // Convert to grayscale using luminosity formula
        const grayscale = 0.299 * red + 0.587 * green + 0.114 * blue;

        // Set the pixel values to grayscale
        data[i] = grayscale;
        data[i + 1] = grayscale;
        data[i + 2] = grayscale;
    }

    // Put the modified image data back on the canvas
    ctx.putImageData(imageData, 0, 0);
}

// Auto-executable function
(function autoExecute() {
    // Your code to be executed automatically after the page loads
})();

