import Image from "next/image";
import React, { ChangeEvent, use, useEffect, useState } from "react";
import BuyProcess from "@/components/BuyProcess";
import { Switch } from 'antd';
import ImageUploader from "@/components/ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import { counterStates, setFormData, setSignUpModal, setThankModal, setUserData } from "@/redux/counterReducer";
import SingUpModal from "@/components/SignUpModal";
import { useRouter } from "next/router";
import { paymentService } from "@/services";
import ThankModal from "@/components/ThankModal";
import {RiDeleteBin5Line} from "react-icons/ri"

declare global {
    interface Window {
      Razorpay: new (options: any) => any;
    }
}
  

function BuyNow(){
    const dispatch = useDispatch()
    const router = useRouter()
    const [product, setProduct] = useState<Product>({} as Product);
    const { id } = router.query
    const backEndURI = process.env.NEXT_PUBLIC_SERVER_SIDE_URI;

    useEffect(() => {
        const fetchProduct = async () => {
          const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SIDE_URI}/product/showProduct?id=${id}`);
          const productData = await res.json();
          setProduct(productData);
        }
    
        if (id) { // Check if id is not null or undefined
          fetchProduct();
        }
      }, [id]);
    // const res = await fetch(`${backEndURI}/product/showProduct?id=${id}`);

    const [isChecked, setIsChecked] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [relSide, setRelSide] = useState<string>("");
    const [addImage, setAddImage] = useState<boolean>(false);
    const {formData, userData} = useSelector(counterStates)
    const [paidAmount,setPaidAmount] = useState<number | null>(null)
    const [razorPayPaymentId,setRazorPayPaymentId] = useState<string | null>(null)
    const [formDataId, setFormDataId] = useState(null);
    const [isPayButtonClicked, setPayButtonClicked] = useState<boolean>(false);
    const reduxStoredEvents = formData?.eventsData

    interface PersonState {
        name?: string |null,
        motherName?: string | null,
        fatherName?: string | null,
        grandmotherName? : string | null,
        grandfatherName? : string | null
    }
    interface EventState {
        title?: string | null,
        venue?: string | null,
        time?: string | null,
        date?: string | null,
        [key: string]: string | undefined | null,
    }
    interface Product {
        _id: string;
         title: string;
        subTitle: string;
        description: string;
        category: string;
        videoLink: string;
        videoTheme: string;
        musicTheme: string;
        cost: number;
        timeDuration: number;
        photosRequired: boolean;
    }

 
    const initialPersonState : PersonState ={
        name: null,
        motherName: null,
        fatherName: null,
        grandmotherName: null,
        grandfatherName: null
    }

    const initialEventState : EventState ={
        title:  null,
        venue: null,
        time:  null,
        date:  null
    }
    
    const [bride, setBride] = useState<PersonState>(formData?.brideData || initialPersonState);
    const [groom, setGroom] = useState<PersonState>(formData?.groomData || initialPersonState);
    const [events, setEvents] = useState<EventState[]>(reduxStoredEvents||[initialEventState]);




    const handleEventChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {

        const newEvents = [...events];
        const newEvent = {...newEvents[index]}; // clone the event object
        newEvent[event.target.id] = event.target.value;
        newEvents[index] = newEvent; // replace the original event object with the updated one
        setEvents(newEvents);
    }

    const addEvent = () => {
        setEvents([...events, initialEventState]);
    }
    const handleEventDelete = (index:number)=>{
        const newEvents = [...events];
        newEvents.splice(index, 1);
        setEvents(newEvents);
    }



    const handleBrideChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBride({
            ...bride,
            [e.target.name]: e.target.value,
        });
    };
    const handleGroomChange =(e: ChangeEvent<HTMLInputElement>)=>{
        setGroom({
            ...groom,
            [e.target.name]: e.target.value
        })
    };


   
   


    const handleDrop = (acceptedFiles: File[]) => {
        console.log(acceptedFiles);
        // Handle the images.
        acceptedFiles.forEach((file: any) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            // Do whatever you want with the file contents
            const binaryStr = reader.result;
            console.log(binaryStr);
          };
          reader.readAsArrayBuffer(file);
        });
    };

    function handleNextClick(){
        dispatch(setFormData({...formData,productId:id,  brideData: bride, groomData: groom, eventsData:events}))
    }


    useEffect(() => {
        // Check if both the payment ID and the paid amount have been set
        if (razorPayPaymentId !== null && paidAmount !== null) {
          createProductOrder();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [razorPayPaymentId, paidAmount]);

   



    async function handlePayment() {
        function loadScript(src:string) {
          return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
              resolve(true);
            };
            script.onerror = () => {
              resolve(false);
            };
            document.body.appendChild(script);
          });
        }
        async function displayRazorPay() {
          const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
          );
          if (!res) {
            return;
          }
          let data = {
            amount: product?.cost,
            currency: "INR",
          };
          const result = await paymentService.createSession(data);
          const { amount, id: order_id, currency } = result;
          const options = {
            key: "rzp_test_KalvucdlwmjOEd",
            amount: amount,
            currency: currency,
            name: "Nyota",
            description: " Nyota Test Transaction",
            image: "https://via.placeholder.com/150",
            order_id: order_id,
            handler: async (response:any) => {
              const responseData = {
                orderId: order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              };
              const verifiedResponse = await paymentService.verifyPayment(
                responseData
              );
              setRazorPayPaymentId(verifiedResponse.id);
              setPaidAmount(verifiedResponse.amount / 100);
            },
            prefill: {
              name: "Ashik Raj",
              email: "ashikraj.78@gmail.com",
              contact: "8989047460",
            },
            notes: {
              address: "Dharamshala Alt Campus",
            },
            theme: {
              color: "#F37254",
            },
          };
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        }
        displayRazorPay();
    }

    async function createProductOrder(){

        const data = {userId: userData?.user?._id, productId:id, formDataId: formDataId, razorPayPaymentId:razorPayPaymentId, paidAmount:paidAmount }

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SIDE_URI}/order/createOrder`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
        });
        const productOrder = await res.json();
        dispatch(setThankModal(true))    


        const  newUserResponse =  await fetch(`${backEndURI}/user/showUser?id=${userData?.user?._id}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
            mode: "cors",
        });
        const newUserData = await newUserResponse.json()
        dispatch(setUserData({...userData, user: newUserData?.user}))

        router.push("/order")


    }

    async function createFormData() {
        const data = {...formData, userId: userData?.user?._id}

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SIDE_URI}/formData/createFormData`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
          });
          const productData = await res.json();
          setFormDataId(productData?._id)
        
    }


    function handleMakePayment(){
        setPayButtonClicked(true)
        if(!userData){
            dispatch(setSignUpModal(true))
        }else{
            createFormData().then(()=>{
                handlePayment()
            })
        }
    }

    return(
        <div>
           <BuyProcess page={page} />
           {page ===1 && (
            <div className="mx-36 mt-20">
                <select name="side" id="side" className="border-b-2 w-1/4 pb-2 primaryTextColor text-xl font-thin"   value={relSide || ''}
                onChange={(e) => setRelSide(e.target.value)}>
                        <option selected disabled>I belong to the ...</option>
                        <option value="bride">Bride Side</option>
                        <option value="groom">Groom Side</option>
                </select>
                <div className="mt-12 primaryTextColor ">
                    <p className="text-xl font-extrabold mb-10">Bride Side</p>
                    <div className="grid grid-cols-3 gap-4">
                        <input placeholder="Name *" name="name" onChange={handleBrideChange} value={bride.name  || ""} className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8  w-3/4" />
                        <input placeholder="Mother’s Name *" name="motherName" onChange={handleBrideChange} value={bride.motherName || ""}   className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8 w-3/4" />
                        <input placeholder="Father’s Name *" name="fatherName" onChange={handleBrideChange} value={bride.fatherName || ""}  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8 w-3/4" />
                        <input placeholder="Grand Mother’s Name" name="grandmotherName" onChange={handleBrideChange} value={bride.grandmotherName || ""}  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8 w-3/4" />
                        <input placeholder="Grand Father’s Name" name="grandfatherName" onChange={handleBrideChange} value={bride.grandfatherName || ""}  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8 w-3/4" />
                    </div>
                </div>
                <div className="mt-12 primaryTextColor ">
                    <p className="text-xl font-extrabold mb-10">Groom Side</p>
                    <div className="grid grid-cols-3 gap-4">
                        <input placeholder="Name *" name="name" onChange={handleGroomChange} value={groom?.name  || ""} className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8  w-3/4" />
                        <input placeholder="Mother’s Name *" name="motherName" onChange={handleGroomChange} value={groom.motherName || ""}   className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8 w-3/4" />
                        <input placeholder="Father’s Name *" name="fatherName" onChange={handleGroomChange} value={groom.fatherName || ""}  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8 w-3/4" />
                        <input placeholder="Grand Mother’s Name" name="grandmotherName" onChange={handleGroomChange} value={groom.grandmotherName || ""}  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8 w-3/4" />
                        <input placeholder="Grand Father’s Name" name="grandfatherName" onChange={handleGroomChange} value={groom.grandfatherName || ""}  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8 w-3/4" />
                    </div>
                </div>
           </div>
        )}
        {page === 2 && (
                 <div className="mx-36 mt-20">
                 {events.map((event, index:number) => (
                     <div key={index} className="mt-12 primaryTextColor ">
                         <div className="flex">
                                 <p className="text-xl font-extrabold mb-10 mr-4">Event {index + 1}</p>
                                 {index >0 && (
                                 <RiDeleteBin5Line className="cursor-pointer" onClick={()=> handleEventDelete(index)} />
                                 )}
                         </div>
                         
                         <div className="grid grid-cols-3 gap-4">
                             <div>
                                 <label htmlFor={`title${index}`} className="block opacity-60">Title *</label>
                                 <input id="title"  type="text" placeholder="Event Title" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" onChange={(e) => handleEventChange(index, e)} value={event.title || ""} />
                             </div>
                             <div>
                                 <label htmlFor={`venue${index}`} className="block opacity-60">Venue *</label>
                                 <input id="venue" type="text" placeholder="Venue Address" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" onChange={(e) => handleEventChange(index, e)} value={event.venue || ""} />
                             </div>
                             <div>
                                 <label htmlFor={`time${index}`} className="block opacity-60">Time *</label>
                                 <input id="time" type="time" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" onChange={(e) => handleEventChange(index, e)} value={event.time || ""} />
                             </div>
                             <div>
                                 <label htmlFor={`date${index}`} className="block opacity-60">Date *</label>
                                 <input id="date" type="date" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" onChange={(e) => handleEventChange(index, e)} value={event.date || ""} />
                             </div>
                         </div>
                     </div>
                 ))}
                 <div className=" mt-12  flex w-44 border justify-center items-center py-3 primaryColor cursor-pointer" onClick={addEvent}>
                     <p className="text-xl font-normal text-white">Add Event</p>
                     <div className="border rounded-full w-6 h-6  flex justify-center items-center ml-7 bg-white primaryTextColor">+</div>
                 </div>
             </div>            


          
        )}
        {page === 3 && (
                <div className="mx-36 mt-20">
                    <div className="mt-12 primaryTextColor flex ">
                        <p className="text-xl font-extrabold mb-10 mr-10">Upload Photos</p>
                        <Switch
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                            className="primaryColor"
                            onChange={()=> setAddImage(!addImage)}
                        />
                    </div>
                    {
                        addImage && (
                            <ImageUploader onDrop={handleDrop} />
                        )
                    }
             
                    <div className=" mt-12  flex w-44 border justify-center items-center py-3 primaryColor cursor-pointer">
                        <p className="text-xl font-normal text-white">Add Event</p>
                        <div className="border rounded-full w-6 h-6  flex justify-center items-center ml-7 bg-white primaryTextColor">+</div>
                    </div>
                </div>
           )}
           {page === 4 && (
               <div className="text-center mt-20 mb-10">
                   <button 
                        className="w-56 buyProcessBorder py-4  text-xl font-normal primaryColor text-white ml-8" 
                        onClick={handleMakePayment}
                        disabled={isPayButtonClicked} 
                    >
                        {isPayButtonClicked ? "Please Wait ...." : `Pay ₹${product?.cost}`}
                    </button>
               </div>
           )}
           <SingUpModal />
           <ThankModal />
           <div className="text-center mt-20 mb-10">
                <button className={`w-56 buyProcessBorder py-4 text-xl font-normal primaryTextColor mr-8 ${page < 2 ? 'opacity-20' : ''}`}
                                onClick={() => setPage(page - 1)}
                                disabled={page < 2}>
                        Back
                </button>

                <button className={`w-56 buyProcessBorder py-4 text-xl font-normal primaryColor text-white ml-8 ${page > 3 ? 'opacity-20' : ''} `} onClick={() =>{
                     handleNextClick();
                     setPage(page + 1)
                     }} disabled={page>3}>Next</button>
            </div>
            <div className="flex justify-center">
                <Image
                src={"/nyota_flower_break.svg"}
                width={500}
                height={700}
                alt="Flower Br"
                className="w-4/6"
                />
            </div>
        </div>
    )
}

export default BuyNow

