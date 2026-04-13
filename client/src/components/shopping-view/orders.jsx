import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import ShoppingOrderDetailsView from './order-details'
import { useState } from 'react'
function ShoppingOrders() {

  const [openDetailsDailog, setOpenDetailsDailog] = useState(false)


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
        <TableRow>
          <TableCell>ORD-001</TableCell>
          <TableCell>2023-10-01</TableCell>
          <TableCell>Shipped</TableCell>
          <TableCell>Rs. 1500</TableCell>
          <TableCell>
            <Dialog open={openDetailsDailog} onOpenChange={(setOpenDetailsDailog)}  >
              <Button onClick={() => setOpenDetailsDailog(true)}>View Details</Button>
              <ShoppingOrderDetailsView />

              </Dialog>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </CardContent>
   </Card>
  )
}

export default ShoppingOrders