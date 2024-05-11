import { Person, Event } from './classes.js';
import {addEvent} from './addEvent.js';

// definimos events en indeedDB API
let events = [];


function updateEventList() {
  const eventList = document.getElementById('eventList');
  eventList.innerHTML = '';
  events.forEach((event, index) => {
      const eventElement = document.createElement('li');
      const eventLink = document.createElement('a');
      eventLink.textContent = `${event.name} - ${event.people.length} personas`;
      eventLink.href = `event.html?eventId=${index}`; // Enlace a la vista específica del evento
      eventElement.appendChild(eventLink);
      eventList.appendChild(eventElement);
  });
}


// Agregar evento al hacer clic en el botón
document.getElementById('addEventBtn').addEventListener('click', addEvent);
