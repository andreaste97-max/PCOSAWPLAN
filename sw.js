var CACHE_NAME='pcos-daily-v3.2';
var urlsToCache=['/','./index.html'];
self.addEventListener('install',function(event){
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache){return cache.addAll(urlsToCache);}));
});
self.addEventListener('fetch',function(event){
  event.respondWith(fetch(event.request).then(function(res){
    return caches.open(CACHE_NAME).then(function(cache){cache.put(event.request,res.clone());return res;});
  }).catch(function(){return caches.match(event.request);}));
});
self.addEventListener('activate',function(event){
  event.waitUntil(caches.keys().then(function(names){
    return Promise.all(names.filter(function(n){return n!==CACHE_NAME;}).map(function(n){return caches.delete(n);}));
  }).then(function(){return self.clients.claim();}));
});