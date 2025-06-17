(function () {
  const form = document.getElementById('signup-form');
  const submitBtn = document.getElementById('signup-submit');
  const nameInput = form.elements['name'];
  const emailInput = form.elements['email'];
  const passwordInput = form.elements['password'];
  const passwordConfirmInput = form.elements['repassword']; // match your form field name
  const termsCheckbox = form.elements['terms'];

  const errorName = document.getElementById('name-error');
  const errorEmail = document.getElementById('email-error');
  const errorPassword = document.getElementById('password-error');
  const errorPasswordConfirm = document.getElementById('password-confirm-error');
  const errorTerms = document.getElementById('terms-error');

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateName() {
    const value = nameInput.value.trim();
    if (!value) {
      errorName.textContent = "Enter your name";
      errorName.classList.add("error-visible");
      return false;
    }
    errorName.textContent = "";
    errorName.classList.remove("error-visible");
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) {
      errorEmail.textContent = "Enter your email";
      errorEmail.classList.add("error-visible");
      return false;
    }
    if (!isValidEmail(value)) {
      errorEmail.textContent = "Please enter a valid email address";
      errorEmail.classList.add("error-visible");
      return false;
    }
    errorEmail.textContent = "";
    errorEmail.classList.remove("error-visible");
    return true;
  }

  function validatePassword() {
    const value = passwordInput.value;
    if (!value) {
      errorPassword.textContent = "Enter your password";
      errorPassword.classList.add("error-visible");
      return false;
    }
    if (value.length < 6) {
      errorPassword.textContent = "Password must be at least 6 characters";
      errorPassword.classList.add("error-visible");
      return false;
    }
    errorPassword.textContent = "";
    errorPassword.classList.remove("error-visible");
    return true;
  }

  function validatePasswordConfirm() {
    const value = passwordConfirmInput.value;
    if (!value) {
      errorPasswordConfirm.textContent = "Re-enter your password";
      errorPasswordConfirm.classList.add("error-visible");
      return false;
    }
    if (value !== passwordInput.value) {
      errorPasswordConfirm.textContent = "Passwords do not match";
      errorPasswordConfirm.classList.add("error-visible");
      return false;
    }
    errorPasswordConfirm.textContent = "";
    errorPasswordConfirm.classList.remove("error-visible");
    return true;
  }

  function validateTerms() {
    if (!termsCheckbox.checked) {
      errorTerms.textContent = "You must agree to Amazon's Conditions of Use and Privacy Notice";
      errorTerms.classList.add("error-visible");
      return false;
    }
    errorTerms.textContent = "";
    errorTerms.classList.remove("error-visible");
    return true;
  }

  function updateSubmitState() {
    const valid =
      validateName() &&
      validateEmail() &&
      validatePassword() &&
      validatePasswordConfirm() &&
      validateTerms();
    submitBtn.disabled = !valid;
    return valid;
  }

  // Real-time validation
  nameInput.addEventListener('input', () => { validateName(); updateSubmitState(); });
  emailInput.addEventListener('input', () => { validateEmail(); updateSubmitState(); });
  passwordInput.addEventListener('input', () => { validatePassword(); validatePasswordConfirm(); updateSubmitState(); });
  passwordConfirmInput.addEventListener('input', () => { validatePasswordConfirm(); updateSubmitState(); });
  termsCheckbox.addEventListener('change', () => { validateTerms(); updateSubmitState(); });

  window.addEventListener('load', updateSubmitState);

  // Show/hide password
  const togglePassword = document.getElementById('toggle-password');
  togglePassword.addEventListener('click', togglePasswordVisibility);
  togglePassword.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      togglePasswordVisibility();
    }
  });

  function togglePasswordVisibility() {
    const type = passwordInput.getAttribute('type');
    if (type === 'password') {
      passwordInput.setAttribute('type', 'text');
      togglePassword.textContent = 'visibility';
      togglePassword.setAttribute('aria-label', 'Hide password');
      togglePassword.setAttribute('aria-pressed', 'true');
    } else {
      passwordInput.setAttribute('type', 'password');
      togglePassword.textContent = 'visibility_off';
      togglePassword.setAttribute('aria-label', 'Show password');
      togglePassword.setAttribute('aria-pressed', 'false');
    }
  }

  // Final form submission
  form.addEventListener('submit', (e) => {
    if (!updateSubmitState()) {
      e.preventDefault(); // block if invalid
    }
  });
})();
