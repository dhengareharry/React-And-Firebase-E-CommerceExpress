import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddProductPage.css'
import MyContext from '../../context/myContext'
import toast from 'react-hot-toast'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { fireDB } from '../../firebase/FirebaseConfig'
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
const AddProductPage = () => {
  const context = useContext(MyContext)
  const { loading, setLoading } = context

  //Navigate
  const navigate = useNavigate()

  //AddProduct State
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
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

  /******************************** AddProduct Function ***********************************/

  const addProductFunction = async () => {
    //validation
    if (product.title == "" || product.price == "" || product.productImageUrl == "" || product.category == "" || product.description == "") {
      return toast.error("all fields are required")
    }
    setLoading(true)
    try {
      const productRef = collection(fireDB, 'products')
      await addDoc(productRef, product)
      toast.success("Add Product Successfully")
      navigate('/admin-dashboard')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("Add Product Failed")
    }
  }
  return (
    <div>
      <div className='AddProduct-container'>
        {loading && <Loader />}
        {/* Login Form  */}
        <div className="AddProduct-login-form-container">

          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className='AddProduct-page-heading'>
              Add Product
            </h2>
          </div>

          {/* Input One  */}
          <div className="mb-3">
            <input
              type="text"
              name="title"
              placeholder='Product Title'
              value={product.title}
              onChange={(e) => {
                setProduct({
                  ...product,
                  title: e.target.value
                })
              }}
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
              type='button'
              onClick={addProductFunction}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;