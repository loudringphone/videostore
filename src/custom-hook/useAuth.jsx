import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase_setup/firebase'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {db} from '../firebase_setup/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistActions } from '../redux/slices/wishlistSlice';
import { cartActions } from '../redux/slices/cartSlice';


const useAuth = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setCurrentUser(user);
                // console.log(user.uid)
            } else {
                setCurrentUser(null)
            }
        })
    })
    
    useEffect(() => {
        if (currentUser != null) {       

        const fetchUser = async () => {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserInfo(docSnap.data());
                // console.log(docSnap.data())
            } else {
            // docSnap.data() will be undefined in this case
            console.log("No such user!");
            }
            }
        
        
            fetchUser()
        }
    }, [currentUser])

    const wishlist = useSelector(state => state.wishlist);
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    useEffect(() => {
        if (userInfo.wishlist && userInfo.wishlist.length >= 0) {
            const userRef = doc(db, "users", userInfo.uid);
            for (let itemId of userInfo.wishlist) {
                if (!wishlist.includes(itemId)) {
                    dispatch(wishlistActions.addItem(itemId))
                }
            }
            let NotOnList = []
            for (let itemId of wishlist) {
                if (!userInfo.wishlist.includes(itemId)) {
                    NotOnList.push(itemId)
                }
            }
            async function updateUserWishlist() {
                await updateDoc(userRef, {
                    wishlist: userInfo.wishlist.concat(NotOnList)
                  });
            }
            updateUserWishlist()
        }
        if (userInfo.cart && userInfo.cart.cartItems.length >= 0) {
            console.log(userInfo.cart.cartItems)
            for (let cartItem of userInfo.cart.cartItems) {
                const localIndex = cart.cartItems.findIndex(item => item.id === cartItem.id)
                if (localIndex < 0) {
                    dispatch(cartActions.addItem({
                        id: cartItem.id,
                        title: cartItem.title,
                        price: cartItem.price,
                        quantity: cartItem.quantity,
                    }))
                } else if (cart.cartItems[localIndex].quantity < cartItem.quantity) {
                    dispatch(cartActions.amendItem({
                        id: cartItem.id,
                        quantity: cartItem.quantity,
                    }))
                }
            }



            // async function updateUserCart() {
            //     await updateDoc(userRef, {
            //         cart: updatedCart
            //       });
            // }
            // updateUserCart()





        }
        
    }, [userInfo])

 
            
    
    
  return (
    currentUser
  )
}

export default useAuth
