// Menu Toggle Functionality for Mobile/Tablet Devices with Enhanced Features
document.getElementById("menu-icon").addEventListener("click", function () {
    const menu = document.getElementById("navbar").querySelector("ul");
    
    // Toggle the 'active' class for smooth transitions and cleaner style control
    menu.classList.toggle("active");

    // Optionally: You can also handle other visual states like changing the menu icon
    if (menu.classList.contains("active")) {
        // Add any additional effects when menu is shown, like changing the icon
        document.getElementById("menu-icon").classList.add("open");
    } else {
        // Revert effects when the menu is hidden
        document.getElementById("menu-icon").classList.remove("open");
    }
});
