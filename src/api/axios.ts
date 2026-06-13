import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://api.restful-api.dev',
    timeout: 5000,
    headers: {
        'Content-type': 'application/json',
    }
})