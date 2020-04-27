export default class ToDo {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(id) {
    this.items.splice(id, 1);
  }

  static fromJson(json) {
    const todo = new ToDo(json.id, json.name);
    for (let i = 0; i < json.items.length; i += 1) {
      const item = json.items[i];
      todo.addItem(item.name);
    }
    return todo;
  }
}
