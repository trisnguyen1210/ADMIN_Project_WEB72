import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
})

const login = (username, password) => {
    return axiosInstance.post(`/login`, { username, password })
}
const signUp = (username, password) => {
    return axiosInstance.post(`/users/newuser`, { username, password })
}

const getUser = (username, password) => {
    return axiosInstance.post(`/user/login`, { username, password })
}
export { login, signUp, getUser }