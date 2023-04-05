import api from "./api"

export const getUsers = async (payload) => {
  const response = await api.get("users", {
    params: payload
  })
  return response.data
}
