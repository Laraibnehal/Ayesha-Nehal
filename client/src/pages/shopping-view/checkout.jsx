import img from '../../assets/account.jpg'
import Address from '@/components/shopping-view/address'
import { Button } from '@/components/ui/button';
import UserCartItemsContent from '@/components/shopping-view/cart-items-content';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { createNewOrder, capturePayment } from '@/store/shop/order-slice'; // ✅ import capturePayment
import { useToast } from '@/hooks/use-toast';// ✅ for user feedback
import { clearCart } from "@/store/shop/cart-slice"; // ✅ import clearCart action
import { resetOrder } from '@/store/shop/order-slice';
function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { orderId, razorpayOrderId, amount, currency, isLoading } = useSelector((state) => state.shopOrder); // ✅ pull from redux
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiateRazorPayPayment() {
    // ✅ Guard: address must be selected
    if (!currentSelectedAddress) {
      toast({ title: "Please select a delivery address", variant: "destructive" });
      return;
    }

    // ✅ Guard: cart must not be empty
    if (!cartItems?.items?.length) {
      toast({ title: "Your cart is empty", variant: "destructive" });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        state: currentSelectedAddress?.state,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: 'Pending',
      paymentMethod: 'RazorPay',
      paymentStatus: 'Pending',
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      totalAmount: totalCartAmount,
      paymentId: '',
      payerId: '',
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        // ✅ Open Razorpay checkout popup after order is created
        openRazorpayPopup(data.payload);
      } else {
        toast({ title: "Failed to create order. Try again.", variant: "destructive" });
      }
    });
  }

  function openRazorpayPopup({ razorpayOrderId, amount, currency, orderId }) {
      // const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
// console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);
  // ✅ catch missing key early
  // if (!key) {
  //   toast({ title: "Razorpay key is missing. Check your .env file.", variant: "destructive" });
  //   return;
  // }
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // ✅ add to your .env file
      amount: amount,       // in paise, already set by backend
      currency: currency,
      order_id: razorpayOrderId,
      name: "Ayesha Nehal", // ✅ your business name
      description: "Order Payment",
      prefill: {
        name: user?.userName,
        email: user?.email,
      },
      theme: {
        color: "#6c6e5c", // ✅ change to your brand colour
      },
      handler: function (response) {
        // ✅ Called on successful payment — verify on backend

        dispatch(
          capturePayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: orderId,
          })
        ).then((res) => {
           console.log("Full capture result:", res);           // ✅ add this
    console.log("Success flag:", res?.payload?.success); // ✅ add this
    console.log("Payload:", res?.payload);   
          if (res?.payload?.success) {
             dispatch(clearCart());        // ✅ clear cart in redux
      dispatch(resetOrder());  // clear order state in redux
            toast({ title: "Payment successful! Order placed." });
             setTimeout(() => {
        window.location.href = "/shop/payment-success"; // ✅ slight delay so toast shows
      }, 1500);
            // ✅ Redirect or clear cart here
          } else {
            toast({ title: "Payment verification failed.", variant: "destructive" });
          }
        });
      },
      modal: {
        ondismiss: function () {
          // ✅ User closed the popup without paying
          toast({ title: "Payment cancelled.", variant: "destructive" });
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img src={img} className='h-full w-full object-cover object-center' />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 mt-5'>
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress}
          currentSelectedAddress={currentSelectedAddress}  />

        <div className='flex flex-col gap-4'>
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent key={item.productId} cartItem={item} /> // ✅ added key prop
              ))
            : null}

          <div className='mt-8 space-y-4'>
            <div className='flex justify-between'>
              <span className='font-bold'>Total</span>
              <span className='font-bold'>Rs. {totalCartAmount}</span>
            </div>
          </div>

          <div>
            <Button
              onClick={handleInitiateRazorPayPayment}
              className="w-full mt-5"
              disabled={isLoading} // ✅ prevent double clicks
            >
              {isLoading ? "Processing..." : "Checkout With RazorPay"} {/* ✅ loading state */}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;