import axios from "axios";

const mockData = [
    {
        id: 1,
        name: 'Restaurant 1',
        lat: 21.0191446,
        lon: 105.8347163,
        rating: 7
    },
    {
        id: 2,
        name: 'Restaurant 2',
        lat: 21.0212571,
        lon: 105.8376679,
        rating: 7.5
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
        rating: 9.5
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
    return new Promise((res, rej) => {
        let n = Math.random(5) * 5
        res(mockData.slice(0, n))
    })
}

export const getRestaurantById = (id) => {
    return new Promise((res, rej) => {
        const data = mockData.filter(item => {
            return item.id == id
        })
        if (data[0])
            res(data[0])
        else
            rej(404)
    })
}