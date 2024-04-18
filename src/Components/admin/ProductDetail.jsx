import React, { useContext } from "react";
import './Detail.css'
import { Link } from "react-router-dom";
import MyContext from "../../context/myContext";
import Loader from "../loader/Loader";
import {useNavigate} from 'react-router-dom'
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
const ProductDetail = () => {
    const context = useContext(MyContext)
    const { loading,setLoading, getAllProduct ,getAllProductFunction} = context

    //Navigate
    const navigate = useNavigate()

    /************************************** Delete Product Function ************************************/
    const deleteProduct=async(id)=>{
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB,"products",id))
            toast.success('Product Deleted successfully')
            getAllProductFunction()
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className="mb-5">
            <div className="detail-heading-container">
                {/* text  */}
                <h1 className="detail-heading">All Product</h1>
                {/* Add Product Button  */}
                <Link to={'/addproduct'} >
                    <button className="add-product-btn">Add Product</button>
                </Link>
            </div>

            {/* Loading */}
            <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div>
            {/* table  */}
            <div className="detail-table">
                <table className="detail-table-container" >
                    <tbody>
                        <tr>
                            <th scope="col" className="S-No-th">S.No.</th>
                            <th scope="col" className="S-No-th">Image</th>
                            <th scope="col" className="th">Title</th>
                            <th scope="col" className="th">Price</th>
                            <th scope="col" className="th">Category</th>
                            <th scope="col" className="th">Date</th>
                            <th scope="col" className="th">Action</th>
                            <th scope="col" className="th">Action</th>
                        </tr>
                        {getAllProduct.map((item,index)=>{
                            const {id,title,price,category,date,productImageUrl}=item
                            return(
                                <tr className="" key={index}>
                                <td>
                                {index+1}
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                    <img src={productImageUrl} alt="img" className="w-20"/>
                                    </div>
                                </td>
                                <td className="first-letter:uppercase ">
                                    {title}
                                </td>
                                <td className="first-letter:uppercase ">
                                ₹{price}
                                </td>
                                <td className="first-letter:uppercase ">
                                    {category}
                                </td>
                                <td className="first-letter:uppercase ">
                                    {date}
                                </td>
                                <td className="text-green-500 cursor-pointer " onClick={()=>{navigate(`/updateproduct/${id}`)}}>
                                    Edit
                                </td>
                                <td className="text-red-500 cursor-pointer " onClick={()=>{deleteProduct(id)}}>
                                    Delete
                                </td>
                            </tr>
                            )
                        })}
                               
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail;