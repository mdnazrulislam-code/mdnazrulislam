const form = document.getElementById('contact-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const response = await fetch('/send-email', { // Replace with your email receiving endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            message
        })
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        showError(errorMessage);
        return;
    }

    showSuccess();
    form.reset(); // Clear the form fields
});

function showSuccess() {
    const successMessage = document.createElement('p');
    successMessage.classList.add('success-message');
    successMessage.textContent = 'Message sent successfully!';
    form.appendChild(successMessage);
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

function showError(message) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;
    form.appendChild(errorMessage);
    setTimeout(() => {
        errorMessage.remove();
    }, 3000); // Added closing parenthesis for setTimeout
}
