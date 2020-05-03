export default class Item {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.ischecked = false;
  }

  updateIsChecked(ischecked) {
    this.ischecked = ischecked;
  }

  static fromJson(json) {
    const item = new Item(json.id, json.name);
    item.updateIsChecked(json.ischecked);
    return item;
  }
}
