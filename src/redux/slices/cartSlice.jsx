import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('cart') ? 
  JSON.parse(localStorage.getItem('cart')) : 
  {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0
  };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
        let newItem = action.payload;
        newItem.quantity = newItem.quantity && typeof newItem.quantity === "number" ? newItem.quantity : 1
        const existingItem = state.cartItems.find(item => item.id === newItem.id);

        state.totalQuantity =  state.totalQuantity + newItem.quantity

        if (!existingItem) {
            state.cartItems.push({
                id: newItem.id,
                title: newItem.title,
                image: newItem.image,
                price: newItem.price,
                quantity: newItem.quantity,
                totalPrice: newItem.price
            });
        }

        else {
            existingItem.quantity = existingItem.quantity + newItem.quantity
            existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)
        }


        state.totalAmount = state.cartItems.reduce((total, item) => {
          return total + (Number(item.price) * Number(item.quantity));
        }, 0);

        console.log(state.totalQuantity);
        console.log(state.cartItems)
        console.log(state.totalAmount)
    }
  }
});

export const cartActions = cartSlice.actions

export default cartSlice.reducer