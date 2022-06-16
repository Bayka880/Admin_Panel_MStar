const loginUser = async (credentials) => {
  return await fetch("https://dev-api.mstars.mn/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};
const registerUser = async (credentials) => {
  return await fetch("http://52.221.191.153/admin/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};

const userInfoStorage = (userInfo) => {
  localStorage.setItem("token", userInfo.token);
  localStorage.setItem("userInfo", JSON.stringify(userInfo.data));
};
const editUserInfo = async (namePass) => {
  return fetch("https://dev-api.mstars.mn/admin/update/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(namePass),
  });
};

export const userService = {
  loginUser,
  registerUser,
  userInfoStorage,
  editUserInfo,
};
