import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../Components/Layout/Layout'
import MyContext from '../../context/myContext'
import { useNavigate } from 'react-router-dom'
import Loader from '../../Components/loader/Loader'
import toast from 'react-hot-toast'
import { addToCart, deleteFromCart } from '../../redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
const CategoryPage = () => {
    const { categoryname } = useParams()
    const context = useContext(MyContext)
    const { loading, getAllProduct } = context
    const navigate = useNavigate()


    const filterProduct = getAllProduct.filter(obj => obj.category.includes(categoryname))

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

    return (
        <Layout>
            <div className='productCard-container'>
                <div>
                    <h1 className='productCard-main-heading'>{categoryname}</h1>
                </div>
                {loading ? <>
                    <div className='flex justify-center'>
                        <Loader />
                    </div>

                </>
                    :
                    <section className='section'>
                        <div className='productCard-main'>
                            <div className='productCard-main2'>
                                {
                                    filterProduct.length > 0 ?
                                        <>
                                            {filterProduct.map((item, index) => {
                                                const { id, title, price, productImageUrl } = item
                                                return (
                                                    <div key={index} className='ProductCard'>
                                                        <div className='ProductCard-card'>
                                                            <img src={productImageUrl} onClick={() => { navigate(`/productinfo/${id}`) }} />
                                                            <div className='ProductCard-card-content'>
                                                                <h2 className='E-Commerce'>
                                                                    E-Commerce
                                                                </h2>
                                                                <h1 className='ProductCard-title'>
                                                                    {title.substring(0, 25)}
                                                                </h1>
                                                                <h1 className='ProductCard-price'>
                                                                    ₹{price}
                                                                </h1>
                                                                <div>
                                                                    {cartItems.some((p) => p.id === item.id) ?
                                                                        <div className='ProductCard-delete-btn' onClick={() => { deleteCart(item) }}>
                                                                            <button>Delete From Cart</button>
                                                                        </div>
                                                                        :
                                                                        <div className='ProductCard-btn' onClick={() => { addCart(item) }}>
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
                                        </>
                                        :

                                        <div className='my-0 mx-auto'>
                                            <div className="flex justify-center">
                                                <img className=" mb-2" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="" />
                                            </div>
                                            <h1 className=" text-black text-xl">No {categoryname} product found</h1>
                                        </div>

                                }
                            </div>
                        </div>
                    </section>
                }
            </div>
        </Layout>
    )
}

export default CategoryPage