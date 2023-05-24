import api from "./axios";
import { registerUser } from "./gosuTypes";

class ApplicationService {
    // GET – получает полный список всех категорий товаров по иерархии 
    getCategory = async () => {
        try {
            const response = await api.get(`Category`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    // GET – получает массив с наименованием складов
    getStocks = async () => {
        try {
            const response = await api.get(`Stock`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    // GET – получает список товаров в массиве
    getProducts = async (CategoryId?: string) => {
        if (CategoryId) {
            try {
                const response = await api.get(`Items?CategoryId=${CategoryId}`);
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
    };

    // GET – получает полный список всех товаров в массиве
    // getAllProducts = async () => {
    //     try {
    //         const response = await api.get(`Items`);
    //         return response.data; //! Крашит браузер
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // POST - регистрация пользователя
    registerUser = async (user: registerUser) => {
        try {
            const response = await api.post(`Users`, user);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    // Функция для форматирования времени в формат "мм:сс"
    formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };
}

const AppService = new ApplicationService();

export default AppService;