

function saveEvent(event) {
  const db = request.result;
  const transaction = db.transaction('events', 'readwrite');
  const store = transaction.objectStore('events');
  store.add(event);
  console.log('Evento guardado');
}

function getEvents() {
  const db = request.result;
  const transaction = db.transaction('events', 'readonly');
  const store = transaction.objectStore('events');
  const request = store.getAll();
  request.onsuccess = function() {
    console.log(request.result);
    return request.result;
  }
}

export { saveEvent, getEvents };