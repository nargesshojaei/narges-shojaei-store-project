  // Password field active border (like Figma page 2)
    document.getElementById('password').addEventListener('focus', () => {
      document.getElementById('pass-row').classList.add('active-field');
    });
    document.getElementById('password').addEventListener('blur', () => {
      document.getElementById('pass-row').classList.remove('active-field');
    });
    const STORAGE_KEY = 'shoea_saved_credentials';

// ── Toggle password ────────────────────────────────────────────
function togglePassword() {
  const input = document.getElementById('password');
  const btn   = document.getElementById('eye-btn');
  const show  = input.type === 'password';
  input.type  = show ? 'text' : 'password';
  btn.innerHTML = show
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/></svg>`;
}

// ── LocalStorage helpers ───────────────────────────────────────
function saveCredentials(email, password, remember) {
  if (remember) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, password }));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function loadCredentials() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

// ── Sign In ────────────────────────────────────────────────────
function handleSignIn() {
  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const remember = document.getElementById('remember').checked;

  if (!email || !password) {
    const el = document.getElementById('error-msg');
    el.textContent = 'Please fill in all fields.';
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 3000);
    return;
  }

  saveCredentials(email, password, remember);
  window.location.href = 'index.html';
}

// ── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const saved = loadCredentials();
  if (saved) {
    document.getElementById('email').value    = saved.email;
    document.getElementById('password').value = saved.password;
    document.getElementById('remember').checked = true;
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSignIn();
  });
});
