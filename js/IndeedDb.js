const indeedDB = 
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

const request = indeedDB.open('Eventos', 1);

function startDB() {
  // Definimos multiples versiones de indexedDB, ya que no todos los navegadores soportan la misma versión


  request.onerror = function(event) {
    console.log('Error: No se pudo abrir la base de datos');
    console.log(event);
  }

  request.onupgradeneeded = function() {
    const db = request.result;
    console.log('Actualizando base de datos');
    const store = db.createObjectStore("events", { keyPath: 'id', autoIncrement: true });
    const name = store.createIndex('name', 'name', { unique: false });
  }

  request.onsuccess = function() {
    console.log('Base de datos abierta');
  }
}

function saveEvent(event) {
  let db = request.result;
  let transaction = db.transaction(["events"], 'readwrite');
  let store = transaction.objectStore('events');
  store.add(event);
  console.log('Evento guardado');
}

async function getEvents() {
  let db = request.result;
  let transaction = db.transaction('events', 'readonly');
  let store = transaction.objectStore('events');

  try {
    // Esperar a que se complete la operación getAll
    let getRequest = await new Promise((resolve, reject) => {
      let request = store.getAll();
      request.onsuccess = () => resolve(request);
      request.onerror = () => reject(request.error);
    });

    // Una vez que la operación getAll se completa, puedes acceder al resultado
    console.log(getRequest.result);
    return getRequest.result;
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    throw error; // Propagar el error para que se maneje fuera de esta función si es necesario
  }
}

export { saveEvent, getEvents, startDB };