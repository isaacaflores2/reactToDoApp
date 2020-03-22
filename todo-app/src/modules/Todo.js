export default class Todo{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.items = []
    }

    addItem(item){
        this.items.push(item);
    }
}   