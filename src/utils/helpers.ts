import { MoneyFiBaseApiUrl } from "../index";
import {VERSION} from "../version"; 
import {SDK_TYPE} from "./const"; 
import { API_DEFAULT_TIMEOUT } from "../index";

async function fetchWithTimeout<T>(
  url: string,
  options: RequestInit = {},
  timeout = API_DEFAULT_TIMEOUT
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);

    console.log({res})
    if (!res.ok) {
      const errorData = await res.json().catch(() => res.statusText);
      throw new Error(typeof errorData === "string" ? errorData : JSON.stringify(errorData));
    }

    return (await res.json()) as T;
  } catch (err: any) {
    console.log({err})
    if (err.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw err;
  }
}
  function buildHeaders(clientCode?: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    "X-SDK": SDK_TYPE,                // e.g. "ts-sdk"
    "X-SDK-Version": VERSION,         // from ../version
    ...(clientCode ? { "X-Client-Code": clientCode } : {})
  };
}

function buildUrl(endpoint: string, params?: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) {
    return `${MoneyFiBaseApiUrl}/${endpoint}`;
  }
  const queryString = new URLSearchParams(
    Object.entries(params).reduce<Record<string, string>>((acc, [k, v]) => {
      if (v !== undefined && v !== null) acc[k] = String(v);
      return acc;
    }, {})
  ).toString();

  return `${MoneyFiBaseApiUrl}/${endpoint}?${queryString}`;
}

export async function apiPost<T>(
  endpoint: string,
  data?: any,
  clientCode?: string
): Promise<T> {
  // const url = `${MoneyFiBaseApiUrl}/${endpoint}`;
  const url = buildUrl(endpoint);
  return fetchWithTimeout<T>(url, {
    method: "POST",
    headers: buildHeaders(clientCode),
    body: data ? JSON.stringify(data) : undefined,
  });
}

export async function apiGet<T>(
  endpoint: string,
  params?: Record<string, any>,
  clientCode?: string
): Promise<T> {
 
  const url = buildUrl(endpoint, params);
  
  console.log(buildHeaders(clientCode)); 

  return fetchWithTimeout<T>(url, {
    method: "GET",
    headers: buildHeaders(clientCode),
  });
}
