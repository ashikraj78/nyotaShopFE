import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import BuyProcess from "@/components/BuyProcess";
import { Switch } from 'antd';
import ImageUploader from "@/components/ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import { counterStates, setFormData, setSignUpModal } from "@/redux/counterReducer";
import SingUpModal from "@/components/SignUpModal";

function BuyNow(){
    const dispatch = useDispatch()

    const [isChecked, setIsChecked] = useState(false);
    const [page, setPage] = useState<number>(4);
    const [relSide, setRelSide] = useState<string>("");
    const [addImage, setAddImage] = useState<boolean>(false);
    const {formData, userData} = useSelector(counterStates)

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
        date?: string | null
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
    const [event1, setEvent1] = useState<EventState>(formData?.event1Data || initialEventState)
    const [event2, setEvent2] = useState<EventState>(formData?.event2Data || initialEventState)

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
    const handleEvent1Change = (e: ChangeEvent<HTMLInputElement>) =>{
        setEvent1({
            ...event1,
            [e.target.id] : e.target.value
        })
    }
    const handleEvent2Change = (e: ChangeEvent<HTMLInputElement>) =>{
        setEvent2({
            ...event2,
            [e.target.id] : e.target.value
        })
    }
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
        dispatch(setFormData({...formData,  brideData: bride, groomData: groom, event1Data: event1, event2Data: event2}))
    }

    function handleMakePayment(){
        if(!userData){
            dispatch(setSignUpModal(true))
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
                <div className="mt-12 primaryTextColor ">
                    <p className="text-xl font-extrabold mb-10">Event 1</p>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="title" className="block opacity-60">Title *</label>
                            <input id="title" type="text" placeholder="Event Title" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" onChange={handleEvent1Change} value={event1?.title || ""} />
                        </div>
                        
                        <div>
                            <label htmlFor="venue" className="block opacity-60">Venue *</label>
                            <input id="venue" type="text" placeholder="Venue Address" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" onChange={handleEvent1Change} value={event1?.venue || ""} />
                        </div>
                        <div>
                            <label htmlFor="timeInput" className="block opacity-60">Time *</label>
                            <input id="time" type="time" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" onChange={handleEvent1Change} value={event1?.time || ""} />
                        </div>
                        <div>
                            <label htmlFor="date" className="block opacity-60">Date *</label>
                            <input id="date" type="date" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" onChange={handleEvent1Change} value={event1?.date || ""} />
                        </div>
                    </div>
                </div>
                <div className="mt-12 primaryTextColor ">
                    <p className="text-xl font-extrabold mb-10">Event 2</p>
                    <div className="grid grid-cols-3 gap-4">
                    <div>
                            <label htmlFor="title" className="block opacity-60">Title *</label>
                            <input id="title" type="text" placeholder="Event Title" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" onChange={handleEvent2Change} value={event2?.title || ""} />
                        </div>
                        
                        <div>
                            <label htmlFor="venue" className="block opacity-60">Venue *</label>
                            <input id="venue" type="text" placeholder="Venue Address" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" onChange={handleEvent2Change} value={event2?.venue || ""} />
                        </div>
                        <div>
                            <label htmlFor="timeInput" className="block opacity-60">Time *</label>
                            <input id="time" type="time" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" onChange={handleEvent2Change} value={event2?.time || ""} />
                        </div>
                        <div>
                            <label htmlFor="date" className="block opacity-60">Date *</label>
                            <input id="date" type="date" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" onChange={handleEvent2Change} value={event2?.date || ""} />
                        </div>
                    </div>
                </div>
                <div className=" mt-12  flex w-44 border justify-center items-center py-3 primaryColor cursor-pointer">
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
                   <button className="w-56 buyProcessBorder py-4  text-xl font-normal primaryColor text-white ml-8" onClick={handleMakePayment}>Make Payment</button>
               </div>
           )}
           <SingUpModal />
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