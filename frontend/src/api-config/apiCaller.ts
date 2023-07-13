import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const axiosPublic = axios.create({
    baseURL: "http://localhost:5000/api",
});

axiosPublic.interceptors.request.use(
    async (config: any) => {
        const accessToken = Cookies.get("accessToken");
        if (accessToken) {
            config.headers = {
                ...config.headers,
                authorization: `Bearer ${accessToken}`,
            };
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosPublic.interceptors.response.use(
    (response) => response,
    async (error: any) => {
        const config = error?.config;

        if (error?.response?.status === 401 && !config.sent) {
            config.sent = true;
        }
    }
);

// export const apiCaller = (method: string, path: string, data?: any) => {
//     return axiosPublic({
//         method,
//         url: `${path}`,
//         data,
//     });
// };

const apiCaller = async (method: string, path: string, data?: any): Promise<AxiosResponse<any, any>> => {
    const config: AxiosRequestConfig = {
        method,
        url: path,
        data,
        baseURL: "http://localhost:5000/api", // Replace with your API base URL
        headers: {
            Authorization: "Bearer <access-token>", // Example: Adding an Authorization header
            "Content-Type": "application/json", // Example: Specifying the content type
            // Add any other required headers
        },
    };

    const response = await axios(config);
    return response;
};

export default apiCaller;