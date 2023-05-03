import { PaymentElement, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const PaymentForm = () => {
    const elements = useElements();
    const stripe = useStripe();

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);
        console.log(elements)
    }


    return (
        <form onSubmit={handleSubmit}>
    <CardElement />
        <button>Pay</button>
        </form>
    )
}

export default PaymentForm;