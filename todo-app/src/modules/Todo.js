export default class ToDo{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.items = []
    }

    addItem(item){
        this.items.push(item);
    }
}   