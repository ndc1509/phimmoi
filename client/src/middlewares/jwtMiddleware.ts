import { Middleware } from "redux";
import { RootState } from "../store";
import { clearToken, saveToken } from "../utils";
export const jwtMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    switch (action.type) {
      case "register/fulfilled":
        saveToken(action);
        break;
      case "login/fulfilled":
        saveToken(action);
        break;
      case "logout/fulfilled":
        clearToken();
        break;
      case "reauthorize/rejected":
        clearToken();
        break;
      case "reauthorize/fulfilled":
        saveToken(action);
        break;
      default:
        break;
    }

    return next(action);
  };
