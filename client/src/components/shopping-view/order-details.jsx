import React from 'react'
import { Label } from '../ui/label'
import { Dialog , DialogContent} from '../ui/dialog'
import { Separator } from '../ui/separator'
function ShoppingOrderDetailsView() {
  return (
   <DialogContent className="w-[600px] sm:max">
<div className='gap-6 grid'>
    <div className='grid gap-2'>
        <div className='flex mt-6 item-center justify-between'>
            <p className='font-medium'>Order Id</p>
            <Label>123456</Label>
        </div>
        <div className='flex mt-2 item-center justify-between'>
            <p className='font-medium'>Order Date</p>
            <Label>12/5/2022</Label>
        </div>
        <div className='flex mt-2 item-center justify-between'>
            <p className='font-medium'>Order Status</p>
            <Label>In process</Label>
        </div>
        <div className='flex mt-2 item-center justify-between'>
            <p className='font-medium'>Order Price</p>
            <Label>Rs. 4000</Label>
        </div>
    </div>
    <Separator />
    <div className='grid gap-4'>
    <div className='grid gap-2'>
<div className='font-meduim'>Order Details</div>
<ul className='grid gap-3'>
    <li className='flex items-center justify-between'>
        <span>Product One</span>
        <span>Rs. 3000</span>
    </li>
</ul>
    </div>
    </div>
    <div className='grid gap-4'>
        <div className='grid gap-2'>
            <div className='font-medium'>Shipping Address</div>
            <div className='grid gap-0.5 text-muted-foreground'>
                <span>Laraib</span>
                <span>City</span>
                <span>State</span>
                <span>Pin code</span>
                <span>Phone number</span>
                <span>Notes</span>
        </div>
    </div>
</div>
</div>
   </DialogContent>
  )
}

export default ShoppingOrderDetailsView