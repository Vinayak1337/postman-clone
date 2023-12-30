import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchRequests = async () => {
  try {
    const { data, status } = await axios(`${BASE_URL}/api/request`);

    if (status !== 200) return null;

    return data;
  } catch (error) {
    return null;
  }
};

export const fetchRequest = async (id: string) => {
  try {
    const { data, status } = await axios(`${BASE_URL}/api/request/${id}`);

    if (status !== 200) return null;

    return data;
  } catch (error) {
    return null;
  }
};
