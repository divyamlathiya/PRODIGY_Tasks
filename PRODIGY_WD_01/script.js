// Highlight active navigation link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Change navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0px 2px 5px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.background = '#1e293b'; // Original color
        navbar.style.boxShadow = 'none';
    }
});

// Add 'scrolled' class to header on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        const targetId = link.getAttribute('href').split('#')[1];
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            event.preventDefault();
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Adjust for fixed navbar
                behavior: 'smooth',
            });
        }
    });
});

// Navbar logo hover animation
const logo = document.querySelector('.navbar img');
logo.addEventListener('mouseenter', () => {
    logo.style.transform = 'scale(1.1)';
});

logo.addEventListener('mouseleave', () => {
    logo.style.transform = 'scale(1)';
});

// Hamburger toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Toggle the menu when the hamburger (menu icon) is clicked
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');  // Toggle the hamburger icon animation
    navMenu.classList.toggle('active');    // Toggle the navigation menu visibility
});

// Close the menu when a navigation link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');  // Close the menu when a link is clicked
        hamburger.classList.remove('active');  // Reset the hamburger icon animation
    });
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get the form data
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Hide the form
    document.getElementById('contactForm').style.display = 'none';

    // Display the submitted details
    document.getElementById('submittedName').textContent = name;
    document.getElementById('submittedEmail').textContent = email;
    document.getElementById('submittedMessage').textContent = message;
    document.getElementById('submittedData').style.display = 'block';

    // Show the popup message
    document.getElementById('popup').style.display = 'flex';
});

// Function to close the popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
