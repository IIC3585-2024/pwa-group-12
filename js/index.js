import { addEvent, updateEventList, addExpense } from "./addEvent.js";
import { startDB } from "./IndeedDb.js";
import { registerSW } from "./workers.js";

await registerSW();

startDB();
await updateEventList();
