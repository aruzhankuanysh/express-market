import axios from 'axios';

const api = axios.create({
    baseURL: "https://test.4dev.kz/GOOD_FOOD/hs/GoodFood1C/",
    headers: {
        "content-type":"application/json",
        "Accept":"application/json",
        "mode": 'no-cors'
    }
})


export default api