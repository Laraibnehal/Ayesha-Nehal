import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import ShoppingOrderDetailsView from './order-details'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllOrdersByUserId,
  getOrderDetails,
  resetOrder

 } from '@/store/shop/order-slice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Badge } from '../ui/badge';

function ShoppingOrders() {

  const [openDetailsDailog, setOpenDetailsDialog] = useState(false)

const dispatch = useDispatch();
const {user }= useSelector((state) => state.auth);
const {orderList, orderDetails}= useSelector((state) => state.shopOrder);
  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  console.log(orderDetails, "orderDetails"); // ✅ log orders to verify data
  return (
 <Card>
  <CardHeader>
    <CardTitle>Order History</CardTitle>
  </CardHeader>
  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>    
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>
            <span className='sr-only'>Details</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {
        orderList && orderList.length > 0 ? 
        orderList.map((orderItem) =>(
          <TableRow key={orderItem._id}>
          <TableCell>{orderItem._id}</TableCell>
          <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
          <TableCell>
           <Badge
                                  className={`py-1 px-3 ${
                                    orderItem?.orderStatus === "confirmed"
                                      ? "bg-green-500"
                                      : orderItem?.orderStatus === "rejected"
                                      ? "bg-red-600"
                                      : "bg-black"
                                  }`}
                                >
                                  {orderItem?.orderStatus}
                                </Badge>
          </TableCell>
          <TableCell>Rs.{orderItem?.totalAmount}</TableCell>
          <TableCell>
            <Dialog open={openDetailsDailog} onOpenChange={()=>{
              setOpenDetailsDialog(false);
              dispatch(resetOrder());
            }
              }  >
              <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>View Details</Button>
              <ShoppingOrderDetailsView orderDetails={orderDetails} /> {/* ✅ pass order details as prop */}
              </Dialog>
          </TableCell>
        </TableRow>
         ))
        :null
      }
      </TableBody>
    </Table>
  </CardContent>
   </Card>
  )
}

export default ShoppingOrders