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

export function updateUser(user) {
  return http.put(`/users/${user._id}`, {
    name: user.name.toLowerCase(),
    email: user.email.toLowerCase(),
    pals: user.pals,
  });
}

export function getUserPals(user) {
  return http.get(`/users/${user._id}`);
}
