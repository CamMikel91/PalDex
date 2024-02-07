import http from "./httpService";

export function registerUser(user) {
  return http.post("/users/register", {
    name: user.name.toLowerCase(),
    email: user.email.toLowerCase(),
    password: user.password,
  });
}

export function loginUser(user) {
  return http.post("/users/login", {
    email: user.email.toLowerCase(),
    password: user.password,
  });
}
