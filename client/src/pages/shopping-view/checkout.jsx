import img from '../../assets/account.jpg'
import Address from '@/components/shopping-view/address'
import { Button } from '@/components/ui/button';
import UserCartItemsContent from '@/components/shopping-view/cart-items-content';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { createNewOrder } from '@/store/shop/order-slice';
function ShoppingCheckout() {
  const {cartItems} = useSelector((state) => state.shopCart);
  const {user} = useSelector((state) => state.auth);
const dispatch = useDispatch();
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  console.log(currentSelectedAddress, 'cartItems')
  // console.log(cartItems, 'cartItems in checkout');

  const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0 ?
  cartItems.items.reduce((sum, currentItem) => sum + 
(currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price  
) * currentItem?.quantity, 0
) : 0

function handleInitiateRazorPayPayment() {
  const orderData = {
     userId: user?.id,
     cartId: cartItems?._id,
          cartItems : cartItems.items.map(singleCartItem =>(  {
            productId: singleCartItem?.productId,
            title: singleCartItem?.title,
            image: singleCartItem?.image,
            price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
            quantity: singleCartItem?.quantity
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
          orderDate : new Date(),
          orderUpdateDate: new Date(),
          totalAmount: totalCartAmount,
          paymentId : '',
          payerId:''
  }
  // console.log(orderData, 'orderData in checkout');
  dispatch(createNewOrder(orderData)).then((data) =>{
    console.log(data, 'order created data');
  });
}



  return (
    <div className='flex flex-col'>
    <div className='relative h-[300px] w-full overflow-hidden'>
<img
src={img}
className='h-full w-full object-cover object-center'
/>
    </div>
<div className='grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 mt-5'>
<Address setCurrentSelectedAddress={setCurrentSelectedAddress}/>
<div className='flex flex-col gap-4'>
 {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
            
  <div className='mt-8 space-y-4'>
    <div className='flex justify-between'>
        <span className='font-bold'>Total</span>
        <span className='font-bold'>Rs. {totalCartAmount}</span>
    </div>
</div>
<div>
<Button onClick= {handleInitiateRazorPayPayment} className="w-full mt-5">
    CheckOut </Button>
</div>
</div>

</div>
</div>
  )
}

export default ShoppingCheckout