import { useState } from 'react'
import { PayPalButtons } from "@paypal/react-paypal-js";

const PaypalCheckoutButton = (props) => {
    const {products} = props;
    const [payFor, setPayFor] = useState(false)
    const [error, setError] = useState(null)
    const handleApprove = (orderId) => {




        setPayFor(true);
    }
    if (payFor) {
        alert('Thank you for purchase')
    }
    if (error) {
        alert(error)
    }
     
    return (
        <PayPalButtons
        createOrder={(data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        description: 'test',
                        amount: {
                            value: 100
                        }
                    }
                ]  
            })
        }}
        onApprove={async(data, actions) => {
            const order = await actions.order.capture();
            console.log("order", order)

            handleApprove(data.orderId);
        }}
        onCancel={() => {
            alert('cancel')
        }}
        onError={(err) => {
            setError(err);
            console.error("Paypal Checkout onError", err)
        }}
         />
    )
}
export default PaypalCheckoutButton;