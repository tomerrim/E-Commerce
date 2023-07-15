import axios from "axios";
import baseUrl from "../URL.json";

export const customFetch = async (url, method, data) => {
    try {
        if (method === "GET") {
            console.log(`${baseUrl.url}/${url}`);
            const response = await axios.get(`${baseUrl.url}/${url}`, { params: data });
            console.log(response.data)
            return response.data;
        }
    } catch (error) {
        if (error.response) {
          throw new Error(error.response.data);
        } else if (error.request) {
          throw new Error("No response received from the server");
        } else {
          throw new Error("Error occurred during the request");
        }
    }
};