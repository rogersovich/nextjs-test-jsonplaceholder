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


export const getPost = async (ID) => {
  const response = await api.get(`posts/${ID}`)
  return response.data
}

export const getPostByUsers = async (ID) => {
  const response = await api.get(`posts/${ID}/comments`)
  return response.data
}

