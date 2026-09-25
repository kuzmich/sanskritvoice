self.addEventListener('install', (event) => {
  console.log('Service Worker установлен');
});

self.addEventListener('fetch', (event) => {
  // Минимально необходимый обработчик для PWA.
  // Здесь в будущем можно настроить кэширование.
  return;
});
