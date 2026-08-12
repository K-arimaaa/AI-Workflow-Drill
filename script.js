// ============================================================
// Profile Settings Form — validation & interaction logic
// ============================================================

const form = document.getElementById('profileForm');
const formStatus = document.getElementById('formStatus');

// Grab each field once so we're not re-querying the DOM repeatedly.
const fields = {
  fullName: document.getElementById('fullName'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  password: document.getElementById('password'),
};

// Map each field to its matching error <p> element.
const errorEls = {
  fullName: document.getElementById('fullNameError'),
  email: document.getElementById('emailError'),
  phone: document.getElementById('phoneError'),
  password: document.getElementById('passwordError'),
};

// A reasonably strict-but-practical email pattern. We're not trying to
// cover every edge case in the RFC, just catch obviously malformed input
// like "bob@" or "bob.com" — the server should still do final validation.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------------------------------------------------
   Live filtering: force the phone field to accept digits only.
   We strip non-digit characters as the user types rather than
   waiting for submit, so it's impossible to type letters in at all.
   (We still keep the field type="tel" so mobile shows a numeric
   keypad, since type="number" would add unwanted spinner arrows
   and mangle leading zeros.)
------------------------------------------------------------- */
fields.phone.addEventListener('input', () => {
  fields.phone.value = fields.phone.value.replace(/\D/g, '');
});

/* ------------------------------------------------------------
   Show/hide password toggle. Keyboard-accessible because it's a
   real <button>, and we update aria-pressed + aria-label so
   screen reader users know the current state, not just sighted users.
------------------------------------------------------------- */
const togglePasswordBtn = document.getElementById('togglePassword');
togglePasswordBtn.addEventListener('click', () => {
  const isPassword = fields.password.type === 'password';
  fields.password.type = isPassword ? 'text' : 'password';

  togglePasswordBtn.textContent = isPassword ? 'Hide' : 'Show';
  togglePasswordBtn.setAttribute('aria-pressed', String(isPassword));
  togglePasswordBtn.setAttribute(
    'aria-label',
    isPassword ? 'Hide password' : 'Show password'
  );
});

/* ------------------------------------------------------------
   Individual field validators.
   Each returns an error string, or '' if the field is valid.
------------------------------------------------------------- */
function validateFullName(value) {
  if (!value.trim()) return 'Full name is required.';
  return '';
}

function validateEmail(value) {
  if (!value.trim()) return 'Email is required.';
  if (!EMAIL_REGEX.test(value.trim())) return 'Enter a valid email address.';
  return '';
}

function validatePhone(value) {
  if (!value.trim()) return 'Phone number is required.';
  // Belt-and-braces check: even though the input handler strips
  // non-digits live, this guards against pasted input or programmatic
  // changes that bypass the 'input' event.
  if (!/^\d+$/.test(value)) return 'Phone number must contain digits only.';
  if (value.length < 7) return 'Enter a valid phone number.';
  return '';
}

function validatePassword(value) {
  if (!value) return 'Password is required.';
  if (value.length < 8) return 'Password must be at least 8 characters.';
  return '';
}

const validators = {
  fullName: validateFullName,
  email: validateEmail,
  phone: validatePhone,
  password: validatePassword,
};

/* ------------------------------------------------------------
   Applies (or clears) the error state for one field:
   - toggles aria-invalid so assistive tech announces it
   - fills/empties the associated error <p>, which is a role="alert"
     region, so screen readers announce new errors as they appear
------------------------------------------------------------- */
function setFieldError(name, message) {
  const input = fields[name];
  const errorEl = errorEls[name];

  if (message) {
    input.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
  } else {
    input.removeAttribute('aria-invalid');
    errorEl.textContent = '';
  }
}

function validateField(name) {
  const message = validators[name](fields[name].value);
  setFieldError(name, message);
  return message === '';
}

// Validate on blur so people get feedback as they move through the
// form, not just in one big batch at the end.
Object.keys(fields).forEach((name) => {
  fields[name].addEventListener('blur', () => validateField(name));
});

/* ------------------------------------------------------------
   Form submission
------------------------------------------------------------- */
form.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = '';

  // Validate every field, but don't short-circuit on the first
  // failure — we want to show ALL errors at once, not one at a time.
  const results = Object.keys(fields).map((name) => validateField(name));
  const isValid = results.every(Boolean);

  if (!isValid) {
    // Move focus to the first invalid field. This helps both keyboard
    // and screen reader users go straight to the problem instead of
    // hunting for it, which is far more useful than a generic
    // "form has errors" banner.
    const firstInvalidName = Object.keys(fields).find(
      (name) => fields[name].getAttribute('aria-invalid') === 'true'
    );
    if (firstInvalidName) fields[firstInvalidName].focus();

    formStatus.textContent = 'Please fix the highlighted fields.';
    return;
  }

  // All good — this is where you'd send data to a server, e.g.:
  // fetch('/api/profile', { method: 'POST', body: JSON.stringify({...}) })
  const data = {
    fullName: fields.fullName.value.trim(),
    email: fields.email.value.trim(),
    phone: fields.phone.value.trim(),
    password: fields.password.value,
  };
  console.log('Profile saved:', data);

  formStatus.textContent = 'Profile saved successfully.';
  form.reset();

  // Reset any leftover invalid styling after a successful save.
  Object.keys(fields).forEach((name) => setFieldError(name, ''));
});
