import { feathers } from "@feathersjs/feathers";
import rest from "@feathersjs/rest-client";
import axios from "axios";

export const SERVER_URL: string =
  process.env.REACT_APP_SERVER_URL ?? "http://localhost:3030";

export const featherInstance = feathers();

const restClient = rest(`${SERVER_URL}`);

featherInstance.configure(
  restClient.axios(
    axios.create({
      headers: {
        "X-App-Client": "web-browser",
      },
    })
  )
);
