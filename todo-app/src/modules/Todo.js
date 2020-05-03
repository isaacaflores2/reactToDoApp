import Item from './Item';

export default class ToDo {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.items = [];
  }

  addItem(name) {
    const id = this.items.length;
    const item = new Item(id, name);
    this.items.push(item);
  }

  removeItem(id) {
    const index = this.items.findIndex((item) => item.id === id);
    this.items.splice(index, 1);
  }

  static fromJson(json) {
    const todo = new ToDo(json.id, json.name);
    for (let i = 0; i < json.items.length; i += 1) {
      const item = Item.fromJson(json.items[i]);
      todo.items.push(item);
    }
    return todo;
  }
}
