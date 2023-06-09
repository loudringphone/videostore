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
        newItem.quantity =
        newItem.quantity !== undefined && newItem.quantity >= 0 && typeof newItem.quantity === "number"
          ? newItem.quantity
          : newItem.quantity === 0
          ? 0
          : 1;
        const existingItem = state.cartItems.find(item => item.id === newItem.id);
        state.totalQuantity =  state.totalQuantity + newItem.quantity

        if (!existingItem) {
            state.cartItems.push({
                id: newItem.id,
                name: newItem.name,
                // stock: newItem.stock,
                // image: newItem.image,
                price: newItem.price,
                quantity: newItem.quantity,
                totalPrice: newItem.price * newItem.quantity
            });
        }

        else {
            existingItem.name = newItem.name
            // existingItem.image = newItem.image
            existingItem.price = newItem.price
            // existingItem.stock = newItem.stock
            existingItem.quantity = existingItem.quantity + newItem.quantity
            existingItem.totalPrice = newItem.price * existingItem.quantity
        }


        state.totalAmount = state.cartItems.reduce((total, item) => {
          return total + item.price * item.quantity
        }, 0);

        // console.log(state.totalQuantity);
        // console.log(state.cartItems)
        // console.log(state.totalAmount)
    },
    amendItem: (state, action) => {
      let targetItem = action.payload;
      console.log(targetItem)
      const existingItem = state.cartItems.find(item => item.id === targetItem.id);
      if (existingItem) {
        targetItem.quantity = targetItem.quantity && targetItem.quantity > 0 && typeof targetItem.quantity === "number" ? targetItem.quantity : 1
        state.totalQuantity =  state.totalQuantity + targetItem.quantity - existingItem.quantity
        state.totalAmount = state.totalAmount - existingItem.totalPrice
        existingItem.quantity = targetItem.quantity
        existingItem.totalPrice = existingItem.price * targetItem.quantity
        state.totalAmount = state.totalAmount + existingItem.totalPrice
      }
    },
    removeItem: (state, action) => {
      let targetItem = action.payload;
      const existingItem = state.cartItems.find(item => item.id === targetItem.id);
      if (existingItem) {
        state.totalQuantity =  state.totalQuantity - existingItem.quantity
        state.totalAmount = state.totalAmount - existingItem.totalPrice
        state.cartItems = state.cartItems.filter(item => item.id !== existingItem.id)
      }
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