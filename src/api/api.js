import { defineStore } from "pinia";
import axios from "axios";

const instance = axios.create({
    baseURL: "https://fe-interview-api.unnotech.com/books/",
    headers: { "Content-Type": "application/json" },
    timeout: 20000,
});

export const getBookListApi = () => {
    return instance.get();
};
export const getBookApi = (id) => {
    return instance.get(`/${id}`);
};
export const patchBookApi = (id) => {
    return instance.patch(`/${id}`);
};
export const addBookApi = (data) => {
    return instance.post(data);
};
export const deleteBookApi = (id) => {
    return instance.delete(`/${id}`);
};
