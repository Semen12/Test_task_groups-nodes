import axios from "axios";

const BASE_URL = "http://127.0.0.1:23456/api";

export default {
    getGroups() {
        return axios.get(`${BASE_URL}/groups`);
    },
    getMetrics() {
        return axios.get(`${BASE_URL}/metrics`);
    }
}