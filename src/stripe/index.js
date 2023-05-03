import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51N2Y2GHlpGuoLlemWw29wAtlRTeZuPnUkGMrKaE0g4nv2KiPXEKlawXX66VMqkUtkrXfSL9OjwLcnjowTf6MR2Fc00XotxTwKe');

export default function App() {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: 'whsec_OVRP80m1KxaMIjHRE023HxJ5qjQ79h2g',
      };
    
  
    return (
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    );
  };