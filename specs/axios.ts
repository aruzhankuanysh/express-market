import axios from 'axios';

const api = axios.create({
    baseURL: "https://test.4dev.kz/GOOD_FOOD/hs/GoodFood1C/",
    headers: {
        "content-type":"application/json",
        "Accept":"application/json",
        "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7"
    }
})


export default api