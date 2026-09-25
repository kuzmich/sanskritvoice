const CACHE_NAME = 'sanskrit-voice-v1';

// Список ресурсов для обязательного предварительного кэширования
const ASSETS_TO_CACHE = [
  '/',                     // Главная страница (сервер вернет index.html)
  '/index.html',           // Прямой путь к странице
  '/site.webmanifest',     // Ваш файл манифеста
  '/img/app/icon-192.png', // Иконка для корректного запуска PWA
  '/img/app/icon-512.png'  // Иконка для сплэш-скрина
  // Если на странице есть критические локальные файлы стилей/скриптов, добавьте их пути сюда через запятую
];

// 1. Событие установки: создаем кэш и скачиваем в него ресурсы
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Кэшируем критические ресурсы');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting()) // Активируем SW сразу, не дожидаясь закрытия вкладок
  );
});

// 2. Событие активации: удаляем старые версии кэша, если они были
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Удаляем старый кэш:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // Начинаем контролировать все открытые вкладки сразу
  );
});

// 3. Перехват запросов: Сначала идем в сеть, при ошибке — отдаем из кэша
self.addEventListener('fetch', (event) => {
  // Обрабатываем только GET-запросы (метрики и POST-запросы кэшировать нельзя)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Если ответ от сети успешный, обновляем его копию в кэше
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Сеть недоступна (офлайн) -> ищем совпадение в кэше
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Если пользователь запрашивает корень сайта '/' в офлайне
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});
