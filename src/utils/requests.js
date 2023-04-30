import axios from 'axios';

export function postRequest(endpoint, payload) {
    const headers = {
        "Content-Type": "application/json"
    }
    return axios.post(endpoint, payload, headers)
}