import axios from "axios";
import { API_URL, ShoppingList } from "../../../global/api";

async function getShoppingLists() {
  const resp = await axios.get<ShoppingList[]>(`${API_URL}/shopping-lists`);

  return resp.data;
}

export { getShoppingLists };
