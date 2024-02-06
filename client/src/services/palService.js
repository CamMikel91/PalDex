import http from "./httpService";

export const getPalData = async () => {
  const pals = await http.get("/pals");
  return pals.data;
};
