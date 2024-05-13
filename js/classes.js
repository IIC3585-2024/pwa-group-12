class Person {
  constructor(name) {
    this.name = name;
  }
}

class Event {
  constructor(name, people, currency) {
    this.name = name;
    this.people = people;
    this.expenses = [];
    this.currency = currency;
  }
}

export { Person, Event };
