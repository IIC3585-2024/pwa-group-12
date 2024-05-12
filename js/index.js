import { addEvent, updateEventList } from "./addEvent.js";
import { startDB } from "./IndeedDB.js";
import { registerSW } from "./workers.js";
// definimos events en indeedDB API

// Registrar el Service Worker
await registerSW();

startDB();
await updateEventList();

// Agregar evento al hacer clic en el botón
document.getElementById("addEventBtn").addEventListener("click", addEvent);
