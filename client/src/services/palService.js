import http from "./httpService";

export const getPalData = async () => {
  const pals = await http.get("/pals");
  return pals.data;
};

export const getPalCount = (user, palId) => {
  // get the count of the pal with the given id from database.
  // return count.data;
};
