import axios from "axios"

const getComments = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/comments`)
  return response.data
}

const addComments = async (newComments) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/comments`, newComments)
}

const updateComments = async ({ id, updateComments}) => {
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/comments/${id}`, updateComments )
}

export { getComments, addComments, updateComments}