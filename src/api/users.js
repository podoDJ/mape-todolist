import axios from "axios";

const getUsers = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`)
  return response.data
}

const addUsers = async (newUser) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, newUser)
}

const deleteUsers = async (id) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/Users/${id}`)
}

export { getUsers, addUsers, deleteUsers }