import jwtDecode, { JwtPayload } from "jwt-decode";

export const saveToken = (action: any) => {
  try {
    const accessToken = action.payload.accessToken;
    const decoded = jwtDecode<JwtPayload>(accessToken);
    localStorage.setItem("USER", JSON.stringify(decoded));
    localStorage.setItem("ACCESS_TOKEN", accessToken);
  } catch (error) {
    console.log(error);
  }
};

export const clearToken = () => {
  localStorage.clear();
};
