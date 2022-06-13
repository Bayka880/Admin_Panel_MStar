const getAllOrders = async () => {
  return await fetch("../../DummyJson/Orders.json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
// const registerUser = async (credentials) => {
//   return await fetch("http://52.221.191.153/admin/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   });
// };

// const userInfoStorage = (userInfo) => {
//   localStorage.setItem("token", userInfo.token);
//   localStorage.setItem("userInfo", JSON.stringify(userInfo.data));
// };

export const otherServices = {
  getAllOrders,
};
