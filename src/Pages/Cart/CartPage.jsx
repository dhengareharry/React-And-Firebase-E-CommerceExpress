import { Trash } from 'lucide-react'
import Layout from '../../Components/Layout/Layout';
import './CartPage.css'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { decrementQuantity, deleteFromCart, incrementQuantity } from '../../redux/cartSlice';
import { useEffect, useState } from 'react';
import BuyNowModal from '../../Components/buyNowModal/BuyNowModal';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { Navigate } from 'react-router-dom';





const CartPage = () => {
    const cartItems = useSelector((state)=>state.cart)
    const dispatch = useDispatch()

     // deleteCart function
     const deleteCart = (item) => {
        dispatch(deleteFromCart(item))
        toast.success("Delete Cart")
    }

    //Increment Quantity function
    const handleIncrement=(id)=>{
        dispatch(incrementQuantity(id))
    }

     //Decrement Quantity function
     const handleDecrement=(id)=>{
        dispatch(decrementQuantity(id))
    }

    const cartItemTotal = cartItems.map(item =>item.quantity).reduce((prevValue,currValue)=>prevValue+currValue,0)
    const cartTotal = cartItems.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    /**=====================================================================================================
                        Buy Now Function
     ========================================================================================================*/

     //user
     const user = JSON.parse(localStorage.getItem('user'))

     const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const buyNowFunction = ()=>{
          // validation 
          if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
            return toast.error("All Fields are required")
        }

        //order Info
        const orderInfo={
            cartItems,
            addressInfo,
            email:user.email,
            userid:user.uid,
            status:'Confirmed',
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }

        try {
            const orderRef = collection(fireDB,'order')
            addDoc(orderRef,orderInfo)
            setAddressInfo({
                name: "",
                address: "",
                pincode: "",
                mobileNumber: "",
            })
            toast.success("Order Placed Successfull")
        } catch (error) {
            console.log(error)
        }

    }

    
    return (
        <Layout>
            <div className="cartpage-container">
                <div className="cartpage-container2">
                    <h1 className="cartpage-heading">
                        Shopping Cart
                    </h1>
                    <form className="cartpage-form">
                        <section aria-labelledby="cart-heading" className="cartpage-section1">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>
                            <ul role="list" className="cartpage-ul">
                             {cartItems.length > 0 ?
                            <>
                            {cartItems.map((item,index)=>{
                                const {id,title,price,productImageUrl,quantity,category}=item
                                return(
                                    <div key={index} className="">
                                        <li>
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={productImageUrl}
                                                    alt="img"
                                                    className="cartpage-li-img"
                                                />
                                            </div>

                                            <div className="cartpage-li-Detail-container">
                                                <div className="cartpage-li-Deatil-content">
                                                    <div>
                                                        <div className="cartpage-li-Detail-name">
                                                            <h3 className="text-sm">
                                                                <div className="font-semibold text-black">
                                                                    {title}
                                                                </div>
                                                            </h3>
                                                        </div>
                                                        <div className="mt-1 flex text-sm">
                                                            <p className="cartpage-li-color">{category}</p>
                                                        </div>
                                                        <div className="cartpage-li-price">
                                                           
                                                            <p className="cartpage-li-currentPrice">
                                                            ₹{price}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <div className="mb-2 flex">
                                            <div className="min-w-24 flex">
                                                <button type="button" className="h-7 w-7" onClick={()=>{handleDecrement(id)}}>
                                                    -
                                                </button>
                                                <input
                                                    type="text"
                                                    className="mx-1 h-7 w-9 rounded-md border text-center"
                                                    value={quantity}
                                                />
                                                <button type="button" className="flex h-7 w-7 items-center justify-center" onClick={()=>{handleIncrement(id)}}>
                                                    +
                                                </button>
                                            </div>
                                            <div className="ml-6 flex text-sm">
                                                <button type="button" className="flex items-center space-x-1 px-2 py-1 pl-0" onClick={()=>{deleteCart(item)}}>
                                                    <Trash size={12} className="text-red-500" />
                                                    <span className="text-xs font-medium text-red-500">Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            </> 
                            :
                            <h1>Not Found</h1>
                            }
                            </ul>
                        </section>
                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
                        >
                            <h2
                                id="summary-heading"
                                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                            >
                                Price Details
                            </h2>
                            <div>
                                <dl className=" space-y-1 px-2 py-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-800">Price ({cartItemTotal})</dt>
                                        <dd className="text-sm font-medium text-gray-900">₹ {cartTotal}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="flex text-sm text-gray-800">
                                            <span>Delivery Charges</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">Free</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                                        <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                        <dd className="text-base font-medium text-gray-900">₹ {cartTotal}</dd>
                                    </div>
                                </dl>
                                <div className="px-2 pb-4 font-medium text-green-700">
                                <div className="flex gap-4 mb-6">
                                 {user ?
                                 <BuyNowModal
                                 addressInfo={addressInfo}
                                 setAddressInfo={setAddressInfo}
                                 buyNowFunction={buyNowFunction}
                                 />:
                                 <Navigate to={'/login'}/> 
                                }
                                </div>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;