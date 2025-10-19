// Sélection des éléments
const form = document.querySelector('#formulaire');
const nameInput = document.getElementById('name');
const firstnameInput = document.getElementById('firstname');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

// Expressions régulières
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
const firstnameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
const phoneRegex = /^\+33\s?[1-9](?:\s?\d{2}){4}$/;

// Soumission du formulaire
form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearFieldErrors();

  let hasError = false;

  // Nom
  const nameValue = nameInput.value.trim();
  if (nameValue === '') {
        showFieldError(nameInput, 'Veuillez saisir le nom.');
        hasError = true;
    } else if (nameValue.length < 3) {
        showFieldError(nameInput, 'Le nom doit contenir au moins 3 caractères.');
        hasError = true;
    } else if (!nameRegex.test(nameValue)) {
        showFieldError(nameInput, 'Le nom ne doit contenir que des lettres.');
        hasError = true;
    } else {
        highlightValidField(nameInput);
    }

  // Prénom
  const firstnameValue = firstnameInput.value.trim();
  if (firstnameValue === '') {
        showFieldError(firstnameInput, 'Veuillez saisir le prénom.');
        hasError = true;
    } else if (firstnameValue.length < 3) {
        showFieldError(firstnameInput, 'Le prénom doit contenir au moins 3 caractères.');
        hasError = true;
    } else if (!firstnameRegex.test(firstnameValue)) {
        showFieldError(firstnameInput, 'Le prénom ne doit contenir que des lettres.');
        hasError = true;
    } else {
        highlightValidField(firstnameInput);
    }

  // Âge
  const age = parseInt(ageInput.value.trim());
  if (isNaN(age)) {
        showFieldError(ageInput, "L'âge doit être un nombre.");
        hasError = true;
    } else if (age < 1 || age > 120) {
        showFieldError(ageInput, "L'âge doit être compris entre 1 et 120.");
        hasError = true;
    } else {
        highlightValidField(ageInput);
    }

  // Email
  const emailValue = emailInput.value.trim();
  if (emailValue === '') {
        showFieldError(emailInput, 'Veuillez saisir votre email.');
        hasError = true;
    } else if (!isValidEmail(emailValue)) {
        showFieldError(emailInput, 'Veuillez saisir une adresse email valide.');
        hasError = true;
    } else {
        highlightValidField(emailInput);
    }

  // Téléphone
  const phoneValue = phoneInput.value.trim();
  if (phoneValue === '') {
        showFieldError(phoneInput, 'Veuillez saisir un numéro de téléphone.');
        hasError = true;
    } else if (!phoneRegex.test(phoneValue)) {
        showFieldError(phoneInput, 'Veuillez saisir un numéro de téléphone français valide.');
        hasError = true;
    } else {
        highlightValidField(phoneInput);
    }  
//remettre ton formulaire dans son état initial
function resetFormCompletely() {
    form.reset(); // Vide tous les champs
    clearFieldErrors(); // Supprime les erreurs et les styles
}
  // Message de succès
  if (!hasError) {
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.textContent = 'Formulaire envoyé avec succès !';
        form.insertAdjacentElement('beforebegin', successMessage);
        resetFormCompletely();
        nameInput.focus();

        setTimeout(() => {
        successMessage.remove();
        }, 5000);
  }
});

// Fonctions utilitaires
function isValidEmail(email) {
    const basicRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return basicRegex.test(email);
}

function showFieldError(inputElement, message) {
    const error = document.createElement('small');
    error.className = 'text-danger d-block mt-1 field-error';
    error.textContent = message;
    inputElement.classList.add('is-invalid');
    inputElement.insertAdjacentElement('afterend', error);
}

function clearFieldErrors() {
    const oldErrors = form.querySelectorAll('.field-error');
    oldErrors.forEach(error => error.remove());

    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
    });
}

function highlightValidField(inputElement) {
    inputElement.classList.remove('is-invalid');
    inputElement.classList.add('is-valid');
}
