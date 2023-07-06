import { feathers } from "@feathersjs/feathers";
import rest from "@feathersjs/rest-client";
import authentication from "@feathersjs/authentication-client";
import { HttpError } from "@refinedev/core";
import axios from "axios";

export const SERVER_URL: string =
  process.env.REACT_APP_SERVER_URL ?? "http://localhost:3030";

export const featherInstance = feathers();

const restClient = rest(`${SERVER_URL}`);

export const axiosInstance = axios.create({
  headers: {
    "X-App-Client": "web-browser",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

featherInstance.configure(restClient.axios(axiosInstance));
featherInstance.configure(
  authentication({
    storage: localStorage,
    storageKey: "undangon_client",
  })
);
