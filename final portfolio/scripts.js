// Navigation functionality
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
    });
});

// Set active nav link based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 150)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Get favicon elements
const favicon = document.getElementById('favicon');
const shortcutIcon = document.getElementById('shortcut-icon');

// Dark/Light mode toggle with SVG images
const themeToggle = document.getElementById('themeToggle');
const lightModeIcon = document.getElementById('lightModeIcon');
const darkModeIcon = document.getElementById('darkModeIcon');
const githubLightIcon = document.getElementById('githubLightIcon');
const githubDarkIcon = document.getElementById('githubDarkIcon');
const linkedinLightIcon = document.getElementById('linkedinLightIcon');
const linkedinDarkIcon = document.getElementById('linkedinDarkIcon');