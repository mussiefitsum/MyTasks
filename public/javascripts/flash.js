const notification = document.querySelector('.error-notification');

function clearNotification() {
    notification.classList.toggle('fade-out');
}

if (notification !== null) {
    setTimeout(clearNotification, 5000);
}