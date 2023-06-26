import { AuthBindings } from "@refinedev/core";
import {
  AuthActionResponse,
  CheckResponse,
} from "@refinedev/core/dist/interfaces";
import { featherInstance } from "feathers-provider/feathersClient";

// It is a mock auth provider.
export const authProvider: AuthBindings = {
  // required methods
  login: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthActionResponse> => {
    const result = await featherInstance.authenticate({
      strategy: "local",
      email,
      password,
    });

    if (result) {
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        message: "Invalid credentials",
        name: "Invalid credentials",
      },
    };
  },
  check: async (force: boolean = false): Promise<CheckResponse> => {
    const result = await featherInstance.reAuthenticate(force);
    if (result) {
      return {
        authenticated: true,
      };
    }
    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
      error: {
        message: "Check failed",
        name: "Unauthorized",
      },
    };
  },
  logout: async (params: any): Promise<AuthActionResponse> => {
    await featherInstance.logout();
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };
    }
    return {};
  },
};
