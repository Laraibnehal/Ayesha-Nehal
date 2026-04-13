import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.jpg";
import bannerTwo from "../../assets/banner-2.jpg";
import bannerThree from "../../assets/banner-3.jpg";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDailog from "../../components/shopping-view/product-details";
import { getFeatureImages } from "../../store/common-slice/index.js";
import { fetchAllProducts } from "@/store/admin/products-slice";

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const {productList, productDetails} = useSelector((state )=>state.shopProducts)
   const [openDetailsDailog, setOpenDetailsDailog] = useState(false)
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const toast = useToast();
  // const navigate = useNavigate(); // its for category
  const slides = [bannerOne, bannerTwo, bannerThree]
  useEffect(()=>{
  if(productDetails !== null) setOpenDetailsDailog(true)
  },[productDetails])
  useEffect(()=>{
const timer = setInterval(()=>{
setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)  
}, 4000)
return () => clearInterval(timer)
  },[])
  useEffect(()=>{
    dispatch(fetchAllFilteredProducts({
      filterParams : {}, sortParams:'price-lowtohigh'
    }))
  }, [dispatch])

function handleGetProductDetails(getCurrentProductId){          dispatch(fetchProductDetails(getCurrentProductId))
          }
   function handleAddtoCart(getCurrentProductId){
                      dispatch(
                          addToCart({
                            userId: user?.id,
                            productId: getCurrentProductId,
                            quantity: 1,
                          })
                          ).then((data) => {
                              if(data?.payload?.success){
                                  dispatch(fetchCartItems(user?.id))
                                  toast({
                                      title: 'Product Added to Cart',
                                  })
                              }
                          })
                             
                              
                          }
  // console.log("productlist", productList)
return(
<div className="flex flex-col min-h-screen">
  <div className="relative w-full h-[600px] overflow-hidden">
    {
      slides.map((slide, index) => <img src={slide}
key={index}
className={`${index === currentSlide ? "opacity-100" : "opacity-0" } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 `}
      />)
    }
    <Button
          variant="outline"
          size="icon"
          onClick={()=> setCurrentSlide((prevSlide)=> (prevSlide - 1 + slides.length) % slides.length)}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
           onClick={()=> setCurrentSlide((prevSlide)=> (prevSlide + 1) % slides.length)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
  </div>
             <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section> 
      <ProductDetailsDailog open={openDetailsDailog} 
setOpen={setOpenDetailsDailog} 
productDetails={productDetails}
 />
</div>
)
}
export default ShoppingHome;