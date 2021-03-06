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
    if (index < 0) {
      throw `Item with id ${id} does not exist. Cannot remove. `;
    }

    this.items.splice(index, 1);
  }

  updateItem(id, updatedName) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index < 0) {
      throw `Item with id ${id} does not exist. Cannot update. `;
    }

    this.items[index].name = updatedName;
  }

  static fromJson(json) {
    const todo = new ToDo(json.id, json.name);
    for (let i = 0; i < json.items.length; i += 1) {
      const item = Item.fromJson(json.items[i]);
      todo.items.push(item);
    }
    return todo;
  }

  static createToDoArrayFromJson(json) {
    const todos = [];
    for (let i = 0; i < json.length; i += 1) {
      todos.push(ToDo.fromJson(json[i]));
    }
    return todos;
  }
}
