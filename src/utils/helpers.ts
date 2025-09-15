import axios from "axios";
import { MoneyFiBaseApiUrl } from "../index";

const api = axios.create({
  baseURL: `${MoneyFiBaseApiUrl}`, // default, can be overridden
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});


export async function apiPost<T>(
  endpoint: string,
  data?: any,
): Promise<T> {
  const url = `${MoneyFiBaseApiUrl}/${endpoint}`; 
  const resp = await axios.post(url, data);
  return resp.data;
}


export async function apiGet<T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T> {
  const url = `${MoneyFiBaseApiUrl}/${endpoint}`
  const resp = await api.get(url, { params });
  return resp.data;
}


