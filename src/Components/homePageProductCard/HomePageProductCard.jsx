import React, { useContext, useEffect } from 'react'
import './HomePageProductCard.css'
import { useNavigate } from 'react-router-dom'
import MyContext from '../../context/myContext'
import Loader from '../loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/cartSlice'
import toast from 'react-hot-toast'
const HomePageProductCard = () => {
    const context = useContext(MyContext)
    const {getAllProduct,loading}=context

    //Navigate
    const navigate = useNavigate()

    //useSelector
    const cartItems = useSelector((state)=>state.cart)
    //useDispatch
    const dispatch = useDispatch()

    //addCart function
    const addCart =(item)=>{
         dispatch(addToCart(item))
         toast.success("Added to Cart")
    }
    // deleteCart function
    const deleteCart =(item)=>{
       dispatch(deleteFromCart(item))
       toast.success("Delete Cart")
    }

    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cartItems))
    },[cartItems])

  return (
    <div className='productCard-container'>
        <div>
           <h1 className='productCard-main-heading'>Bestselling Products</h1>
        </div>
        {loading ? <>
            <div className='flex justify-center'>
       <Loader/>
       </div>
        </>:
        <section className='section'>
        <div className='productCard-main'>
            <div className='productCard-main2'>
                {
                    getAllProduct.slice(0,8).map((item,index)=>{
                        const {id,title,price,productImageUrl}=item
                        return(
                            <div key={index} className='ProductCard'>
                                <div className='ProductCard-card'>
                                    <img src={productImageUrl} onClick={()=>{navigate(`/productinfo/${id}`)}}/>
                                    <div className='ProductCard-card-content'>
                                        <h2 className='E-Commerce'>
                                            E-Commerce
                                        </h2>
                                        <h1 className='ProductCard-title'>
                                            {title.substring(0,25)}
                                        </h1>
                                        <h1 className='ProductCard-price'>
                                        ₹{price}
                                        </h1>
                                        <div>
                                            {cartItems.some((p)=>p.id === item.id)?
                                            <div className='ProductCard-delete-btn' onClick={()=>{deleteCart(item)}}>
                                            <button>Delete From Cart</button>
                                           </div>
                                           :
                                           <div className='ProductCard-btn' onClick={()=>{addCart(item)}}>
                                           <button>Add To Cart</button>
                                          </div> 
                                        }
                                       
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
    }
        
    </div>
  )
}

export default HomePageProductCard