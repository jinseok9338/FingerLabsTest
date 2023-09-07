import Axios from 'axios';

export const fetch = async <T>(url: string): Promise<T> => {
    const response = await Axios.get<T>(url);
    return response.data;
  }