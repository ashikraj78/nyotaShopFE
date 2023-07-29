import Router from "next/router";
export const userService = {
  logout,
};

function logout() {
  localStorage.removeItem("nyota");
  Router.push("/");
}
