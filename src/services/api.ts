import axios from 'axios';

const BASE_URL = 'https://swapi.dev/api';

export const fetchEntities = async (entityType: string, page: number = 1) => {
    const response = await axios.get(`${BASE_URL}/${entityType}/?page=${page}`);
    return response.data;
}