export let translations = {};

async function loadTranslations(lang) {
  if (translations[lang]) return translations[lang];
  const response = await fetch(`lang/${lang}.json`);
  translations[lang] = await response.json();
  return translations[lang];
}

export async function setLanguage(lang) {
  localStorage.setItem('missionCareLang', lang);
  document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'es');
  const dict = await loadTranslations(lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = key.split('.').reduce((o,k)=>o&&o[k], dict);
    if (text) el.innerHTML = text;
  });
}

export async function initI18n() {
  const saved = localStorage.getItem('missionCareLang');
  const browser = navigator.language.split('-')[0];
  const lang = saved || (browser === 'es' ? 'es' : 'pt');
  await setLanguage(lang);
}
