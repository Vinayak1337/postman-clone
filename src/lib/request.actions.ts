import { Prisma } from '@prisma/client';
import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL_PROD;

export const fetchRequests = async () => {
  try {
    const { data, status } = await axios(`${BASE_URL}/api/request`);

    if (status !== 200) return null;

    return data as Prisma.RequestGetPayload<{
      select: {
        id: true;
        url: true;
        method: true;
      };
    }>[];
  } catch (error) {
    return null;
  }
};

export const fetchRequest = async (id: string) => {
  try {
    const { data, status } = await axios(`${BASE_URL}/api/request/${id}`);

    if (status !== 200) return null;

    return data as Prisma.RequestGetPayload<{}>;
  } catch (error) {
    return null;
  }
};

export const createRequest = async (request: Prisma.RequestCreateInput) => {
  try {
    const { data, status } = await axios.post(
      `${BASE_URL}/api/request`,
      request,
    );

    if (status !== 201) return null;

    return data as Prisma.RequestGetPayload<{}>;
  } catch (error) {
    return null;
  }
};

export const deleteRequest = async (id: string) => {
  try {
    const { status } = await axios.delete(`${BASE_URL}/api/request/${id}`);

    if (status !== 200) return false;

    return true;
  } catch (error) {
    return false;
  }
};
