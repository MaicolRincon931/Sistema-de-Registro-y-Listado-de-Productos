import axios from 'axios';
import type { Product } from '../types';

const API_URL = 'http://localhost:8080/productos';

export const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
};

export const saveProduct = async (product: Product): Promise<Product> => {
    const response = await axios.post<Product>(API_URL, product);
    return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await axios.post(`${API_URL}/${id}`);
};
