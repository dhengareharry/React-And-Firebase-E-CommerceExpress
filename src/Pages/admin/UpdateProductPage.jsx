import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../../context/myContext'
import {useNavigate,useParams} from 'react-router-dom'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import { fireDB } from '../../firebase/FirebaseConfig'
import toast from 'react-hot-toast'
import Loader from '../../Components/loader/Loader'
const categoryList = [
  {
      name: 'fashion'
  },
  {
      name: 'shirt'
  },
  {
      name: 'jacket'
  },
  {
      name: 'mobile'
  },
  {
      name: 'laptop'
  },
  {
      name: 'shoes'
  },
  {
      name: 'home'
  },
  {
      name: 'books'
  }
]
const UpdateProductPage = () => {
  const context = useContext(MyContext)
  const {loading,setLoading,getAllProductFunction}=context

//Navigate
const navigate = useNavigate()
const {id} = useParams()
console.log(id)
//Product State
const [product, setProduct] = useState({
  title: "",
  price: "",
  productImageUrl: "",
  category: "",
  description: "",
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

/************************************** Get Single Product Function **********************************/
const getSingleProductFunction =async()=>{
  setLoading(true)
  try {
    const productTemp = await getDoc(doc(fireDB,'products',id))
    const product = productTemp.data()
    setProduct({
      title: product?.title,
      price: product?.price,
      productImageUrl: product?.productImageUrl,
      category: product?.category,
      description: product?.description,
      quantity : product?.quantity,
      time: product?.time,
      date: product?.date
  })
  setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}


/************************************ Update Product Function ********************************/
const updateProduct = async()=>{
  setLoading(true)
  try {
    await setDoc(doc(fireDB,"products",id),product)
    toast.success("Product Update Successfully")
    getAllProductFunction()
    setLoading(false)
    navigate('/admin-dashboard')
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}

useEffect(()=>{
  getSingleProductFunction()
},[])

  return (
    <div>
    <div className='AddProduct-container'>
    {loading && <Loader />}
      {/* Login Form  */}
      <div className="AddProduct-login-form-container">

        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className='AddProduct-page-heading'>
            Update Product
          </h2>
        </div>

        {/* Input One  */}
        <div className="mb-3">
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={(e) => {
                setProduct({
                    ...product,
                    title: e.target.value
                })
            }}
            placeholder='Product Title'
            className='AddProduct-page-input'
          />
        </div>

        {/* Input Two  */}
        <div className="mb-3">
          <input
            type="number"
            placeholder='Product Price'
            value={product.price}
            onChange={(e) => {
                setProduct({
                    ...product,
                    price: e.target.value
                })
            }}
            className='AddProduct-page-input'
          />
        </div>

        {/* Input Three  */}
        <div className="mb-3">
          <input
            type="text"
            placeholder='Product Image Url'
            value={product.productImageUrl}
            onChange={(e) => {
                setProduct({
                    ...product,
                    productImageUrl: e.target.value
                })
            }}
            className='AddProduct-page-input'
          />
        </div>

        {/* Input Four  */}
        <div className="mb-3">
          <select className="AddProduct-select-container"
            value={product.category}
            onChange={(e) => {
                setProduct({
                    ...product,
                    category: e.target.value
                })
            }}
          >
            <option disabled>Select Product Category</option>
            {categoryList.map((value, index) => {
              const { name } = value
              return (
                <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
              )
            })}
          </select>
        </div>

        {/* Input Five  */}
        <div className="mb-3">
          <textarea name="description" placeholder="Product Description" rows="5" className="AddProduct-description"
             value={product.description}
             onChange={(e) => {
                 setProduct({
                     ...product,
                     description: e.target.value
                 })
             }}
          >

          </textarea>
        </div>

        {/* Add Product Button  */}
        <div className="mb-3 AddProduct-btn">
          <button
          onClick={updateProduct}
            type='button'
          >
           Update Product
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UpdateProductPage