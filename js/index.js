import { Person, Event } from './classes.js';
import {addEvent} from './addEvent.js';
import { startDB } from './IndeedDB.js';

// definimos events en indeedDB API
startDB();

// Agregar evento al hacer clic en el botón
document.getElementById('addEventBtn').addEventListener('click', addEvent);
