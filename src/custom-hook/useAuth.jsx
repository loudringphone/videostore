import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase_setup/firebase'


const useAuth = () => {
    const [currentUser, setCurrentUser] = useState({})

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
            
  return (
    currentUser
  )
}

export default useAuth
