import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isSelected = selectedId?._id === addressInfo?._id; // ✅ check if this card is selected

  return (
    <Card
     onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null      
}  
  className={`cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-2 border-black shadow-md"   // ✅ selected style
          : "border border-gray-200 hover:border-gray-400" // ✅ default style
      }`}
      >
     
   <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>State: {addressInfo?.state}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className=" p-3 flex justify-between">
      <Button onClick={()=> handleEditAddress(addressInfo)}>Edit</Button>
  <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
  </Card>
  )
}

export default AddressCard