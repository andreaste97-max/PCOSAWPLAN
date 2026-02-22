var CACHE_NAME='pcos-daily-v2';
var urlsToCache=['/','./index.html'];
self.addEventListener('install',function(event){
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache){return cache.addAll(urlsToCache);}));
});
self.addEventListener('fetch',function(event){
  event.respondWith(caches.match(event.request).then(function(response){
    return response||fetch(event.request).then(function(res){
      return caches.open(CACHE_NAME).then(function(cache){cache.put(event.request,res.clone());return res;});
    });
  }));
});
self.addEventListener('activate',function(event){
  event.waitUntil(caches.keys().then(function(names){
    return Promise.all(names.filter(function(n){return n!==CACHE_NAME;}).map(function(n){return caches.delete(n);}));
  }));
});