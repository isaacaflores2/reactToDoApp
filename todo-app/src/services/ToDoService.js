export default class ToDoService {
  static async getTodos() {
    const response = await fetch('https://localhost:5001/api/v1/lists');
    const jsonTodos = await response.json();
    return jsonTodos;
  }

  static async updateTodo(todo) {
    const response = await fetch('https://localhost:5001/api/v1/lists', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    return response;
  }

  static async addTodo(todo) {
    const response = await fetch('https://localhost:5001/api/v1/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    return response;
  }
}
