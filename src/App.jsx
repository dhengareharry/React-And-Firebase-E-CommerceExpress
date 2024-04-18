import React from 'react'
import { BrowserRouter as Router , Routes,Route } from 'react-router-dom'
import Home from './Pages/home/Home'
import NoPage from './Pages/noPage/NoPage'
import ProductInfo from './Pages/productInfo/ProductInfo'
import ScrollTop from './Components/scrollTop/ScrollTop'
import CartPage from './Pages/Cart/CartPage'
import AllProduct from './Pages/allProducts/AllProduct'
import SignUp from './Pages/registration/SignUp'
import Login from './Pages/registration/Login'
import UserDashboard from './Pages/user/UserDashboard'
import AdminDashboard from './Pages/admin/AdminDashboard'
import AddProductPage from './Pages/admin/AddProductPage'
import UpdateProductPage from './Pages/admin/UpdateProductPage'
import MyState from './context/myState'
import { Toaster } from 'react-hot-toast'
import ProtectedRouteForUser from './protectedRoute/ProtectedRouteForUser'
import ProtectedRouteForAdmin from './protectedRoute/ProtectedRouteForAdmin'
import CategoryPage from './Pages/category/CategoryPage'

const App = () => {
  return (
    <MyState>
      <Router>
        <ScrollTop/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/*' element={<NoPage/>}/>
          <Route path='/productinfo/:id' element={<ProductInfo/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/allproduct' element={<AllProduct/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/category/:categoryname' element={<CategoryPage/>}/>
          <Route path='/user-dashboard' element={
            <ProtectedRouteForUser>
              <UserDashboard/>
            </ProtectedRouteForUser>
          }/>
          <Route path='/admin-dashboard' element={
            <ProtectedRouteForAdmin>
              <AdminDashboard/>
            </ProtectedRouteForAdmin>
          }/>
          <Route path='/addproduct' element={
            <ProtectedRouteForAdmin>
              <AddProductPage/>
            </ProtectedRouteForAdmin>
          } />
          <Route path='/updateproduct/:id' element={
            <ProtectedRouteForAdmin>
              <UpdateProductPage/>
            </ProtectedRouteForAdmin>
          } />
        </Routes>
        <Toaster/>
      </Router>
    </MyState>
  )
}

export default App