import apiService from "./apiService"

const getAdmin = async () => {
    const response = await apiService.get('/admin')
    return response.data
}

const getAllUsers = async () => {
    const response = await apiService.get('/admin/users')
    return response.data
}

const promoteUser = async (userId) => {
    const response = await apiService.post(`/admin/users/${userId}/promote`)
    return response.data
}

const toggleUserStatus = async (userId) => {
    const response = await apiService.post(`/admin/users/${userId}/toggle-status`)
    return response.data
}

export default {
    getAdmin,
    getAllUsers,
    promoteUser,
    toggleUserStatus
}