import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { BackgroundSyncPlugin } from 'workbox-background-sync';

// 缓存的文件列表
precacheAndRoute(self.__WB_MANIFEST || []);

// 缓存Google字体
registerRoute(/^https:\/\/fonts\.googleapis\.com\//, new StaleWhileRevalidate({
  cacheName: 'google-fonts-stylesheets'
}));

// 缓存API响应并设置最大缓存时间
registerRoute(/\/api\/.*\//, new NetworkOnly({
  cacheName: 'api-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [200]
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 60 * 60 * 24, // 1 day
      purgeOnQuotaError: true // Automatically cleanup if quota is exceeded.
    })
  ]
}));

// 后台同步处理程序示例
registerRoute(
  /\/api\/.*\/post/,
  new NetworkOnly({
    plugins: [
      new BackgroundSyncPlugin('postSyncQueue', {
        maxRetentionTime: 24 * 60 // Retry for max of 24 Hours.
      })
    ]
  }),
  'POST'
);
