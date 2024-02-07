import http from "./httpService";

export function login(email, password) {
  return http.post("/users/login", { email, password });
}

export function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  getJwt,
};
