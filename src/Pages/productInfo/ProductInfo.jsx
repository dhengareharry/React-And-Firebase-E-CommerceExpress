import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import './ProductInfo.css'
import MyContext from '../../context/myContext'
import { useParams } from "react-router-dom"
import { doc, getDoc } from 'firebase/firestore'
import { fireDB } from '../../firebase/FirebaseConfig'
import Loader from '../../Components/loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/cartSlice'
import toast from 'react-hot-toast'
const ProductInfo = () => {
    const context = useContext(MyContext)
    const { loading, setLoading } = context

    const [product, setProduct] = useState("")
    console.log(product)
    const { id } = useParams()

    //getProductData
    const getProductData = async () => {
        setLoading(true)
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id))
            setProduct({...productTemp.data(),id:productTemp.id})
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

       //useSelector
       const cartItems = useSelector((state) => state.cart)
       //useDispatch
       const dispatch = useDispatch()
   
       //addCart function
       const addCart = (item) => {
           dispatch(addToCart(item))
           toast.success("Added to Cart")
       }
       // deleteCart function
       const deleteCart = (item) => {
           dispatch(deleteFromCart(item))
           toast.success("Delete Cart")
       }
   
       useEffect(() => {
           localStorage.setItem('cart', JSON.stringify(cartItems))
       }, [cartItems])
    useEffect(() => {
        getProductData()
    }, [])

    return (
        <Layout>
            <section className="productinfo-section lg:py-16">
                {loading ?
                    <>
                        <div className="flex justify-center items-center">
                            <Loader />
                        </div>
                    </>
                    :
                    <div className="productinfo-container">
                        <div className="productinfo-content">
                            <div className="productinfo-img-container">
                                <div className="">
                                    <div className="">
                                        <img
                                            className=" w-full lg:h-[39em] rounded-lg"
                                            src={product?.productImageUrl}
                                            alt="img"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="productinfo-info-container">
                                <div className="lg:pl-20">
                                    <div className="mb-6 ">
                                        <h2 className="productinfo-name">
                                            {product?.title}
                                        </h2>
                                        <div className="productinfo-star-container">
                                            <ul className="productinfo-ul">
                                                <li>
                                                    <a href="">
                                                        <img src='https://cdn-icons-png.flaticon.com/128/7507/7507693.png' />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="">
                                                        <img src='https://cdn-icons-png.flaticon.com/128/7507/7507693.png' />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="">
                                                        <img src='https://cdn-icons-png.flaticon.com/128/7507/7507693.png' />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="">
                                                        <img src='https://cdn-icons-png.flaticon.com/128/7507/7507693.png' />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <p className="productinfo-price">
                                            <span>₹ {product?.price}</span>
                                        </p>
                                    </div>
                                    <div className="mb-6">
                                        <h2 className="description">
                                            Description:
                                        </h2>
                                        <p>{product?.description}</p>
                                    </div>
                                    <div className="mb-6 " />
                                   <div>
                                    {cartItems.some((p)=>p.id === product.id)?
                                     <div className='ProductCard-delete-btn' onClick={() => { deleteCart(product) }}>
                                     <button>Delete From Cart</button>
                                 </div>
                                 :
                                 <div className="productinfo-btn-container" onClick={()=>{addCart(product)}}>
                                 <button className='productinfo-btn' >
                                     Add To Cart
                                 </button>
                             </div>
                                    }
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </Layout>
    )
}

export default ProductInfo