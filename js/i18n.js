const dictionaries = {};

async function loadDictionary(lang) {
  if (!dictionaries[lang]) {
    try {
      const response = await fetch(`/lang/${lang}.json`);
      dictionaries[lang] = await response.json();
    } catch (e) {
      console.error('Erro ao carregar traducoes', lang, e);
      dictionaries[lang] = {};
    }
  }
  return dictionaries[lang];
}

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const parts = key.split('.');
    let text = dictionaries[lang];
    for (const p of parts) {
      if (text && p in text) {
        text = text[p];
      } else {
        text = null;
        break;
      }
    }
    if (text) {
      el.innerHTML = text;
    }
  });
}

async function setLanguage(lang) {
  localStorage.setItem('missionCareLang', lang);
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
  await loadDictionary(lang);
  applyTranslations(lang);
  updateButtons(lang);
}

function updateButtons(lang) {
  const ptBtn = document.getElementById('lang-pt');
  const esBtn = document.getElementById('lang-es');
  if (!ptBtn || !esBtn) return;
  if (lang === 'es') {
    esBtn.classList.add('active');
    esBtn.classList.remove('inactive');
    ptBtn.classList.add('inactive');
    ptBtn.classList.remove('active');
  } else {
    ptBtn.classList.add('active');
    ptBtn.classList.remove('inactive');
    esBtn.classList.add('inactive');
    esBtn.classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('missionCareLang') || 'pt';
  setLanguage(saved);
  const ptBtn = document.getElementById('lang-pt');
  const esBtn = document.getElementById('lang-es');
  if (ptBtn) ptBtn.addEventListener('click', () => setLanguage('pt'));
  if (esBtn) esBtn.addEventListener('click', () => setLanguage('es'));
});

// Expose to global scope
window.setLanguage = setLanguage;
