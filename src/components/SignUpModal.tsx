const {Modal} = require("antd")
import { counterStates, setSignUpModal, setUserData } from "@/redux/counterReducer";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import 'react-phone-number-input/style.css'
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input'
import Image from "next/image";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import {TbEdit} from "react-icons/tb";
import OtpInput from 'react-otp-input';

function SingUpModal(){

    const dispatch = useDispatch()
    const {signUpModal} = useSelector(counterStates)
    const[initialState, setInitialState] = useState("signup")
    const backEndURI = process.env.NEXT_PUBLIC_SERVER_SIDE_URI

    function handleSingUp(){
        generateOTP();
    }
    const [otpForm, setOtpForm] = useState<boolean>(false)
    const [otpValue, setOtpValue] = useState<string>("")
    const [name, setName] = useState<string | null>(null)
    const [mobileNumber, setMobileNumber] = useState("");
    const [error, setError] = useState('');
    const handlePhoneNumberChange = (phoneNumber: string) =>{
        setMobileNumber(phoneNumber);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if(mobileNumber) {
                if(mobileNumber.length === 13){
                    setError("")
                }else{
                  setError("Invalid phone number. It should be 10 digits.")
                }
            }
        }, 1000);
    
        // Cleanup function to clear the timeout if the component is unmounted or if the value changes before 3 seconds
        return () => clearTimeout(timer);
    }, [mobileNumber]); // Dependency array


    const generateOTP = async () => {

        const data ={
            name : name, 
            mobilenumber: mobileNumber
        }
       
        try {
          const response = await fetch(`${backEndURI}/user/generateOTP`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
          });
    
          if (!response.ok) {
            throw new Error("Failed to fetch data from server.");
          } else {
            setOtpForm(true);
          }
          const responseData = await response.json();
        //   setMobileNumber(responseData?.mobileNumber);
        } catch (error) {
          console.error(error);
        }
    };
    async function handleOTPSubmit(){

        
        const data ={
            otp : otpValue, 
            mobilenumber: mobileNumber
        }

        const endpoint = initialState === "signup" ? "createUser" : "loginUser";
        const url = `${backEndURI}/user/${endpoint}`;


        try {
            const response = await fetch(url, {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
              mode: "cors",
            });
      
            if (!response.ok) {
              throw new Error("Failed to fetch data from server.");
            }
      
            const responseData = await response.json();
            dispatch(setUserData(responseData))
            dispatch(setSignUpModal(false))
          } catch (error) {
            console.error(error);
          }


    }





    return(
        <Modal  
            visible={signUpModal}
            footer={null}
            onCancel={() => dispatch(setSignUpModal(false))} 
            
        > 
        <div className="p-10" >
            {!otpForm && (
                <div className="flex items-center justify-center">
                    <div className=" primaryColor w-40 h-40 rounded-full border-8 flex items-center justify-center">
                        <Image
                            src={"/nyota_logo.svg"}
                            width={120}
                            height={500}
                            alt="Company logo"
                            className="cursor-pointer"
                        />
                    </div>
                </div>
            )}
  
           
            <div>
              
                {otpForm ? (
                    <div >
                        <div>
                            <p className="text-3xl text-center mb-4">Verify OTP</p>
                            <div className="flex items-center justify-center">
                                <p>6-digit OTP sent to {mobileNumber} </p>
                                <TbEdit className="cursor-pointer ml-1 primaryTextColor"  
                                onClick={()=>setOtpForm(false)}  />
                            </div>
                            
                        </div>

                        <div className="flex justify-center mt-10">
                            <OtpInput
                                inputStyle={{ 
                                    border: '1px solid #e9d1d8',
                                    borderRadius: '5px',
                                    fontSize: '32px' 
                                }} 
                                value={otpValue}
                                onChange={setOtpValue}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} />}
                                
                            />
                        </div>
                       
                        
                        <button className="border px-3 py-1 rounded cursor primaryColor text-white w-full mt-10 text-xl" onClick={handleOTPSubmit}>Submit</button>
                    </div>
                ): (
                    <div>

                        {initialState == "signup" && (
                            <div className="mt-10">
                                {/* <label htmlFor="name"> Name</label><br></br> */}
                                <input name="name" className="border-b w-full phone-input text-xl px-2 " onChange={(e)=> setName(e.target.value)} placeholder="Name"></input> 
                            </div>
                        )}
                        
                        <div className="mt-10">
                            {/* <label htmlFor="mobile" className="text-xl"> Mobile Number</label><br></br> */}
                            <PhoneInput
                                defaultCountry="IN"
                                value={mobileNumber}
                                onChange={handlePhoneNumberChange}
                                className="border-b phone-input text-xl px-2"
                                placeholder="Mobile Number"
                            />
                            {error && <p>{error}</p>}
                        </div>
                    
                        <button className="border px-3 py-1 rounded cursor primaryColor text-white w-full mt-10 text-xl" onClick={handleSingUp}>
                            {initialState === "signup" ? "Signup" : "Login" }
                        </button>
                        <small className="text-center block mt-2">By {initialState === "signup" ? "Signing" : "Loging" }  in, I agree to Terms and Conditions</small>
                        


                        <div className="text-center mt-6">
                        
                            

                            {initialState === "signup" ? (
                                <p className="cursor-pointer stateBorder inline-block "
                                    onClick={() => setInitialState("login")} >
                                    Already have an account ? <b>Login</b> 
                                </p>
                            ):(
                                <p className="cursor-pointer stateBorder inline-block"
                                    onClick={() => setInitialState("signup")} >
                                    Dont have account ? <b>Signup</b> 
                                </p>
                            )}

                            

                    </div>
                    
                    </div>
                )}
            </div>
        </div>
        </Modal>
    )
}

export default SingUpModal;