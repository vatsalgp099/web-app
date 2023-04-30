import axios from 'axios';

export function postRequest(endpoint, payload) {
    return axios.post(endpoint, payload)
}

export function getRequest(endpoint) {
    return axios.get(endpoint)
}

export function deleteRequest(endpoint) {
    return axios.delete(endpoint)
}