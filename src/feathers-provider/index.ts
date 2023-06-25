import { DataProvider } from "@refinedev/core";
import { generateSort, generateFilter } from "./utils";
import { stringify } from "query-string";
import { SERVER_URL, featherInstance } from "./feathersClient";

type MethodTypes = "get" | "delete" | "head" | "options";
type MethodTypesWithBody = "post" | "put" | "patch";

export const dataProvider = (): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const service = featherInstance.service(resource);

    const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};

    const { headers: headersFromMeta } = meta ?? {};

    const queryFilters = generateFilter(filters);

    const query: {
      $skip?: number;
      $limit?: number;
      $sort?: string;
      _order?: string;
    } = {};

    if (mode === "server") {
      query.$skip = (current - 1) * pageSize;
      query.$limit = current * pageSize;
    }

    // const generatedSort = generateSort(sorters);
    // if (generatedSort) {
    //   const { _sort, _order } = generatedSort;
    //   query.$sort = _sort.join(",");
    // }

    const { data, total } = await service.find({
      query,
      headers: headersFromMeta,
    });

    // const total = +headers["x-total-count"];

    return {
      data,
      total: total,
    };
  },

  getMany: async ({ resource, ids, meta }) => {
    const service = featherInstance.service(resource);

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const { data } = await service.find({ headers });

    return {
      data,
    };
  },

  create: async ({ resource, variables, meta }) => {
    const service = featherInstance.service(resource);

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "post";

    const { data } = await service.create(
      {},
      {
        headers,
      }
    );

    return {
      data,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const service = featherInstance.service(resource);

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "patch";

    const { data } = await service.update(
      id,
      {},
      {
        headers,
      }
    );

    return {
      data,
    };
  },

  getOne: async ({ resource, id, meta }) => {
    const service = featherInstance.service(resource);

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const { data } = await service.get(id, { headers });

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id, variables, meta }) => {
    const service = featherInstance.service(resource);

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "delete";

    const { data } = await service.remove(id, {
      headers,
    });

    return {
      data,
    };
  },

  getApiUrl: () => {
    return SERVER_URL;
  },

  custom: async ({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
  }) => {
    
    const data: any = { ini: "data custom" };

    return Promise.resolve({ data });
  },
});
