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
        newItem.quantity = newItem.quantity && newItem.quantity > 0 && typeof newItem.quantity === "number" ? newItem.quantity : 1
        const existingItem = state.cartItems.find(item => item.id === newItem.id);

        state.totalQuantity =  state.totalQuantity + newItem.quantity

        if (!existingItem) {
            state.cartItems.push({
                id: newItem.id,
                title: newItem.title,
                stock: newItem.stock,
                image: newItem.image,
                price: newItem.price,
                quantity: newItem.quantity,
                totalPrice: newItem.price * newItem.quantity
            });
        }

        else {
            existingItem.title = newItem.title
            existingItem.image = newItem.image
            existingItem.price = newItem.price
            existingItem.stock = newItem.stock
            existingItem.quantity = existingItem.quantity + newItem.quantity
            existingItem.totalPrice = Number(newItem.price) * Number(existingItem.quantity)
        }


        state.totalAmount = state.cartItems.reduce((total, item) => {
          return total + (Number(item.price) * Number(item.quantity));
        }, 0);

        // console.log(state.totalQuantity);
        // console.log(state.cartItems)
        // console.log(state.totalAmount)
    },
    amendItem: (state, action) => {
      let targetItem = action.payload;
      console.log(targetItem)
      const existingItem = state.cartItems.find(item => item.id === targetItem.id);
      targetItem.quantity = targetItem.quantity && targetItem.quantity > 0 && typeof targetItem.quantity === "number" ? targetItem.quantity : 1
      state.totalQuantity =  state.totalQuantity + targetItem.quantity - existingItem.quantity
      state.totalAmount = state.totalAmount - existingItem.totalPrice
      existingItem.quantity = targetItem.quantity
      existingItem.totalPrice = Number(existingItem.price) * Number(targetItem.quantity)
      state.totalAmount = state.totalAmount + existingItem.totalPrice
    },
    removeItem: (state, action) => {
      let targetItem = action.payload;
    },
    removeAllItems: (state, action) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0
    },
  }
});

export const cartActions = cartSlice.actions

export default cartSlice.reducer