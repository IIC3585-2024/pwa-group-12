import { Person, Event } from './classes.js';
import {addEvent} from './addEvent.js';

// definimos events en indeedDB API
var events = [];

// Definimos multiples versiones de indexedDB, ya que no todos los navegadores soportan la misma versión
const indeedDB = 
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

const request = indeedDB.open('Events', 1);

request.onerror = function(event) {
  console.log('Error: No se pudo abrir la base de datos');
  console.log(event);
}

request.onupgradeneeded = function() {
  const db = request.result;
  const events = db.createObjectStore('events', { keyPath: 'id', autoIncrement: true });
  const name = store.createIndex('name', 'name', { unique: false });
}

request.onsuccess = function() {
  const db = request.result;
  const transaction = db.transaction('events', 'readwrite');
  const store = transaction.objectStore('events');
  const nameindex = store.index('name');
  store.put({ name: 'Evento de prueba' });
  console.log('Base de datos abierta');
}

// Agregar evento al hacer clic en el botón
document.getElementById('addEventBtn').addEventListener('click', addEvent);
