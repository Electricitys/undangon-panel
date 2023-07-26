import { AuthBindings } from "@refinedev/core";
import {
  AuthActionResponse,
  CheckResponse,
} from "@refinedev/core/dist/interfaces";
import { featherInstance } from "feathers-provider/feathersClient";
import { AuthenticationResponse } from "interfaces";

interface IAuthBindings extends AuthBindings {
  getIdentity: (params?: any) => Promise<AuthenticationResponse>;
}

// It is a mock auth provider.
export const authProvider: IAuthBindings = (() => {
  return {
    // required methods
    login: async ({
      email,
      password,
      remember = false,
    }: {
      email: string;
      password: string;
      remember: boolean;
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
      try {
        await featherInstance.reAuthenticate(force);
        return {
          authenticated: true,
        };
      } catch (err) {
        return {
          authenticated: false,
          logout: true,
          redirectTo: "/login",
          error: {
            message: (err as any).message,
            name: "Unauthorized",
          },
        };
      }
    },
    logout: async ({ redirectPath }: any = {}): Promise<AuthActionResponse> => {
      await featherInstance.logout();
      return {
        success: true,
        redirectTo: redirectPath || "/",
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
    getIdentity: async () => {
      return await featherInstance.get("authentication");
    },
  };
})();
