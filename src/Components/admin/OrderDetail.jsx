import { useContext } from 'react';
import './Detail.css'
import MyContext from '../../context/myContext';

const OrderDetail = () => {
    const context = useContext(MyContext)
    const { getAllOrder ,deleteOrder} = context
    let serialNumber = 1;
    return (
        <div>
            <div>
                <div className="py-5">
                    {/* text  */}
                    <h1 className="detail-heading">All Order</h1>
                </div>

                {/* table  */}
                <div className="detail-table">
                    <table className="detail-table-container">
                        <tbody>
                            <tr>
                                <th scope="col" className="S-No-th">S.No.</th>
                                <th scope="col" className="th">Order Id</th>
                                <th scope="col" className="th">Image</th>
                                <th scope="col" className="th">Title</th>
                                <th scope="col" className="th">Category</th>
                                <th scope="col" className="th">Price</th>
                                <th scope="col" className="th">Quantity</th>
                                <th scope="col" className="th">Total Price</th>
                                <th scope="col" className="th">Status</th>
                                <th scope="col" className="th">Name</th>
                                <th scope="col" className="th">Address</th>
                                <th scope="col" className="th">Pincode</th>
                                <th scope="col" className="th">Phone Number</th>
                                <th scope="col" className="th">Email</th>
                                <th scope="col" className="th">Date</th>
                                <th scope="col" className="th">Action</th>
                            </tr>
                            {getAllOrder.map((order) => {
                                return order.cartItems.map((item, index) => {
                                    const { id, productImageUrl, title, category, price, quantity } = item;
                                    return (
                                        <tr key={index}>
                                            <td>{serialNumber++}</td>
                                            <td className="first-letter:uppercase">{id}</td>
                                            <td><img src={productImageUrl} alt='' /></td>
                                            <td>{title}</td>
                                            <td>{category}</td>
                                            <td>{price}</td>
                                            <td>{quantity}</td>
                                            <td>₹{price * quantity}</td>
                                            <td>{order.status}</td>
                                            <td>{order.addressInfo.name}</td>
                                            <td>{order.addressInfo.address}</td>
                                            <td>{order.addressInfo.pincode}</td>
                                            <td>{order.addressInfo.mobileNumber}</td>
                                            <td>{order.email}</td>
                                            <td>{order.date}</td>
                                            <td onClick={()=> deleteOrder(order.id)} className="text-red-500 cursor-pointer">Delete</td>
                                        </tr>
                                    );
                                });
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
