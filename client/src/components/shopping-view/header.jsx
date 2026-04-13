import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, ShoppingCart, User , LogOut} from 'lucide-react'
import { SheetTrigger, Sheet, SheetContent } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu,
   DropdownMenuLabel, 
   DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/auth-slice'
import UserCartWrapper from './cart-wrapper'
import { fetchCartItems } from '@/store/shop/cart-slice'

function MenuItem() {
 return (

 <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
{
shoppingViewHeaderMenuItems.map((menuItem)=>
( 
   <Link
   className='text-sm font-medium cursor-pointer'
    key={menuItem.id}
    to = {menuItem.path}
    >
  {menuItem.label}
  </Link>
  ))}
 </nav>
 )
}
function HeaderRightContent(){
  const {user} = useSelector((state) => state.auth)
     const {cartItems} = useSelector(state => state.shopCart)
  const [openCartSheet, setOpenCartSheet] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
 function handleLogout(){
dispatch(logoutUser())
  }
  useEffect(()=>{
dispatch(fetchCartItems(user?.id))
  },[dispatch])
  // console.log(cartItems, "lara")
  return(
    <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
    <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
    <Button 
    onClick={()=>setOpenCartSheet(true)} 
    variant= "outline" 
    size= "icon" 
    className= "relative"
    >
<ShoppingCart className="w-6 h-6" />
<span className=" cursor-pointer absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
<span className='sr-only'>User Cart</span>
    </Button>
    <UserCartWrapper 
      setOpenCartSheet={setOpenCartSheet}
    cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : [] }/>
    </Sheet>
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
<Avatar className='bg-black cursor-pointer '>
  <AvatarFallback className='bg-[#6c6e5c] text-white font-extrabold text-xl'>
    {user?.userName[0].toUpperCase()}
  </AvatarFallback>
</Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-56 ">
<DropdownMenuLabel>
  Logged In as {user?.userName}
</DropdownMenuLabel>
<DropdownMenuSeparator />
<DropdownMenuItem onClick={()=>navigate('/shop/account')}>
<User className='mr-2 h-4 w-4'/>
Account
</DropdownMenuItem>
<DropdownMenuSeparator />
<DropdownMenuItem onClick={()=>handleLogout('')}>
<LogOut className='mr-2 h-4 w-4'/>
LogOut
</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}
function ShoppingHeader() {
  const { user} = useSelector((state) => state.auth)
  // console.log(user, "user")
  return (
<header className='sticky top-0 z-40 w-full border-b bg-background'>
<div className='flex h-16 items-center justify-between px-4 md:px-6' >
<Link to= "/shop/home" className='flex items-center gap-2'>
{/* <HousePlug className="h-6 w-6"/> */}
<img  src='/logo.png' className='h-[50px]'/>
<span className='font-bold'>Ayeshaa Nehal</span>
</Link>
<Sheet>
  <SheetTrigger asChild>
    <Button variant = "outline" size="icon" className="lg:hidden" >
    <Menu className='h-6 w-6'/>
      <span className='sr-only'>Toggle Header Menu</span>
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="w-full max-w-xs">
<MenuItem/>
<HeaderRightContent/>
  </SheetContent>
</Sheet>
<div className='hidden lg:block'>
<MenuItem />
</div>
<div className='hidden  lg:block'>
    <HeaderRightContent />
  </div> 
</div>

</header>
  )
}

export default ShoppingHeader