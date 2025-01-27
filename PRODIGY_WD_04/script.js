// Waits for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitButton = document.querySelector('button[type="submit"]');
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-message");
    successMessage.textContent = "Your message has been sent! Thank you for reaching out.";

    // Show a success message with a fade-in effect
    function showSuccessMessage() {
        document.body.appendChild(successMessage);
        successMessage.style.opacity = 1;
        successMessage.style.transform = "translateY(0)"; // Slide in
    }

    // Hide the success message with a fade-out effect
    function hideSuccessMessage() {
        successMessage.style.opacity = 0;
        successMessage.style.transform = "translateY(-20px)"; // Slide out
        setTimeout(() => {
            successMessage.remove();
        }, 300); // Wait for the animation to finish before removing the element
    }

    // Form validation and submit functionality
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Basic validation
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (!name || !email || !message) {
            alert("Please fill out all fields.");
            return;
        }

        // Disable the submit button to prevent multiple submissions
        submitButton.disabled = true;

        // Simulate a form submission (you can replace this with actual logic)
        setTimeout(() => {
            showSuccessMessage();

            // Reset form and re-enable submit button after a delay
            form.reset();
            submitButton.disabled = false;

            // Hide success message after a few seconds
            setTimeout(() => {
                hideSuccessMessage();
            }, 3000);
        }, 1000);
    });
});
