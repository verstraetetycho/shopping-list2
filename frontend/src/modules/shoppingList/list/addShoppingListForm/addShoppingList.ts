import axios from "axios";
import { API_URL, ShoppingList } from "../../../../global/api";

async function addShoppingList(shoppingList: ShoppingList) {
  const resp = await axios.post(`${API_URL}/shopping-lists`, shoppingList);

  return resp.data;
}

export { addShoppingList };
