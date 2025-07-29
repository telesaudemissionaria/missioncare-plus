import {initI18n, setLanguage} from './i18n.js';

window.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('lang-pt').addEventListener('click', () => setLanguage('pt'));
  document.getElementById('lang-es').addEventListener('click', () => setLanguage('es'));
  await initI18n();

  const modal = document.getElementById('disclaimer-modal');
  const acceptButton = document.getElementById('accept-disclaimer');
  const accepted = localStorage.getItem('disclaimerAccepted');
  if (!accepted) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
  acceptButton.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    localStorage.setItem('disclaimerAccepted', 'true');
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
});
