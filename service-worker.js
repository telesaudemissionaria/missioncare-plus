// service-worker.js

// Define o nome do cache e os arquivos essenciais para o funcionamento offline.
const CACHE_NAME = 'missioncare-plus-v2';
const DYNAMIC_CACHE = 'missioncare-plus-dynamic-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/1-inicio.html',
  '/2- triagem inicial.html',
  '/3- triagem adulto.html',
  '/3b-triagem pediatria.html',
  '/4-emergencias.html',
  '/5. assistenteIA.html',
  '/6-textos biblico.html',
  '/7-emocional.html',
  '/8- medicamentos.html',
  '/9-contatos.html',
  '/manifest.json',
  '/style.css',
  '/js/i18n.js',
  '/js/init.js',
  '/lang/pt.json',
  '/lang/es.json',
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
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request)
        .then((networkResponse) => {
          return caches.open(DYNAMIC_CACHE).then((cache) => {
            if (event.request.method === 'GET' && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        })
        .catch(() => caches.match('/index.html'));
    })
  );
});
