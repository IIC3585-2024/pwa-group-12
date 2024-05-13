import { addEvent, updateEventList, addExpense } from "./addEvent.js";
import { startDB } from "./IndeedDB.js";
import { registerSW } from "./workers.js";

await registerSW();

startDB();
await updateEventList();

document.getElementById("addEventBtn").addEventListener("click", addEvent);
