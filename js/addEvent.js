import { Person, Event } from './classes.js';

function addEvent() {
    const eventName = document.getElementById('eventName').value;
    const numPeople = parseInt(document.getElementById('numPeople').value);
    const people = [];
  
    // Obtener nombres de personas del formulario
    for (let i = 0; i < numPeople; i++) {
        const personName = document.getElementsByName(`person${i}`).value;
        const person = new Person(personName);
        people.push(person);
    }
  
    // Crear evento con personas y agregarlo a la lista de eventos
    const event = new Event(eventName, people);
    events.push(event);
    console.log("Evento agregado");
    console.log("participantes: ", event.people);
    console.log("Eventos: ", events);
    // Limpiar formulario y actualizar lista de eventos en la página
    updateEventList();
  }

export {addEvent};