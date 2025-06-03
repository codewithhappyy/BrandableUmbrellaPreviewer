// Color Themes
const THEMES = {
    blue: {
        bg: "#ADD8E6",
        button: "#007bff",
        accent: "#007bff",
        umbrella: "assets/Blue_umbrella.png",
    },
    yellow: {
        bg: "#F7DC6F",
        button: "#F2C464",
        accent: "#F2C464",
        umbrella: "assets/Yellow_umbrella.png",
    },
    pink: {
        bg: "#FFC5C5",
        button: "#FF69B4",
        accent: "#FF69B4",
        umbrella: "assets/Pink_umbrella.png",
    },
};

// Initial Theme
let currentTheme = 'blue';

// DOM Elements
const themeContainer = document.getElementById('theme-container');
const umbrellaImage = document.getElementById('umbrella-image');
const logoPreview = document.getElementById('logo-preview');
const colorSwatches = document.getElementById('color-swatches');
const uploadButton = document.getElementById('upload-button');
const fileInput = document.getElementById('file-input');
const umbrellaContainer = document.querySelector('.umbrella-container');

// Generate Color Swatches
Object.keys(THEMES).forEach((theme) => {
    const swatch = document.createElement('div');
    swatch.classList.add('color-swatch');
    swatch.style.background = THEMES[theme].accent;
    swatch.addEventListener('click', () => {
        updateTheme(theme);
    });
    colorSwatches.appendChild(swatch);
});

// Update Theme
function updateTheme(theme) {
    currentTheme = theme;
    themeContainer.style.background = THEMES[theme].bg;
    uploadButton.style.background = THEMES[theme].button;
    umbrellaImage.src = THEMES[theme].umbrella;
    // Update selected color swatch
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach((swatch, index) => {
        if (Object.keys(THEMES)[index] === theme) {
            swatch.classList.add('selected');
        } else {
            swatch.classList.remove('selected');
        }
    });
}

// Handle Logo Upload
fileInput.addEventListener('change', handleLogoUpload);

function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/avif"].includes(file.type) || file.size > 5 * 1024 * 1024) {
        alert("Only .png/.jpg files under 5MB are allowed.");
        return;
    }
    const reader = new FileReader();
    reader.onload = () => {
        logoPreview.src = reader.result;
        logoPreview.style.display = 'block';
        positionLogo();
    };
    reader.readAsDataURL(file);
}

// Position Logo at the bottom of the umbrella
function positionLogo() {
     logoPreview.style.position = 'absolute';
    logoPreview.style.bottom = '44px'; // Adjusted bottom value
    logoPreview.style.left = '240px'; // Adjusted left value
    logoPreview.style.transform = 'scale(1)';
}
