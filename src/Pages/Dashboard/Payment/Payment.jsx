import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useParams } from "react-router-dom";

const stripePromise=loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    const { id } = useParams();
    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
                  <CheckOutForm id={id}></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;