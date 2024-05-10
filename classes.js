class Person {
    constructor(name) {
        this.name = name;
    }
  }
  
  // Definir un objeto Evento
  class Event {
    constructor(name, people) {
        this.name = name;
        this.people = people;
        this.expenses = [];
    }
  }

export { Person, Event };