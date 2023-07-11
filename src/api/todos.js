import axios from "axios";

const getTodos = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`)
  return response.data
}

const addTodos = async (newTodo) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, newTodo)
}

const deleteTodos = async (id) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`)
}

const updateTodos = async ({ id, updatedTodo }) => {
  console.log("todos.js에서->", (updatedTodo) ? updatedTodo : "false")
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`, updatedTodo )
  // const updateTodos = async (a) => {
  //   console.log("aaaaa->", a ? a[1] : "false")
  //   const id = a[0]
  //   const updatedTodo = a[1]
  //   await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`, updatedTodo )
}

export { getTodos, addTodos, deleteTodos, updateTodos }