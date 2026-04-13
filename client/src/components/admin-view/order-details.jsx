import { Dialog , DialogContent} from '../ui/dialog'
import React from 'react'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import CommonForm from '../common/form'
import { useState } from 'react'

const initialFormData = {
  status: "",
};
function AdminOrdersDetailsView() {
  const [formData, setFormData] = useState(initialFormData);// The status of the order
function handleUpdateStatus(event) {
event.preventDefault();

}
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
<div>
    <CommonForm
        formControls={ [
                {
                         
        label: "Order Status",
        name: "status",
        componentType: "select",
        options: [
          { id: "pending", label: "Pending" },
          { id: "inProcess", label: "In Process" },
            { id: "inShipping", label: "Shipped" },
            { id: "delivered", label: "Delivered" },
            { id: "rejected", label: "Cancelled" },
        ],
      },
          ]}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleUpdateStatus}
        buttonText="Update Status"

    />
</div>
</div>
   </DialogContent>
  )
}

export default AdminOrdersDetailsView