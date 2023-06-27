import api from "./axios";
import { Order, registerUser, updateUser } from "./gosuTypes";

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

    // GET – получает список искомых товаров
    searchProducts = async (searchTerm: string) => {
        try {
            const response = await api.get(`Search?SearchItem=${searchTerm}`);
            return response.data.Items;
        } catch (error) {
            console.error(error);
        }
    };

    // GET – получает товар в массиве
    getProduct = async (ItemId?: string | undefined) => {
        if (ItemId) {
            try {
                const response = await api.get(`Items?ItemId=${ItemId}`);
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
    };

    // POST - создание нового заказа
    postOrder = async (order: Order) => {
        try {
            const response = await api.post(`Orders`, order);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    // POST - история заказов пользователя
    postOrdersHistory = async (ClientId: string) => {
        try {
            const response = await api.get(`Orders?ClientId=${ClientId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    deleteOrder = async (data:{ IdOrder: string, token: string }) => {
        try {
            const response = await api.delete(`Orders`, {data})
            return response.data;
        } catch (error) {
            console.error(error)
        }
    };

    // GET – получает полный список всех товаров в массиве //! Крашит браузер
    // getAllProducts = async () => {
    //     try {
    //         const response = await api.get(`Items`);
    //         return response.data; 
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // GET – получает информацию о пользователе по номеру телефона
    getUser = async (ClientPhone: string) => {
        try {
            const response = await api.get(`User?ClientPhone=${ClientPhone}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    // POST - обновление пользователя
    putUser = async (user: updateUser) => {
        try {
            const response = await api.post(`putUser`, user);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    // POST - получение токенов пользователя
    postLogin = async (ClientPhone: string, password: string) => {
        const data = {
            Phone: ClientPhone,
            code: password //"1111" 
        }
        try {
            const response = await api.post(`login`, data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    // POST - получение токенов пользователя
    postRefresh = async (Token: string) => {
        const data = {
            Token: Token
        }
        try {
            const response = await api.post(`RefreshToken`, data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    // POST - регистрация пользователя
    registerUser = async (user: registerUser) => {
        try {
            const response = await api.post(`User`, user);
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