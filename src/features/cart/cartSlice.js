import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sumPrice, sumQuantity } from "../../helpers/helper";
const initialState = {
  selecteditems: [],
  itemsCount: 0,
  total: 0,
  checkOut: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (!state.selecteditems.find((i) => i.id === action.payload.id)) {
        state.selecteditems.push({ ...action.payload, quantity: 1 });
        state.total = sumPrice(state.selecteditems);
        state.itemsCount = sumQuantity(state.selecteditems);
        state.checkOut = false;
      }
    },
    deleteItem: (state, action) => {
      const newSelectedItem = state.selecteditems.filter(
        (item) => item.id !== action.payload.id
      );
      state.selecteditems = newSelectedItem;
      state.total = sumPrice(state.selecteditems);
      state.itemsCount = sumQuantity(state.selecteditems);
    },
    increase: (state, action) => {
      const increaseIndex = state.selecteditems.findIndex(
        (i) => i.id === action.payload.id
      );
      state.selecteditems[increaseIndex].quantity++;
      state.total = sumPrice(state.selecteditems);
      state.itemsCount = sumQuantity(state.selecteditems);
    },
    decrease: (state, action) => {
      const decreaseIndex = state.selecteditems.findIndex(
        (i) => i.id === action.payload.id
      );
      state.selecteditems[decreaseIndex].quantity--;
      state.total = sumPrice(state.selecteditems);
      state.itemsCount = sumQuantity(state.selecteditems);
    },
    checkOut:(state)=>{
        state.selecteditems = [];
        state.checkOut = true;
        state.total = 0;
        state.itemsCount = 0;
    }
  },
});

export default cartSlice.reducer
export const {addItem, decrease,increase,deleteItem , checkOut} = cartSlice.actions;