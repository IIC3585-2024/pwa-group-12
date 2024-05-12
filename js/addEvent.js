import { Person, Event } from "./classes.js";
import { saveEvent, getEvents, getEvent } from "./IndeedDB.js";

function addEvent(events) {
  const eventName = document.getElementById("eventName").value;
  const people = [];

  const partcipantParentElement = document.getElementById(
    "participantsElements"
  );

  for (let i = 0; i < partcipantParentElement.children.length - 1; i++) {
    const personName = partcipantParentElement.children[i].children[0].value;
    console.log("Persona: ", personName);
    const person = new Person(personName);
    people.push(person);
  }

  // Crear evento con personas y agregarlo a la lista de eventos
  const event = new Event(eventName, people);
  console.log("Evento agregado");
  console.log("participantes: ", event.people);
  console.log("Eventos: ", events);
  saveEvent(event);
  updateEventList();
}

async function updateEventList() {
  const eventList = document.getElementById("eventList");
  let events = await getEvents();
  console.log("Eventos: ", events);
  eventList.innerHTML = "";
  events.forEach((event, index) => {
    const eventElement = document.createElement("li");
    const eventLink = document.createElement("a");
    eventLink.textContent = `${event.name} - ${event.people.length} personas`;
    eventLink.href = `event.html?eventId=${index + 1}`; // Enlace a la vista específica del evento
    eventElement.appendChild(eventLink);
    eventList.appendChild(eventElement);
  });
}

export { addEvent, updateEventList };
