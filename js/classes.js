class Person {
    constructor(name) {
        this.name = name;
    }
  }
  
  // Definir un objeto Evento
  class Event {
    constructor(name, people, currency) {
        this.name = name;
        this.people = people;
        this.expenses = [];
        this.currency = currency;
    }
  }

export { Person, Event };