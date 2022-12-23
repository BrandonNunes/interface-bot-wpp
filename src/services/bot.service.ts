import axios from "axios";

const bot = axios.create({
    baseURL: 'http://localhost:9000',
    timeout: 120000
});

export default bot;
