import axios from "axios";
import { MoneyFiBaseApiUrl } from "../index";
const api = axios.create({
  baseURL: `${MoneyFiBaseApiUrl}`, // default, can be overridden
  timeout: 100_000,
  headers: {
    "Content-Type": "application/json",
  },
});


export async function apiPost<T>(
  endpoint: string,
  data?: any,
): Promise<T> {
  try {
    const url = `${MoneyFiBaseApiUrl}/${endpoint}`;
    let res = await axios.post(url, data);
    return res.data; 
  } catch (err: any) {
      throw new Error(err?.response?.data);
  }
}


export async function apiGet<T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T> {
  try {
    const url = `${MoneyFiBaseApiUrl}/${endpoint}`
    let res = await api.get(url, { params });
    return res.data; 
  } catch (err: any) {
      throw new Error(err?.response?.data);
  }
}


