import {
    Button,
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import { useState } from "react";

const BuyNowModal = ({addressInfo, setAddressInfo, buyNowFunction}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center text-gray-100  border border-transparent dark:border-gray-700  rounded-xl"
                style={{backgroundColor:'#5007aa'} }
            >
                Buy now
            </Button>
            <Dialog open={open} handler={handleOpen} style={{backgroundColor:'#ece0fd'}}>
                <DialogBody className="">
                    <div className="mb-3">
                        <input
                            type="text"
                            name="name"
                            placeholder='Enter your name'
                            value={addressInfo.name}
                            onChange={(e)=>{
                                setAddressInfo({
                                    ...addressInfo,
                                    name:e.target.value
                                })
                            }}
                            className=' border  px-2 py-2 w-full rounded-md outline-none'
                            style={{backgroundColor:'#ece0fd', borderColor:'#bb9ae7',color:'#8929ff'}}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="address"
                            placeholder='Enter your address'
                            value={addressInfo.address}
                            onChange={(e)=>{
                                setAddressInfo({
                                    ...addressInfo,
                                    address:e.target.value
                                })
                            }}
                            className=' border  px-2 py-2 w-full rounded-md outline-none '
                            style={{backgroundColor:'#ece0fd', borderColor:'#bb9ae7',color:'#8929ff'}}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            name="pincode"
                            placeholder='Enter your pincode'
                            value={addressInfo.pincode}
                            onChange={(e)=>{
                                setAddressInfo({
                                    ...addressInfo,
                                    pincode:e.target.value
                                })
                            }}
                            className=' border  px-2 py-2 w-full rounded-md outline-none '
                            style={{backgroundColor:'#ece0fd', borderColor:'#bb9ae7',color:'#8929ff'}}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="mobileNumber"
                            placeholder='Enter your mobileNumber'
                            value={addressInfo.mobileNumber}
                            onChange={(e)=>{
                                setAddressInfo({
                                    ...addressInfo,
                                    mobileNumber:e.target.value
                                })
                            }}
                            className='border  px-2 py-2 w-full rounded-md outline-none '
                            style={{backgroundColor:'#ece0fd', borderColor:'#bb9ae7',color:'#8929ff'}}
                        />
                    </div>

                    <div className="">
                    <Button
                type="button"
                onClick={()=>{
                    handleOpen()
                    buyNowFunction()
                }}
                className="w-full px-4 py-3 text-center text-gray-100  border border-transparent dark:border-gray-700 rounded-lg"
                style={{backgroundColor:'#5007aa'} }
            >
                Buy now
            </Button>
                    </div>

                </DialogBody>
            </Dialog>
        </>
    );
}

export default BuyNowModal;