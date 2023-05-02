


const combineCart = (firebase, local) => {
    let combinedCartItems = []
    let combinedCart =   {
      cartItems: [],
      totalAmount: 0,
      totalQuantity: 0
    }
    for (let cartItem of firebase.cartItems) {
      const localIndex = local.cartItems.findIndex(item => item.id === cartItem.id)
      if (localIndex < 0) {
        combinedCartItems.push(cartItem)
      } else if (local.cartItems[localIndex].quantity < cartItem.quantity) {
        combinedCartItems.push(cartItem)
      } else if (local.cartItems[localIndex].quantity >= cartItem.quantity) {
        combinedCartItems.push(local.cartItems[localIndex])
      } 
    }
    for (let cartItem of local.cartItems) {
      const firebaseIndex = firebase.cartItems.findIndex(item => item.id === cartItem.id)
      if (firebaseIndex < 0) {
        combinedCartItems.push(cartItem)
      } 
    }
  
    let totalAmount = 0
    for (let item of combinedCartItems) {
      totalAmount = totalAmount + item.totalPrice
    }
    let totalQuantity = 0
    for (let item of combinedCartItems) {
      totalQuantity = totalQuantity + item.quantity
    }
  
    combinedCart =   {
      cartItems: combinedCartItems,
      totalAmount: totalAmount,
      totalQuantity: totalQuantity
    }
    console.log(combinedCart)
    return combinedCart
  }
  
  export default combineCart;