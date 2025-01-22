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
        navbar.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.3)';
        // navbar.style.background = '#2d3e50'; // Darker shade
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
    logo.style.transition = 'transform 0.3s ease'; // Add smooth transition
});

logo.addEventListener('mouseleave', () => {
    logo.style.transform = 'scale(1)';
});

// Hamburger toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
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

// Contact form validation and submission
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get the form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Form validation
    if (!name || !email || !message) {
        alert('Please fill out all fields before submitting.');
        return;
    }

    // Additional validation for email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Hide the form and display a confirmation message
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('submittedName').textContent = name;
    document.getElementById('submittedEmail').textContent = email;
    document.getElementById('submittedMessage').textContent = message;
    document.getElementById('submittedData').style.display = 'block';

    // Show the popup message with animation
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';
    popup.classList.add('fadeIn'); // Add fade-in effect
});

// Function to close the popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Toggle dark mode class on body
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode')); // Save preference in localStorage
});

// Load dark mode preference from localStorage
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Sticky footer on scroll
const footer = document.querySelector('footer');
window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50) {
        footer.classList.add('sticky');
    } else {
        footer.classList.remove('sticky');
    }
});

// Responsive image gallery
const galleryImages = document.querySelectorAll('.gallery img');
galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        const modalImage = document.createElement('img');
        modalImage.src = image.src;
        modal.appendChild(modalImage);
        document.body.appendChild(modal);

        // Close modal on click
        modal.addEventListener('click', () => {
            modal.remove();
        });
    });
});

// Tooltip for navigation links
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = link.textContent;
        document.body.appendChild(tooltip);

        // Position the tooltip
        const rect = link.getBoundingClientRect();
        tooltip.style.top = `${rect.top - 30}px`;
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;

        // Remove tooltip when mouse leaves
        link.addEventListener('mouseleave', () => {
            tooltip.remove();
        });
    });
});
