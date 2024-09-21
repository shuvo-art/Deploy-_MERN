const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).token
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage || ""}`, // Fixed string interpolation
    Accept: "application/json",
  },
};
