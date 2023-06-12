import axios from 'axios';

const api = axios.create({
    baseURL: "https://192.168.31.244/GOOD_FOOD/hs/GoodFood1C/",
    headers: {
        "content-type":"application/json"
    }
})


export default api