// service-worker.js

// Define o nome do cache e os arquivos essenciais para o funcionamento offline.
const CACHE_NAME = 'missioncare-plus-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  // Adicione aqui os caminhos para outras páginas HTML que devem funcionar offline
  // Ex: '/3- triagem adulto.html',
  // Ex: '/triagem-pediatrica.html',
  // Ex: '/4-emergencias.html',
  // Adicione aqui os caminhos para seus arquivos CSS e JS
  // Ex: '/style.css',
  // Ex: '/app.js',
  // Adicione aqui os ícones e outras imagens importantes
  'https://placehold.co/192x192/0d9488/FFFFFF?text=MC+',
  'https://placehold.co/512x512/0d9488/FFFFFF?text=MC+'
];

// Evento de Instalação: Salva os arquivos essenciais no cache.
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache aberto. Adicionando arquivos essenciais.');
        return cache.addAll(URLS_TO_CACHE);
      })
      .then(() => {
        console.log('Service Worker: Arquivos cacheados com sucesso. Pronto para funcionar offline!');
        return self.skipWaiting();
      })
  );
});

// Evento de Ativação: Limpa caches antigos se houver uma nova versão.
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Ativando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Limpando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Evento de Fetch: Intercepta as requisições de rede.
// Tenta primeiro buscar do cache (estratégia Cache-First).
// Se não encontrar no cache, busca na rede.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se o recurso for encontrado no cache, retorna ele.
        if (response) {
          return response;
        }
        // Se não, busca na rede.
        return fetch(event.request);
      })
  );
});
