import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "https://be-project-web72.onrender.com/",
    baseURL: "http://localhost:3000/",
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

const getAllUser = () => {
    return axiosInstance.get(`/users/all`)
}

const getUser = (pageSize = 2, pageIndex = 1) => {
    return axiosInstance.get(`/users?pageSize=${pageSize}&pageIndex=${pageIndex}`)
}

const updateUser = (id, data) => {
    console.log(data)
    return axiosInstance.put(`/users/updateuser/${id}`, data)
}

const createVideo = (data) => {
    return axiosInstance.post(`/video/addVideo`, data)
}

const getVideo = (pageSize = 2, pageIndex = 1) => {
    return axiosInstance.get(`/video/get-paging-video-admin?pageSize=${pageSize}&pageIndex=${pageIndex}`)
}

const updateVideo = (id, data) => {
    return axiosInstance.put(`/video/update-video/${id}`, data)
}

const deleteVideo = (id, data) => {
    return axiosInstance.delete(`/video/delete-video/${id}`, { data })
}

const getVideoId = (id) => {
    return axiosInstance.get(`/video/id/${id}`)
}

const getLog = (pageSize = 100, pageIndex = 1) => {
    return axiosInstance.get(`/logs/logs-pagging?pageSize=${pageSize}&pageIndex=${pageIndex}`)
}
export { logIn, signUp, getAllUser, getUser, updateUser, createVideo, getVideo, getVideoId, updateVideo, deleteVideo, getLog }