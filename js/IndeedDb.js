const indeedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

const request = await indeedDB.open("events", 1);

function startDB() {
  request.onerror = function (event) {
    console.log("Error: No se pudo abrir la base de datos");
    console.log(event);
  };

  request.onupgradeneeded = function () {
    console.log("Actualizando la base de datos");
    createEventStore();
    createSubscriptionStore();
  }

  request.onsuccess = function () {
    console.log("Base de datos abierta");
  };
}

function createEventStore() {
  let db = request.result;
  let eventStore = db.createObjectStore("events", {
    keyPath: "id",
    autoIncrement: true,
  });
  eventStore.createIndex("name", "name", { unique: false });
}

function createSubscriptionStore() {
  let db = request.result;
  let subscriptionStore = db.createObjectStore("subscriptions", {
    keyPath: "id",
    autoIncrement: true,
  });
  subscriptionStore.createIndex("endpoint", "endpoint", { unique: true });
}

function saveEvent(event) {
  let db = request.result;
  let transaction = db.transaction(["events"], "readwrite");
  let store = transaction.objectStore("events");
  store.add(event);
  console.log("Evento guardado");
}

function updateEvent(event) {
  let db = request.result;
  let transaction = db.transaction(["events"], "readwrite");
  let store = transaction.objectStore("events");
  store.put(event);
  console.log("Evento actualizado");
}

async function getEvent(eventId) {
  return new Promise((resolve, reject) => {
    let requestHere = indexedDB.open("events", 1);

    requestHere.onsuccess = function (event) {
      let db = event.target.result;

      var transaction = db.transaction(["events"], "readonly");
      var store = transaction.objectStore("events");

      var getRequest = store.get(parseInt(eventId));

      getRequest.onsuccess = function (event) {
        var event = getRequest.result;
        console.log("Evento obtenido: ", event);
        resolve(event);
      };
      getRequest.onerror = function (event) {
        console.log("Error al obtener el evento: ", getRequest.error);
        reject(getRequest.error);
      };

      transaction.oncomplete = function (event) {
        db.close();
      };
    };

    requestHere.onerror = function (event) {
      console.log("Error al abrir la base de datos: ", requestHere.error);
      reject(requestHere.error);
    };
  });
}

async function getEvents() {
  return new Promise((resolve, reject) => {
    let requestHere = indexedDB.open("events", 1);

    requestHere.onsuccess = function (event) {
      let db = event.target.result;

      var transaction = db.transaction(["events"], "readonly");
      var store = transaction.objectStore("events");

      var getRequest = store.getAll();

      getRequest.onsuccess = function (event) {
        var event = getRequest.result;
        console.log("Evento obtenido: ", event);
        resolve(event);
      };
      getRequest.onerror = function (event) {
        console.log("Error al obtener el evento: ", getRequest.error);
        reject(getRequest.error);
      };

      transaction.oncomplete = function (event) {
        db.close();
      };
    };

    requestHere.onerror = function (event) {
      console.log("Error al abrir la base de datos: ", requestHere.error);
      reject(requestHere.error);
    };
  });
}

async function subscribeUserToPush() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array('BNKX6kknLcx9YW73jPNM0nJMEvSjBaCbe0QzSjxvTB2GpYb5H5KkS-dGHmv5UF94cR-4JkDXJpVaU9EGliyNWuM')
  });

  saveSubscription(subscription);
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function saveSubscription(subscription) {
  let db = request.result;
  let transaction = db.transaction(["subscriptions"], "readwrite");
  let store = transaction.objectStore("subscriptions");
  store.add(subscription);
  console.log("Subscription saved");
}

async function getSubscriptions() {
  return new Promise((resolve, reject) => {
    let requestHere = indexedDB.open("events", 1);

    requestHere.onsuccess = function (event) {
      let db = event.target.result;

      var transaction = db.transaction(["subscriptions"], "readonly");
      var store = transaction.objectStore("subscriptions");

      var getRequest = store.getAll();

      getRequest.onsuccess = function (event) {
        var subscriptions = getRequest.result; 
        console.log("Subscriptions obtained: ", subscriptions);
        resolve(subscriptions); 
      };
      getRequest.onerror = function (event) {
        console.log("Error obtaining the subscriptions: ", getRequest.error);
        reject(getRequest.error);
      };

      transaction.oncomplete = function (event) {
        db.close();
      };
    };

    requestHere.onerror = function (event) {
      console.log("Error opening the database: ", requestHere.error);
      reject(requestHere.error);
    };
  });
}

export { 
  saveEvent,
  getEvents,
  getEvent,
  updateEvent,
  subscribeUserToPush,
  saveSubscription,
  getSubscriptions,
  startDB
};
 
