import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import useInfo from "../../../Components/Hooks/useInfo";
import AUthContext from "../../../Context/AUthContext";

const CheckOutForm = () => {
    const { id } = useParams();
    const [error,setError]=useState('');
    const [clientSecret,setClientSecret]=useState('');
    const [transactionId,setTransactionId]=useState('');
    const stripe=useStripe();
    const elements=useElements();
    const axiosSecure=useAxiosSecure();
    const location = useLocation();
    const navigate=useNavigate();
    const {user}=useContext(AUthContext);
    const [bookings,refetch]=useInfo();
    const selectedBooking = bookings.find((item) => item._id === id);
    const totalPrice = selectedBooking?.price || 0

    useEffect(()=>{
        if(totalPrice>0){
            axiosSecure.post('/create-payment-intent',{price: totalPrice})
        .then(res=>{
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
        }
    },[axiosSecure,totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!stripe || !elements){
            return
        }
        const card=elements.getElement(CardElement)

        if(card==null){
         return
        }
     
        const {error,paymentMethod}= await stripe.createPaymentMethod({
            type:'card',
            card
        })

        if(error){
            console.log('Payment error',error)
            setError(error.message)
        }
        else{
            console.log('Payment method',paymentMethod)
            setError('')
        }

        // confirm payment
        const {paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card: card,
                billing_details:{
                     email:user?.email || 'anonymous',
                     name:user?.displayName || 'anonymous'
                }
            }
        })

           if(confirmError){
            console.log('Confirm error')
           }
           else{
            console.log('payment intent',paymentIntent)
            if(paymentIntent.status='succeeded'){
                console.log('transaction id',paymentIntent.id)
                setTransactionId(paymentIntent.id);

                // Save the payment in the database
                const payment={
                    email:user.email,
                    price:totalPrice,
                    transactionId:paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js
                    packageId:id,
                    //menuItemIds:cart.map(item=>item.menuId),
                    status:'in review'
                }

                const res= await axiosSecure.post('/payments',payment);
                console.log('payment saved',res);

                refetch()
                if(res.data?.paymentResult?.insertedId){
                    await axiosSecure.patch(`/bookings/${id}`, { status: "in review" });
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment successful",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      refetch();

                      const redirectPath =  location.state?.from ||  "/";
                      navigate(redirectPath);
                }
            }
           }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                >

                </CardElement>
                <button className="btn bg-blue-500 my-5" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-500">
                    {error}
                </p>
                {transactionId && <p className="text-green-500">Your transaction id: {transactionId} </p>}
        </form>
    );
};

export default CheckOutForm;