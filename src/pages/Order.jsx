import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { setDoc, getDoc, updateDoc, doc, serverTimestamp, Timestamp } from "firebase/firestore"
import accounting from 'accounting'
import { db } from "../firebase_setup/firebase"
import { Helmet } from '../components/helmet/Helmet'

import processing from '../assets/images/loading.gif'

export const Order = (props) => {
const [orderInfo, setOrderInfo] = useState(null)
const [orderTime, setOrderTime] = useState(null)
const [loading, setLoading] = useState(true)
const [orderOwner, setOrderOwner] = useState(false)
const [shippingAddress, setShippingAddress] = useState([])

    const {orderId} = useParams()
    const currentUser = props.currentUser

   
    

    useEffect(()=>{
       
                
        const fetchOrder = async () => {
            try {
              const docRef = doc(db, "orders", orderId);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                console.log('fetch order')
                const orderData = docSnap.data();
                orderData.id = docSnap.id; // add the document id to the orderData object
                setOrderInfo(orderData);
                setLoading(false)
              }
            } catch (error) {
              console.error('Error fetching order:', error);
              setLoading(false);
              // handle the error as appropriate (e.g. show a notification to the user)
            }
          }
          fetchOrder();
        
            
    },[])


    useEffect(()=>{
        if (orderInfo){
            const shippingAddressObj = orderInfo.address
            let shippingAddressArr = null;
            if (shippingAddressObj) {
                shippingAddressArr =
                [
                    `${shippingAddressObj?.firstName} ${shippingAddressObj?.lastName}`,
                    shippingAddressObj?.company,
                    shippingAddressObj?.address1,
                    shippingAddressObj?.address2,
                    `${shippingAddressObj?.city}, ${shippingAddressObj?.state}`,
                    `${shippingAddressObj?.country} ${shippingAddressObj?.zip}`,
                    shippingAddressObj?.phone
                ]
                for (let i = 0; i < shippingAddressArr.length; i++) {
                    const element = shippingAddressArr[i];
                    if (shippingAddressArr[i]?.startsWith(',')) {
                        shippingAddressArr[i] = shippingAddressArr[i].slice(1);
                    }
                    shippingAddressArr[i] = shippingAddressArr[i]?.trim()
                    if (shippingAddressArr[i]?.endsWith(',')) {
                        shippingAddressArr[i] = shippingAddressArr[i].slice(0, -1);
                    }
                    if (element === " " || element === ", " || element?.length === 0) {
                        shippingAddressArr.splice(i, 1);
                        i--;
                    }
                }
            }
            setShippingAddress(shippingAddressArr)
            // console.log(shippingAddress)
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
        if (orderInfo.uid === currentUser?.uid) {
            setOrderOwner(true)
        }        
    }
    // console.log(orderInfo)
 },[orderInfo])
 







 

if (loading) {
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
                <h4>Order #{orderInfo?.id}</h4>
                <p>Order date: {orderTime}</p>
                <table>
                    <thead>
                        <tr>
                            <th className='cell-left'>PRODUCT</th>
                            <th className='cell-right'>PRICE</th>
                            <th className='cell-right'>QTY</th>
                            <th className='cell-right'>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        orderInfo?.items.map((item, key)=>{
                            let itemURL = item.id + '-' + item.name.toLowerCase().replace(/[^a-z0-9'""]/g, "-").replace(/['"]/g, "");
                            if (itemURL.endsWith("-")) {
                                itemURL = itemURL.slice(0, -1);
                            };
                            return(
                                <tr className="item-details" key={key}>
                                    <td className='cell-left'><Link to={{ pathname: `/products/${itemURL}` }}>{item.name}</Link></td>
                                    <td className='cell-right'>{accounting.formatMoney(item.price)}</td>
                                    <td className='cell-right'>{item.quantity}</td>
                                    <td className='cell-right'>{accounting.formatMoney(item.totalPrice)}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <div className='order-info-footer'>
                    <div className="shipping-details">
                        <h6>Shipping Address</h6>
                        <ul className='shipping-address'>
                            {
                            shippingAddress?.map((i, k)=>{
                                return <p key={k}>{i}</p>
                            })
                            }
                        </ul>
                    </div>

                    <div className="price-details">
                        {orderInfo?.discount ? (
                            <div className="discounts">
                                <div>Discount</div>
                                <div>({accounting.formatMoney(orderInfo?.discount)})</div>
                            </div>
                        ):(
                            <></>
                        )}
                        <div className="tax">
                            <div>Tax</div>
                            <div>{accounting.formatMoney(orderInfo?.amountTotal/1.1*0.1)}</div>
                        </div>
                        <div className="total-amount">
                            <div>Total</div>
                            <div>{accounting.formatMoney(orderInfo?.amountTotal)}</div>
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