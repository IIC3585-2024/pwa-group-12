const indeedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

const request = await indeedDB.open("events", 1);

function startDB() {
  // Definimos multiples versiones de indexedDB, ya que no todos los navegadores soportan la misma versión

  request.onerror = function (event) {
    console.log("Error: No se pudo abrir la base de datos");
    console.log(event);
  };

  request.onupgradeneeded = function () {
    console.log("Actualizando la base de datos");
    createEventStore();
  };

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

function saveEvent(event) {
  let db = request.result;
  let transaction = db.transaction(["events"], "readwrite");
  let store = transaction.objectStore("events");
  store.add(event);
  console.log("Evento guardado");
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
        var event = getRequest.result; // Assign the result to the variable
        console.log("Evento obtenido: ", event);
        resolve(event); // Resolve the promise with the retrieved event data
      };
      getRequest.onerror = function (event) {
        console.log("Error al obtener el evento: ", getRequest.error);
        reject(getRequest.error); // Reject the promise with the error
      };

      transaction.oncomplete = function (event) {
        db.close();
      };
    };

    requestHere.onerror = function (event) {
      console.log("Error al abrir la base de datos: ", requestHere.error);
      reject(requestHere.error); // Reject the promise if there's an error opening the database
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
        var event = getRequest.result; // Assign the result to the variable
        console.log("Evento obtenido: ", event);
        resolve(event); // Resolve the promise with the retrieved event data
      };
      getRequest.onerror = function (event) {
        console.log("Error al obtener el evento: ", getRequest.error);
        reject(getRequest.error); // Reject the promise with the error
      };

      transaction.oncomplete = function (event) {
        db.close();
      };
    };

    requestHere.onerror = function (event) {
      console.log("Error al abrir la base de datos: ", requestHere.error);
      reject(requestHere.error); // Reject the promise if there's an error opening the database
    };
  });
}

export { saveEvent, getEvents, getEvent, startDB };
