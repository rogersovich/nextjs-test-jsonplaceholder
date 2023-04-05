import api from "./api"

export const getPosts = async (payload) => {
  const response = await api.get("posts", {
    params: payload
  })
  return response.data
}

export const createPosts = async (payload) => {
  const response = await api.post("posts", payload)
  return response.data
}
