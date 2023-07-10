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

const updateTodos = async (id, updatedTodo) => {
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`, updatedTodo)
}

export { getTodos, addTodos, deleteTodos, updateTodos }