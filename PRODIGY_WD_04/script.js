// JavaScript to add dynamic content or transitions (optional)
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Your message has been sent!");
    });
});
