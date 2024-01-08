import axios from "axios";
import { instanceApiData } from "./constants";
const mockData = [
    {
        id: 1,
        name: 'Restaurant 1',
        lat: 21.0191446,
        lon: 105.8347163,
        rating: 1.5
    },
    {
        id: 2,
        name: 'Restaurant 2',
        lat: 21.0212571,
        lon: 105.8376679,
        rating: 2.5
    },
    {
        id: 3,
        name: 'Restaurant 3',
        lat: 21.0208187,
        lon: 105.8310809,
        rating: 3
    },
    {
        id: 4,
        name: 'Restaurant 4',
        lat: 21.0248586,
        lon: 105.8327363,
        rating: 3.5
    },
    {
        id: 5,
        name: 'Restaurant 5',
        lat: 21.01438575,
        lon: 105.83323660099717,
        rating: 5
    },
]

export const getRestaurantNearby = (lat, lng) => {
    return instanceApiData.get(`/restaurant/nearby?lat=${lat}&lng=${lng}`)
}

export const getRestaurantById = (id) => {
    return instanceApiData.get(`/restaurant/get-by-id/${id}`)
}


//restaurant 
export const createRestaurant = (data) => {
    return instanceApiData({
        method: "post",
        url: "/restaurant/create",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
    })
}

export const getConsiderRestaurant = () => {
    return instanceApiData.get('/restaurant/consider')
}

export const getAllRestaurant = () => {
    return instanceApiData.get('/restaurant/owner/get-all')
}
export const deleteRestaurant = (id) => {
    return instanceApiData.delete(`/restaurant/delete/${id}`)
}


export const updateRestaurant = (data, id) => {

    return instanceApiData({
        method: "put",
        url: `/restaurant/update/${id}`,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
    })
}



//user
export const login = (email, password) => {
    return instanceApiData.post('/login', {
        email: email,
        password: password
    })
}


export const register = (email) => {
    return instanceApiData.post('/register', {
        email: email
    })
}

export const forgetPassword = (email) => {
    return instanceApiData.post('/forget', {
        email: email
    })
}

export const changePassword = (currentPassword, newPassword) => {
    return instanceApiData.post('change-password', {
        currentPassword: currentPassword,
        newPassword: newPassword
    })
}

export const getUserProfile = () => {
    return instanceApiData.get('/profile')
}


export const upgrade = (payload) => {
    return instanceApiData.post('/upgrade', {
        brandName: payload.brandName,
        userName: payload.userName,
        numberPhone: payload.numberPhone,
        level: payload.level
    })
}

export const changeBrand = (brandName) => {
    return instanceApiData.put('/brand/update', {
        newName: brandName
    })
}

export const getCountNotification = () => {
    return instanceApiData.get('/notification/count')
}

export const getAllNotification = () => {
    return instanceApiData.get('/notification/getAll')
}


export const seenNoti = (id) => {
    return instanceApiData.post('/notification/seen', {
        id: id
    })
}


export const followRestaurant = (id) => {
    return instanceApiData.post(`/follow/${id}`)
}

export const unfollowRestaurant = (id) => {
    return instanceApiData.post(`/unfollow/${id}`)
}

export const getFollowRestaurant = () => {
    return instanceApiData.get('/follow-restaurant')
}

//admin
export const getUpgradeForm = () => {
    return instanceApiData.get(`/admin/get-upgrade-form`)
}

export const processForm = (payload) => {
    return instanceApiData.post('/admin/form-process', {
        action: payload.action,
        formId: payload.formId
    })
}

export const getConsiderRestaurantAdmin = () => {
    return instanceApiData.get('/admin/all-restaurant-wait')
}

export const processRestaurant = ({ action, restaurantId }) => {
    return instanceApiData.post('/admin/process', { action, restaurantId })
}

export const getRestaurantByIdForAdmin = (id) => {
    return instanceApiData.get(`/admin/restaurant/${id}`)
}

//Post
export const createPost = (data) => {
    return instanceApiData({
        method: "post",
        url: "/post/create",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
    })
}

export const getPostByRestaurant = (id) => {
    console.log(id);
    return instanceApiData.get(`/post/get-by-restaurant?restaurantId=${id}`)
}

export const deletePost = (id) => {
    return instanceApiData.delete(`/post/delete/${id}`)
}