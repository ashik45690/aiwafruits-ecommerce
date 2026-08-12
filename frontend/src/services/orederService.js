import api from "./api";

export const OrederServices = async (data) => {
  const response = await api.post("/ordersdata", data);

  return response;
};

export async function getAllOrders() {
  const response = await api.get("/get-all-orders");

  return response;
}


export async function GetMyorders() {
  const response = await api.get('/get-all-my-orders');

  return response
}

export async function GetSingleOrder(id) {
  return await api.get(`/my-order/${id}`);
}

export async function CancelOrderService(id) {
  const response = await api.get(`/cancel-order/${id}`)

  return response.data
}