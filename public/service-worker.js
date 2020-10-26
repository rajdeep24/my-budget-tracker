//Create an array to store list of files that need to be cached into a const variable 
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "db.js",
    "favicon.ico",
    "index.js",
    "manifest.webmanifest",
    "service-worker.js",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
    "styles.css"
  ];
​//Initialize two variables with the name 
const CACHE_NAME = "static-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";
​
//Install a service service worker
//// 1.Open a cache
//// 2.Cache Our files 
//// 3.Confirm whether all the required assets are cached or not 
self.addEventListener("install", function (evt) {
  evt.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Your files were pre-cached successfully!");
        cache
          .addAll(FILES_TO_CACHE)
          .then((result) => {
            // debugger;
            console.log("result of add all", result);
          })
          .catch((err) => {
            // debugger;
            console.log("Add all error: ", err);
          });
      })
      .catch((err) => {
        console.log(err);
      })
  );
  self.skipWaiting();
});

//Activate 
self.addEventListener("activate", function (evt) {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});
