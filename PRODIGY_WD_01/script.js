// Get the menu icon, the menu, and all navigation links
const menuIcon = document.getElementById('menu-icon');
const menu = document.getElementById('menu');
const navLinks = document.querySelectorAll('#navbar ul li a');

// Toggle the menu when the menu icon is clicked
menuIcon.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Close the menu when a navigation link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});
