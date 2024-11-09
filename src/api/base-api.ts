import { HTTPTransport } from "../utils/xhr";

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type RequestOptions = {
  headers?: Record<string, string>;
  data?: Record<string, any> | null;
  timeout?: number;
}

export class BaseAPI {
  private readonly baseUrl: string;
  private readonly xhr: HTTPTransport;

  constructor() {
    this.baseUrl = 'https://ya-praktikum.tech/api/v2';
    this.xhr = new HTTPTransport();
  }

  protected get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.xhr.get(this.baseUrl + endpoint, options) as Promise<T>;
  }

  protected post<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.xhr.post(this.baseUrl + endpoint, options) as Promise<T>;
  }

  protected put<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.xhr.put(this.baseUrl + endpoint, options) as Promise<T>;
  }

  protected delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.xhr.delete(this.baseUrl + endpoint, options) as Promise<T>;
  }
}
