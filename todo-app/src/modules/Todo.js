export default class ToDo{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.items = []
    }

    addItem(item){
        this.items.push(item);
    }

    removeItem(id){
        this.items.splice(id,1);
    }
}   