export class IdGenerator {
  constructor(start = 1) {
    this.currentId = start;
  }

  next() {
    return this.currentId++;
  }

  reset(start = 1) {
    this.currentId = start;
  }
}
