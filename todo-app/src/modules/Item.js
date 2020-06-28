export default class Item {
  constructor(id, name, isChecked) {
    this.id = id;
    this.name = name;
    this.isChecked = isChecked;
  }

  updateIsChecked(ischecked) {
    this.isChecked = ischecked;
  }

  static fromJson(json) {
    const item = new Item(json.id, json.name, json.ischecked);
    return item;
  }
}
