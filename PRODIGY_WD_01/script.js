// Menu Toggle Functionality for Mobile/Tablet Devices
document.getElementById("menu-icon").addEventListener("click", function () {
    const menu = document.getElementById("navbar").querySelector("ul");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
});
