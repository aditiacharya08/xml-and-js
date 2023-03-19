const timeout = (ms = 1200) => new Promise((resolve) => setTimeout(resolve, ms));

function inc(a) {
  return timeout().then(() => a + 1);
}

const sum = function (a, b) {
  return timeout().then(() => a + b);
};

const max = (a, b) => timeout().then(() => (a > b ? a : b));

const avg = (a, b) => sum(a, b).then((sum) => sum / 2);

const obj = {
  name: "Marcus Aurelius",
  split(sep = " ") {
    return timeout().then(() => this.name.split(sep));
  },
};


class Person {
  constructor(name) {
    this.name = name;
  }

  static of(name) {
    return timeout().then(() => new Person(name));
  }

  split(sep = " ") {
    return timeout().then(() => this.name.split(sep));
  }
}

inc(5).then((A) => console.log("inc(5) =", A))
  .then(() => sum(3, 4))
  .then((A) => console.log("sum(3, 4) =", A))
  .then(() => max(8, 100))
  .then((A) => console.log("max(8, 100) =", A))
  .then(() => avg(9, 9))
  .then((A) => console.log("avg(9, 9) =", A))
  .then(() => obj.split())
  .then((A) => console.log("obj.split() =", A))
  .then(() => Person.of("Marcus Aurelius"))
  .then((p) => p.split())
  .then((A) => console.log("person.split() =", A));