import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from "../firebase_setup/firebase"
import { signOut } from "firebase/auth"
import { toast } from "react-toastify"


import processing from '../assets/images/loading.gif'
import '../styles/account-page.css'

const Logout = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const logout = () => {
        signOut(auth).then(() => {
            toast.dismiss()
            toast.success("Successfully logged out.", {autoClose: 1500})
            if (pathname==="/apps/wishlist" || pathname==="/cart" || pathname==="/checkout" || pathname==="/account/logout") {
                navigate('/')
            }
        }).catch(error => {
            console.log(error.message)
        })
    }
    useEffect(() => {
            logout();
    }, []);

    return (
        <section className='account-page-register'>
          <div className="processing">
            <img src={processing} alt="processing" style={{height: '30px'}}/>
          Securely logging you out...
          </div>
        </section>
      )
}

export default Logout;