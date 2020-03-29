import ToDo from "./ToDo";
import { cleanup } from "@testing-library/react";

afterEach(cleanup);

test("ToDo", () => {
    const todo = new ToDo(1, "Test ToDo");

    todo.addItem("test item");

    expect(todo.id).toBe(1);
    expect(todo.name).toBe("Test ToDo");    
});


test("ToDo addItem", () => {
    const todo = new ToDo(1, "Test ToDo");

    todo.addItem("test item");

    expect(todo.items.length).toBe(1);
    expect(todo.items[0]).toBe("test item");
});


test("ToDo removeItem", () => {
    const todo = new ToDo(1, "Test ToDo");

    todo.addItem("test item");
    todo.removeItem(0);

    expect(todo.items.length).toBe(0);    
});