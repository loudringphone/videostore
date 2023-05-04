import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { setDoc, getDoc, updateDoc, doc, serverTimestamp, Timestamp } from "firebase/firestore"
import accounting from 'accounting'
import { db } from "../firebase_setup/firebase"
import { Helmet } from '../components/helmet/Helmet'
import { cartActions } from '../redux/slices/cartSlice';

import processing from '../assets/images/loading.gif'

export const Order = (props) => {
const [preliminaryOrder, setPreliminaryOrder] = useState(null)
const [userInfo, setUserInfo] = useState(null)
const [orderInfo, setOrderInfo] = useState(null)
const [orderTime, setOrderTime] = useState(null)
const [loading, setLoading] = useState(true)
const [createOrder, setCreateOrder] = useState(false)
const [orderOwner, setOrderOwner] = useState(false)
const [shippingAddress, setShippingAddress] = useState([])

    const {orderId} = useParams()
    const dispatch = useDispatch();
    const currentUser = props.currentUser

   
    useEffect(()=>{
        if (currentUser != null) {
            const fetchUser = async () => {
            const docRef = doc(db, "customers", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserInfo(docSnap.data());
                // console.log(docSnap.data())
            } else {
            // docSnap.data() will be undefined in this case
            console.log("No such user!");
            setLoading(false)
            }
            }
            fetchUser()

            
        }
    },[currentUser])

    useEffect(()=>{
        if (userInfo) {
                const preliminaryOrder = userInfo.preliminaryOrder
                const createOrder = async function() {
                    if (preliminaryOrder != null) {
                            if (preliminaryOrder.orderId === orderId) {
                                console.log('create order')
                            await setDoc(doc(db, "orders", preliminaryOrder.orderId), {
                                id: preliminaryOrder.orderId,
                                uid: currentUser.uid,
                                createdAt: serverTimestamp(),
                                items: userInfo.cart.cartItems,
                                address: preliminaryOrder.address,
                            })
                            setCreateOrder(true)
                            dispatch(cartActions.removeAllItems())
                            await removePreliminaryOrder()
                            await fetchOrder()
                        } else {
                            setLoading(false)
                        }
                    } else {
                        setLoading(false)
                    }
                }
                const removePreliminaryOrder = async () => {
                    const userRef = doc(db, "customers", currentUser.uid);
                    await updateDoc(userRef, {
                        cart: null,
                        preliminaryOrder: null,
                    });
                    console.log('removePreliminaryOrder')

                }
                const fetchOrder = async () => {
                    const docRef = doc(db, "orders", orderId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        console.log('fetch order')
                        setOrderInfo(docSnap.data());
                        setLoading(false)
                    } else {
                        createOrder()
                    }
                }
                fetchOrder()
            }
    },[userInfo])


    useEffect(()=>{
        if (orderInfo){
            const shippingAddressObj = orderInfo.address
            let shippingAddressArr =
                [
                    `${shippingAddressObj.firstName} ${shippingAddressObj.lastName}`,
                    shippingAddressObj.company,
                    shippingAddressObj.address1,
                    shippingAddressObj.address2,
                    `${shippingAddressObj.city}, ${shippingAddressObj.state}`,
                    `${shippingAddressObj.country} ${shippingAddressObj.zip}`,
                    shippingAddressObj.phone
                ]
            for (let i = 0; i < shippingAddressArr.length; i++) {
                const element = shippingAddressArr[i];
                if (shippingAddressArr[i].startsWith(',')) {
                    shippingAddressArr[i] = shippingAddressArr[i].slice(1);
                }
                shippingAddressArr[i] = shippingAddressArr[i].trim()
                if (shippingAddressArr[i].endsWith(',')) {
                    shippingAddressArr[i] = shippingAddressArr[i].slice(0, -1);
                }
                if (element === " " || element === ", " || element.length === 0) {
                    shippingAddressArr.splice(i, 1);
                    i--;
                }
            }
            setShippingAddress(shippingAddressArr)
            console.log(shippingAddress)
        }

    },[orderInfo])

 useEffect(()=>{
    if (orderInfo) {
        const order = orderInfo
        const options = { day: 'numeric', month: 'short', year: 'numeric', 
        // hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short', 
        timeZone: 'Australia/Sydney' };
        let orderCreatedAt = order.createdAt ? new Timestamp(order.createdAt.seconds, order.createdAt.nanoseconds).toDate().toLocaleString('en-AU', options) : null;
        orderCreatedAt = String(orderCreatedAt)
        order.createdAt = orderCreatedAt
        setOrderTime(orderCreatedAt)
        if (orderInfo.uid === currentUser.uid) {
            setOrderOwner(true)
        }        
    }
    console.log(orderInfo)
 },[orderInfo])
 







 if (loading && createOrder) {
    return (
        <Helmet title={`Order #${orderId}`}>
            <section className="account-page">
                <div className="processing">
                    <img src={processing} alt="processing" style={{height: '30px'}}/>
                    Payment has been processed. Please don't close the browser while the order is being created...
                </div>
            </section>
        </Helmet>
    )
 }  

 else if (loading && !createOrder) {
    return (
        <Helmet title={`Order #${orderId}`}>
            <section className="account-page">
                <div className="processing">
                    <img src={processing} alt="processing" style={{height: '30px'}}/>
                    Loading order information...
                </div>
            </section>
        </Helmet>
    )
 }  

 else if (!loading && orderOwner && orderTime !== "Invalid Date") {
    return(
        <Helmet title={`Order #${orderId}`}>
        <section className="account-page account-page-order">
            <div className="order-info">
                <h4>Order number: #{orderInfo.id}</h4>
                <p>Order date: {orderTime}</p>
                <table>
                <thead>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                </thead>
                {
                    orderInfo.items.map((item, key)=>{
                        return(
                            <tr className="item-details" key={key}>
                                <td>{item.name}</td>
                                <td>{accounting.formatMoney(item.price)}</td>
                                <td>{item.quantity}</td>
                                <td>{accounting.formatMoney(item.totalPrice)}</td>
                            </tr>
                        )
                    })
                }
                </table>
                <div className='order-info-footer'>
                    <div className="shipping-details">
                        <h6>Shipping Address</h6>
                        <ul className='shipping-address'>
                            {
                            shippingAddress.map((i, k)=>{
                                return <p key={k}>{i}</p>
                            })
                            }
                        </ul>
                    </div>

                    <div className="price-details">
                            <div className="tax">
                            <div>Tax</div>
                            <div>{accounting.formatMoney(orderInfo.items.reduce((acc, item) => acc + item.totalPrice, 0)/1.1)}</div>
                            </div>
                        <div className="total-amount">
                            <div>Total</div>
                            <div>{accounting.formatMoney(orderInfo.items.reduce((acc, item) => acc + item.totalPrice, 0))}</div>
                        </div>
                    </div>
                </div>



            </div>
        </section>
        </Helmet>
    )
 } else if (!loading && !orderOwner) {
    return (
        <Helmet title="Order not found">
            <section className="account-page">
                <div className="order-not-found">
                    Order not found. Please contact our customer support if need be.
                </div>
            </section>
        </Helmet>
    )
 }
    





}