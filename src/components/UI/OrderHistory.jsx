import React, { useState, useEffect } from 'react'
import "../../styles/cart-item-card.css";
import { Link } from "react-router-dom";
import QuantitySelector from './QuantitySelector';
import { motion } from "framer-motion";
import accounting from 'accounting'
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import {db} from '../../firebase_setup/firebase';
import { Helmet } from '../../components/helmet/Helmet'


const OrderHistory = (props) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const uid = props.uid
    const fetchOrders = async () => {
        const q = query(collection(db, "orders"), where("uid", "==", uid));
        await getDocs(q)
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                        .map((doc) => ({ ...doc.data(), id: doc.id }))
                        .sort((a, b) => {
                            const aTime = a.createdAt ? new Timestamp(a.createdAt.seconds, a.createdAt.nanoseconds).toDate() : null;
                            const bTime = b.createdAt ? new Timestamp(b.createdAt.seconds, b.createdAt.nanoseconds).toDate() : null;

                            if (!aTime && !bTime) {
                            return 0; // both documents have no createdAt property
                            } else if (!aTime) {
                            return 1; // a has no createdAt property, move it to the end
                            } else if (!bTime) {
                            return -1; // b has no createdAt property, move it to the end
                            } else {
                            return bTime - aTime; // sort by createdAt field
                            }
                        });
                
                setOrders(newData);
                setLoading(false)

            
            });
    }
    useEffect(()=>{
        fetchOrders();
      }, [])
      console.log(orders)



      if (loading) {
        return (
            <div className="account-page--column-large account-order-history">
                <h4 className="account-page-subtitle">
                Order history
                </h4>
                <p className="empty"></p>
                
            </div>
        )
      }
      if (orders && orders.length > 0) {
        return (
            <div className="account-page--column-large account-order-history">
                <h4 className="account-page-subtitle">
                Order history
                </h4>
                <table className="order-table">
                    <thead>
                        <tr>
                            <th className='cell-left'>ORDER #</th>
                            <th className='cell-right'>ORDER PLACED</th>
                            <th className='cell-right'>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        orders.map((order, key)=>{
                            return(
                                <tr className="order-details" key={key}>
                                    <td className='cell-left'><Link to={{ pathname: `orders/${order.id}` }}>{order.id}</Link></td>
                                    <td className='cell-right'>{order.createdAt ? new Timestamp(order.createdAt.seconds, order.createdAt.nanoseconds).toDate().toLocaleString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Australia/Sydney' }) : null}</td>
                                    <td className='cell-right'>{accounting.formatMoney(order.amountTotal)}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>




                </table>
                
            </div>
          )


      }
    return (
        <div className="account-page--column-large account-order-history">
            <h4 className="account-page-subtitle">
            Order history
            </h4>
            <p className="empty">You have no orders</p>
            
        </div>
    )
}

export default OrderHistory;
