import React, { useContext } from 'react'
import Layout from '../../Components/Layout/Layout'
import './UserDashboard.css'
import MyContext from '../../context/myContext'
import Loader from '../../Components/loader/Loader'
const products = [
    {
        id: 1,
        name: 'Nike Air Force 1 07 LV8',
        imageSrc:
            'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
        href: '#',
        price: '₹61,999',
        color: 'Orange',
        imageAlt: 'Nike Air Force 1 07 LV8',
        quantity: 1,
    },
]
const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const context = useContext(MyContext)
    const {loading,getAllOrder}=context
  return (
    <Layout>
          <div className="userDashboard-container">
                {/* Top  */}
                <div className="top">
                    {/* main  */}
                    <div className="userinfo-main">
                        {/* image  */}
                        <div className="userinfo-img">
                            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
                        </div>
                        {/* text  */}
                        <div className="userinfo-text">
                            <h1><span className=" font-bold">Name :</span> {user?.name}</h1>
                            <h1><span className=" font-bold">Email :</span> {user?.email}</h1>
                            <h1><span className=" font-bold">Date :</span> {user?.date}</h1>
                            <h1><span className=" font-bold">Role :</span> {user?.role}</h1>
                        </div>
                    </div>
                </div>
                {/* bottom  */}
                <div className="bottom">
                    {/* main 1 */}
                    <div className="order-detail-main">
                        {/* text  */}
                        <h2 className="order-detail-text">Order Details</h2>
                        <div className="flex justify-center relative top-10">
                        {loading && <Loader/>}
                        </div>
                        {/* main 2 */}
                        {getAllOrder.filter((obj)=> obj.userid ===user?.uid).map((order,index)=>{
                            return(
                           <div key={index}>
                            {order.cartItems.map((item,index)=>{
                                 const { id, date, quantity, price, title, productImageUrl, category } = item
                                 // console.log('order', order)
                                 const { status } = order
                                return(
                                    <div key={index} className="order-detail-main2">
                                    {/* main 3  */}
                                    <div className="order-detail-main3">
                                        {/* left  */}
                                        <div className="order-detail-left">
                                            <div className="order-detail-left-main">
                                                <div className="mb-4">
                                                    <div className="order-id-name">Order Id</div>
                                                    <div className="order-id">#{id}</div>
                                                </div>
                                                <div className="mb-4">
                                                    <div className="order-date-name">Date</div>
                                                    <div className="order-id">{date}</div>
                                                </div>
                                                <div className="mb-4">
                                                    <div className="order-date-name">Total Amount</div>
                                                    <div className="order-id">₹ {price * quantity}</div>
                                                </div>
                                                <div className="mb-4">
                                                    <div className="order-date-name">Order Status</div>
                                                    <div className="order-status">{status}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* right  */}
                                    <div className="flex-1">
                                        <div className="p-8">
                                            <ul className="order-detail-right-ul">
                                                {products.map((product) => (
                                                    <li
                                                        key={product.id}
                                                        className="order-product-li"
                                                    >
                                                        <div className="order-product-detail">
                                                            <div className="order-product-img">
                                                                <img
                                                                    src={productImageUrl}
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="ml-5 flex flex-col justify-between">
                                                                <div className="flex-1">
                                                                    <p className="order-product-name">{title}</p>
                                                                    <p className="order-product-color">{category}</p>
                                                                </div>
                                                                <p className="order-product-quantity">x {quantity}</p>
                                                            </div>
                                                        </div>
                                                        <div className="order-product-price">
                                                            <p>{price}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
                           </div>
                            )
                        })}
                    </div>
                </div>
            </div>
    </Layout>
  )
}

export default UserDashboard
