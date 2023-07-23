const {Modal} = require("antd")
import { counterStates, setSignUpModal, setUserData } from "@/redux/counterReducer";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import 'react-phone-number-input/style.css'
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input'
import Image from "next/image";

function SingUpModal(){
    const dispatch = useDispatch()
    const {signUpModal} = useSelector(counterStates)
    const[initialState, setInitialState] = useState("signup")

    function handleSingUp(){
        console.log("this is signup")
        generateOTP();
    }
    const [otpForm, setOtpForm] = useState<boolean>(false)
    const [otpValue, setOtpValue] = useState<string | null>(null)
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
          const response = await fetch("http://localhost:4000/user/generateOTP", {
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
        console.log({responseData})
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
        const url = `http://localhost:4000/user/${endpoint}`;


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
        <div className="flex ">
            <div className=" primaryColor h-62 w-1/2 flex items-center justify-center  mr-2  ">
                <Image
                    src={"/nyota_logo.svg"}
                    width={136}
                    height={500}
                    alt="Company logo"
                    className="cursor-pointer"
                />
            </div>
            <div>

            <div className="flex justify-around">
               
                <p className={` ${initialState === "signup" ? "primaryTextColor font-bold border-b px-8 " : "cursor-pointer"}`}
                    onClick={() => setInitialState("signup")} >
                     Signup
                </p>
                <p className={` ${initialState === "login" ? "primaryTextColor font-bold border-b px-8 " : " cursor-pointer"}`}
                    onClick={() => setInitialState("login")} >
                     Login
                </p>

            </div>

            {otpForm ? (
                <div className="p-2">
                    <div className="my-4">
                        <label htmlFor="name"> Enter OTP </label><br></br>
                        <input name="name" className="border" onChange={(e)=> setOtpValue(e.target.value)}></input> 
                    </div>
                    
                    <button className="border px-3 py-1 rounded cursor" onClick={handleOTPSubmit}>Submit</button>
                </div>
            ): (
                <div className="p-2">

                    {initialState == "signup" && (
                        <div className="my-4">
                            <label htmlFor="name"> Name</label><br></br>
                            <input name="name" className="border" onChange={(e)=> setName(e.target.value)}></input> 
                        </div>
                    )}
                    
                    <div className="my-4">
                        <label htmlFor="mobile"> Mobile Number</label><br></br>
                        <PhoneInput
                            defaultCountry="IN"
                            value={mobileNumber}
                            onChange={handlePhoneNumberChange}
                            className="border"
                        />
                        {error && <p>{error}</p>}
                    </div>
                
                    <button className="border px-3 py-1 rounded cursor" onClick={handleSingUp}>
                         {initialState === "signup" ? "Singup" : "Login" }
                    </button>
                   
                </div>
            )}

            </div>

          

        </div>
       
       
      


        </Modal>
    )
}

export default SingUpModal;