const inputFields = document.querySelectorAll('.input-field');
const inputs = document.querySelectorAll('input');
const icons = document.querySelectorAll('i');

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('focus', () => {
        inputFields[i].classList.toggle('focused');
        icons[i].classList.toggle('icon-focused');
    });

    inputs[i].addEventListener('blur', () => {
        inputFields[i].classList.remove('focused');
        icons[i].classList.remove('icon-focused');
    });
}

