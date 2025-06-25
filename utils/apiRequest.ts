import axios from 'axios';

export const apiRequest = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  data?: any,
) => {
  try {
    const response = await axios({method,url,data,})
    return response.data
  } catch (error: any) {
    console.error('API Request Error:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

 
