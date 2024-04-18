import React, { useContext } from "react";
import './AdminDashboard.css'
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ProductDetail from "../../Components/admin/ProductDetail";
import OrderDetail from "../../Components/admin/OrderDetail";
import UserDetail from "../../Components/admin/UserDetail";
import MyContext from "../../context/myContext";
const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const context = useContext(MyContext)
    const {getAllProduct,getAllOrder,getAllUser}=context
    console.log("All Orders:",getAllOrder)
    return (
        <div>
            {/* Top */}
            <div className="admin-container top">
                <div className="admin-dashboard">
                    <h1 className="dashboard-title">Admin Dashboard</h1>
                </div>
            </div>
            <div className="px-5">
                <div className="mid-container">
                    <div className="admin-main-card">
                        <div className="admin-image-container">
                            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
                        </div>
                        <div className="admin-text-container">
                            <h1 className="admin-name-text"><span className="font-bold">Name :</span> {user?.name}</h1>
                            <h1 className="admin-name-text"><span className="font-bold">Email :</span> {user?.email}</h1>
                            <h1 className="admin-name-text"><span className="font-bold">Date :</span> {user?.date}</h1>
                            <h1 className="admin-name-text"><span className="font-bold">Role :</span> {user?.role}</h1>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="">
                    <Tabs>
                    <TabList className="flex flex-wrap -m-4 text-center justify-center">
                        {/* Total Products */}
                        <Tab className="admin-product-container">
                            <div className="admin-card">
                                <div className="admin-icon-container">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="icon"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m5 11 4-7" />
                                        <path d="m19 11-4-7" />
                                        <path d="M2 11h20" />
                                        <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                                        <path d="m9 11 1 9" />
                                        <path d="M4.5 15.5h15" />
                                        <path d="m15 11-1 9" />
                                    </svg>
                                </div>
                                    <h2 className="admin-count">{getAllProduct.length}</h2>
                                    <p className="admin-text">Total Products</p>
                            </div>
                        </Tab>

                        {/* Total Order  */}
                        <Tab className="admin-order-container">
                            <div className="admin-card">
                                <div className="admin-icon-container">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="icon"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1={10} x2={21} y1={6} y2={6} />
                                        <line x1={10} x2={21} y1={12} y2={12} />
                                        <line x1={10} x2={21} y1={18} y2={18} />
                                        <path d="M4 6h1v4" />
                                        <path d="M4 10h2" />
                                        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                                    </svg>
                                </div>
                                    <h2 className="admin-count">{getAllOrder.length}</h2>
                                    <p className="admin-text">Total Order</p>
                            </div>
                        </Tab>


                        {/* Total User  */}
                        <Tab className="admin-user-container">
                            <div className="admin-card">
                                <div className="admin-icon-container">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="icon"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx={9} cy={7} r={4} />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                                    <h2 className="admin-count">{getAllUser.length}</h2>
                                    <p className="admin-text">Total Users</p>
                            </div>
                        </Tab>

                    </TabList>
                    <TabPanel>
                       <ProductDetail/>
                    </TabPanel>
                    <TabPanel>
                    <OrderDetail/>
                    </TabPanel>
                    <TabPanel>
                       <UserDetail/>
                    </TabPanel>
                    </Tabs>
                    
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;