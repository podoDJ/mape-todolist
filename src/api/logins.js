import axios from "axios";

const getLogins = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/logins`)
  return response.data
}

const addLogins = async (newLogin) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/logins`, newLogin)
}

const deleteLogins = async (id) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/logins/${id}`)
}

const updateLogins = async ({ id, updatedTodo }) => {
  console.log("Logins.js에서->", (updatedTodo) ? updatedTodo : "false")
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/logins/${id}`, updatedTodo )
  // const updateLogins = async (a) => {
  //   console.log("aaaaa->", a ? a[1] : "false")
  //   const id = a[0]
  //   const updatedTodo = a[1]
  //   await axios.patch(`${process.env.REACT_APP_SERVER_URL}/Logins/${id}`, updatedTodo )
}

export { getLogins, addLogins, deleteLogins, updateLogins }