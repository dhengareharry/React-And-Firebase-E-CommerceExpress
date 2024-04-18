import { Link } from "react-router-dom";
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from "react";
import MyContext from "../../context/myContext";
import toast from 'react-hot-toast'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import Loader from "../../Components/loader/Loader";

const Login = () => {
    const context = useContext(MyContext)
    const { loading, setLoading } = context

    //Navigate
    const navigate = useNavigate()

    //user login state
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    })

    /******************************* User Login Function ****************************/
    const userLoginFunction = async () => {
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are Required")
            return; // Add return to exit the function if fields are empty
        }
        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            console.log(users);
            try {
                const q = query(
                    collection(fireDB, 'user'),
                    where('uid', "==", users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user; // Initialize user variable
                    QuerySnapshot.forEach((doc) => {
                        user = doc.data(); // Assign doc data to user variable
                    });
                    if (user) { // Check if user is defined
                        localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
                        setUserLogin({
                            email: "",
                            password: ""
                        });
                        toast.success("Login Successfully");
                        setLoading(false);
                        if (user.role === "user") {
                            navigate('/user-dashboard');
                        } else {
                            navigate('/admin-dashboard');
                        }
                    } else {
                        console.log("User not found");
                        setLoading(false);
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Login Failed");
        }
    }


    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            {/* Login Form  */}
            <div className="login-form">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='login-heading'>
                        Login
                    </h2>
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userLogin.email}
                        onChange={(e) => {
                            setUserLogin({
                                ...userLogin,
                                email: e.target.value
                            })
                        }}
                        className='login-input'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userLogin.password}
                        onChange={(e) => {
                            setUserLogin({
                                ...userLogin,
                                password: e.target.value
                            })
                        }}
                        className='login-input'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5 login-btn">
                    <button
                        type="submit"
                        onClick={userLoginFunction}
                    >
                        Login
                    </button>
                </div>

                <div>
                    <h2 className='login-secondary-text'>Don't Have an account <Link className='signup-link' to={'/signup'}>Signup</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Login;
