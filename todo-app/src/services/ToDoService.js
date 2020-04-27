export default class API {
  static async getTodos() {
    const response = await fetch('https://localhost:5001/api/v1/lists');
    const jsonTodos = await response.json();
    return jsonTodos;
  }
}
