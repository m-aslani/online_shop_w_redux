import { createContext, useContext, useReducer } from "react";
import { sumItems } from "../helpers/helper";

const initialState = {
  selecteditems: [],
  itemsCount: 0,
  total: 0,
  checkOut: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.selecteditems.find((item) => item.id === action.payload.id)) {
        state.selecteditems.push({ ...action.payload, quantity: 1 });
      }
      return {
        ...state,
        ...sumItems(state.selecteditems),
        checkOut: false,
      };
    case "INCREASE":
      const increaseIndex = state.selecteditems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selecteditems[increaseIndex].quantity+=1;
      return {
        ...state,
        ...sumItems(state.selecteditems),
      };
    case "DECREASE":
      const decreaseIndex = state.selecteditems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selecteditems[decreaseIndex].quantity-=1;
      return {
        ...state,
        ...sumItems(state.selecteditems),
      };
    case "CHECKOUT":
      return {
        selecteditems: [],
        itemsCount: 0,
        total: 0,
        checkOut: true,
      };
    case "DELETE_ITEM":
      const newSelectedItems = state.selecteditems.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        selecteditems: [...newSelectedItems],
        ...sumItems(newSelectedItems),
      };
    default:
      throw new Error("Invalid Action!");
  }
};

const CartContext = createContext();

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const { state, dispatch } = useContext(CartContext);
  return [state, dispatch];
};

export default CartProvider;
export { useCart };
