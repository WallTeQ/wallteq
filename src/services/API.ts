
/// <reference types="vite/client" />
import axios from "axios";

export class API {
  private token: string
  constructor(token = "") {
    this.token = token
  }
  private _url = import.meta.env.VITE_SERVER_URL;

  async post(url: string, body: object, token = "") {
    try {
      let requestOptions: RequestInit;
      const authToken = token || this.token;
      if (body instanceof FormData) {
        // For FormData, do not set Content-Type, browser will set it (with boundary)
        const headers: any = {};
        if (authToken) {
          headers["Authorization"] = "Bearer " + authToken;
        }
        requestOptions = {
          method: "POST",
          headers,
          body,
          redirect: "follow",
          credentials: "include",
        };
      } else {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if (authToken) {
          myHeaders.append("Authorization", "Bearer " + authToken);
        }
        requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(body),
          redirect: "follow",
          credentials: "include",
        };
      }
      const response = await fetch(this._url + url, requestOptions);
      const result = await response.json();
      
      // Check if the response is successful
      if (!response.ok) {
        console.error("API POST failed with status:", response.status, result);
        // Throw the full error object to preserve server validation details
        throw {
          error: result.error || "Request failed",
          message: result.message || `HTTP ${response.status}`,
          details: result.details || [],
          status: response.status
        };
      }
      
      return result;
    } catch (e: any) {
      console.error("API POST error:", e);
      // If it's already our formatted error object, re-throw it
      if (e && typeof e === 'object' && (e.error || e.message || e.details)) {
        throw e;
      }
      // Otherwise, throw a generic error
      throw new Error("API POST Request failed");
    }
  }

  async put(url: string, body: object | FormData, token = "") {
    try {
      const myHeaders = new Headers();
      if (!(body instanceof FormData)) {
        myHeaders.append("Content-Type", "application/json");
      }
      const authToken = token || this.token;
      if (authToken) {
        myHeaders.append("Authorization", "Bearer " + authToken);
      }

      const requestOptions: RequestInit = {
        method: "PUT",
        headers: myHeaders,
        body: body instanceof FormData ? body : JSON.stringify(body),
        redirect: "follow",
        credentials: "include",
      };

      const response = await fetch(this._url + url, requestOptions);
      const result = await response.json();
      
      
      // Check if the response is successful
      if (!response.ok) {
        console.error("API PUT failed with status:", response.status, result);
        throw new Error(result.message || result.error || `HTTP ${response.status}`);
      }
      
      return result;
    } catch (e) {
      console.error("API PUT error:", e);
      throw new Error("API PUT Request failed");
    }
  }

  async uploadImage(file: File, name = undefined) {
    const formData = new FormData();
    formData.append("file", file, name ? name : file.name);
    const res = await axios.post(this._url + "/api/uploads", formData);
    if (res.data.success) {
      return { ...res.data, path: this._url + res.data.path };
    } else {
      throw new Error("Image upload failed");
    }
  }

  async get(url: string, token = "") {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const authToken = token || this.token;
      if (authToken) {
        myHeaders.append("Authorization", "Bearer " + authToken);
      }

      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include",
      };

      const response = await fetch(this._url + url, requestOptions);
      const result = await response.json();
      
      // Check if the response is successful
      if (!response.ok) {
        console.error("API GET failed with status:", response.status, result);
        throw new Error(result.message || result.error || `HTTP ${response.status}`);
      }
      
      return result;
    } catch (e) {
      console.error("API GET error:", e);
      throw new Error("API GET Request failed");
    }
  }

  async delete(url: string, token = "") {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const authToken = token || this.token;
      if (authToken) {
        myHeaders.append("Authorization", "Bearer " + authToken);
      }

      const requestOptions: RequestInit = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include",
      };

      const response = await fetch(this._url + url, requestOptions);
      const result = await response.json();
      
      // Check if the response is successful
      if (!response.ok) {
        console.error("API DELETE failed with status:", response.status, result);
        throw new Error(result.message || result.error || `HTTP ${response.status}`);
      }
      
      return result;
    } catch (e) {
      console.error("API DELETE error:", e);
      throw new Error("API DELETE Request failed");
    }
  }
}
