import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
})

axiosInstance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

const logIn = (username, password) => {
    return axiosInstance.post(`/login`, { username, password })
}
const signUp = (username, password) => {
    return axiosInstance.post(`/users/newuser`, { username, password })
}

const getUser = (username, password) => {
    return axiosInstance.post(`/user/login`, { username, password })
}
const createVideo = (data) => {
    return axiosInstance.post(`/video/addVideo`, data)
}

const getVideo = (pageSize = 2, pageIndex = 1) => {
    return axiosInstance.get(`/video/get-paging-video-admin?pageSize=${pageSize}&pageIndex=${pageIndex}`)
}

const getVideoId = (id) => {
    return axiosInstance.get(`/video/id/${id}`)
}
export { logIn, signUp, getUser, createVideo, getVideo, getVideoId }