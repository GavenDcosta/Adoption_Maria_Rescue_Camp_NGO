import axios from "axios"

const apiRequest = axios.create({
    baseURL: "https://adoption-maria-rescue-camp-api.vercel.app/api",
    withCredentials: true,
})

export default apiRequest