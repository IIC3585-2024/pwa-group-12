import { Person, Event } from "./classes.js";
import { saveEvent, getEvents, getEvent, updateEvent } from "./IndeedDb.js";

function addEvent(events) {
  const eventName = document.getElementById("eventName").value;
  const people = [];

  const partcipantParentElement = document.getElementById(
    "participantsElements"
  );

  const currency = document.getElementById("eventCurrency").value;

  for (let i = 0; i < partcipantParentElement.children.length - 1; i++) {
    const personName = partcipantParentElement.children[i].children[0].value;
    const person = new Person(personName);
    people.push(person);
  }

  const event = new Event(eventName, people, currency);

  saveEvent(event);
  updateEventList();
}

async function updateEventList() {
  console.log("Updating event list");
  const eventList = document.getElementById("eventList");
  let events = await getEvents();
  eventList.innerHTML = "";
  events.forEach((event, index) => {
    const eventElement = document.createElement("li");
    const eventLink = document.createElement("a");
    eventLink.textContent = `${event.name} - ${event.people.length} personas`;
    eventLink.href = `event.html?eventId=${index + 1}`;
    eventElement.appendChild(eventLink);
    eventList.appendChild(eventElement);
  });
}

function addExpense() {
  const eventId = document.getElementById("expenseEventId").value;
  const expenseName = document.getElementById("expenseName").value;
  const expenseAmount = document.getElementById("expenseAmount").value;
  const expensePayer = document.getElementById("expensePayer").value;
  const expenseParticipants = document.getElementById("expenseParticipants");
  const selectedParticipants = [
    ...expenseParticipants.querySelectorAll('input[type="checkbox"]:checked'),
  ];
  const expense = {
    payer: expensePayer,
    name: expenseName,
    amount: expenseAmount,
    participants: selectedParticipants.map((participant) => participant.value),
  };
  getEvent(eventId).then((event) => {
    event.expenses.push(expense);
    updateEvent(event);
  });
  window.location.href = `event.html?eventId=${eventId}`;
}

export { addEvent, updateEventList, addExpense };
