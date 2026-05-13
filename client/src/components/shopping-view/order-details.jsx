
import { Label } from '../ui/label'
import {  DialogContent} from '../ui/dialog'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'
import React from 'react'
function ShoppingOrderDetailsView({orderDetails}) {
    const {user} = useSelector((state) => state.auth);
  return (
   <DialogContent className="w-[600px] sm:max">
<div className='gap-6 grid'>
    <div className='grid gap-2'>
        <div className='flex mt-6 items-center justify-between'>
            <p className='font-medium'>Order Id</p>
            <Label>{orderDetails?._id}</Label>
        </div>
        <div className='flex mt-2 items-center justify-between'>
            <p className='font-medium'>Order Date</p>
            <Label>{orderDetails?.orderDate?.split("T")[0]}</Label>
        </div>
        <div className='flex mt-2 items-center justify-between'>
            <p className='font-medium'>Order Status</p>
            <Label>
                <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
        </div>
        <div className='flex mt-2 items-center justify-between'>
            <p className='font-medium'>Order Price</p>
            <Label>Rs.{orderDetails?.totalAmount}</Label>
        </div>
        <div className='flex mt-2 items-center justify-between'>
            <p className='font-medium'>Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
        </div>
        <div className='flex mt-2 items-center justify-between'>
            <p className='font-medium'>Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
        </div>
    </div>
    <Separator />
    <div className='grid gap-4'>
    <div className='grid gap-2'>
<div className='font-medium'>Order Details</div>
<ul className='grid gap-3'>
{
    orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ?
    orderDetails?.cartItems.map((item) =>(
        <li className='flex items-center justify-between'>
        <span>{item.title}</span>
        <span>Qty: {item.quantity}</span>
        <span>Rs.{item.price}</span>
    </li>    
        ))
:null}

  
</ul>
    </div>
    </div>
    <div className='grid gap-4'>
        <div className='grid gap-2'>
            <div className='font-medium'>Shipping Address</div>
            <div className='grid gap-0.5 text-muted-foreground'>
            <span>{user?.userName}</span>
                <span>{orderDetails?.addressInfo?.address}</span>
                <span>{orderDetails?.addressInfo?.city}</span>
                <span>{orderDetails?.addressInfo?.state}</span>
                <span>{orderDetails?.addressInfo?.pinCode}</span>
                <span>{orderDetails?.addressInfo?.phone}</span>
                <span>{orderDetails?.addressInfo?.notes}</span>
        </div>
    </div>
</div>
</div>
   </DialogContent>
  )
}

export default ShoppingOrderDetailsView