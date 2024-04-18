import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignUp.css'
import MyContext from '../../context/myContext'
import toast from 'react-hot-toast'
import { auth, fireDB } from '../../firebase/FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import Loader from '../../Components/loader/Loader'
const SignUp = () => {
    const context = useContext(MyContext)
    const {loading,setLoading}= context

    //navigate
    const navigate = useNavigate()
    //user signup state
    const [userSignup,setUserSignup]=useState({
        name:"",
        email:"",
        password:"",
        role:"user"
    })


    /************************** User SignUp Function *************************/

    const userSignupFunction = async()=>{
        //validation
         if(userSignup.name ==="" || userSignup.email ===""||userSignup.password===""){
            toast.error("All Fields are required")
         }
         setLoading(true)
         try {
            const users = await createUserWithEmailAndPassword(auth,userSignup.email,userSignup.password)

            //create user Object
            const user = {
                name:userSignup.name,
                email:users.user.email,
                uid:users.user.uid,
                role:userSignup.role,
                time:Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month:"short",
                        day:"2-digit",
                        year:"numeric"
                    }
                )
            }

            // Create User Refrence
            const userRefrence = collection(fireDB,"user")
            //Add User Details
           await addDoc(userRefrence,user)
            setUserSignup({
                name:"",
                email:"",
                password:""
            })
            toast.success("SignUp Successfully")
            setLoading(false)
            navigate('/login')
         } catch (error) {
            console.log(error)
            setLoading(false)
         }
    }
  return (
    <div className='signup-container'>
        {loading && <Loader/>}
            {/* Login Form  */}
            <div className="signup-form-container">

                {/* Top Heading  */}
                <div className="signup-top-heading">
                    <h2>
                        Signup
                    </h2>
                </div>

                {/* Input One  */}
                <div className="signup-input-container">
                    <input
                        type="text"
                        placeholder='Full Name'
                        value={userSignup.name}
                        onChange={(e)=>{setUserSignup({
                            ...userSignup,
                            name:e.target.value
                        })}}
                        className='signup-input'
                    />
                </div>

                {/* Input Two  */}
                <div className="signup-input-container">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userSignup.email}
                        onChange={(e)=>{setUserSignup({
                            ...userSignup,
                            email:e.target.value
                        })}}
                        className='signup-input'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userSignup.password}
                        onChange={(e)=>{setUserSignup({
                            ...userSignup,
                            password:e.target.value
                        })}}
                        className='signup-input'
                    />
                </div>

                {/* Signup Button  */}
                <div className="signup-btn">
                    <button type='button' onClick={userSignupFunction}>
                        Signup
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Have an account <Link className='login-link' to={'/login'}>Login</Link></h2>
                </div>

            </div>
        </div>
  )
}

export default SignUp