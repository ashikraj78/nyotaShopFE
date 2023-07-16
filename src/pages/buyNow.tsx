import Image from "next/image";
import React, { useState } from "react";
import BuyProcess from "@/components/BuyProcess";
import { Switch } from 'antd';

function BuyNow(){
    const [isChecked, setIsChecked] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [bride, setBride] = useState({
        name: "",
        motherName: "",
        fatherName: "",
        grandmotherName: "",
        grandfatherName: ""
      });
    
      const [groom, setGroom] = useState({
        name: "",
        motherName: "",
        fatherName: "",
        grandmotherName: "",
        grandfatherName: ""
      });




    return(
        <div>
           <BuyProcess page={page} />
           {page ===1 && (
            <div className="mx-36 mt-20">
                <select name="side" id="side" className="border-b-2  w-1/4 pb-2 primaryTextColor text-xl font-thin ">
                        <option selected disabled>I belong to the ...</option>
                        <option value="bride">Bride Side</option>
                        <option value="groom">Groom Side</option>
                </select>
                <div className="mt-12 primaryTextColor ">
                    <p className="text-xl font-extrabold mb-10">Bride Side</p>
                    <div className="grid grid-cols-3 gap-4">
                        <input placeholder="Name *" name="name" onChange={(e) => setBride({...bride, name: e.target.value})} value={bride.name} className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8  w-3/4" />
                        <input placeholder="Mother’s Name *" name="motherName" onChange={(e) => setBride({...bride, motherName: e.target.value})} value={bride.motherName}   className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8 w-3/4" />
                        <input placeholder="Father’s Name *" name="fatherName" onChange={(e) => setBride({...bride, fatherName: e.target.value})} value={bride.fatherName}  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8 w-3/4" />
                        <input placeholder="Grand Mother’s Name" name="grandmotherName" onChange={(e) => setBride({...bride, grandmotherName: e.target.value})} value={bride.grandmotherName}  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8 w-3/4" />
                        <input placeholder="Grand Father’s Name" name="grandfatherName" onChange={(e) => setBride({...bride, grandfatherName: e.target.value})} value={bride.grandfatherName}  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8 w-3/4" />
                    </div>
                </div>
                <div className="mt-12 primaryTextColor ">
                    <p className="text-xl font-extrabold mb-10">Groom Side</p>
                    <div className="grid grid-cols-3 gap-4">
                        <input placeholder="Name *" name="name" onChange={(e) => setGroom({...groom, name: e.target.value})} value={groom.name} className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8  w-3/4" />
                        <input placeholder="Mother’s Name *" name="motherName" onChange={(e) => setGroom({...groom, motherName: e.target.value})} value={groom.motherName}   className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8 w-3/4" />
                        <input placeholder="Father’s Name *" name="fatherName" onChange={(e) => setGroom({...groom, fatherName: e.target.value})} value={groom.fatherName}  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8 w-3/4" />
                        <input placeholder="Grand Mother’s Name" name="grandmotherName" onChange={(e) => setGroom({...groom, grandmotherName: e.target.value})} value={groom.grandmotherName}  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8 w-3/4" />
                        <input placeholder="Grand Father’s Name" name="grandfatherName" onChange={(e) => setGroom({...groom, grandfatherName: e.target.value})} value={groom.grandfatherName}  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8 w-3/4" />
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
                            <label htmlFor="dateInput" className="block opacity-60">Title *</label>
                            <input id="titleInput" type="text" placeholder="Event Title" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" />
                        </div>
                        
                        <div>
                            <label htmlFor="dateInput" className="block opacity-60">Venue *</label>
                            <input id="venueInput" type="text" placeholder="Venue Address" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" />
                        </div>
                        <div>
                            <label htmlFor="dateInput" className="block opacity-60">Time *</label>
                            <input id="timeInput" type="time" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" />
                        </div>
                        <div>
                            <label htmlFor="dateInput" className="block opacity-60">Date *</label>
                            <input id="dateInput" type="date" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" />
                        </div>
                    </div>
                </div>
                <div className="mt-12 primaryTextColor ">
                    <p className="text-xl font-extrabold mb-10">Event 2</p>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="dateInput" className="block opacity-60">Title *</label>
                            <input id="titleInput" type="text" placeholder="Event Title" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" />
                        </div>
                        
                        <div>
                            <label htmlFor="dateInput" className="block opacity-60">Venue *</label>
                            <input id="venueInput" type="text" placeholder="Venue Address" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" />
                        </div>
                        <div>
                            <label htmlFor="dateInput" className="block opacity-60">Time *</label>
                            <input id="timeInput" type="time" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" />
                        </div>
                        <div>
                            <label htmlFor="dateInput" className="block opacity-60">Date *</label>
                            <input id="dateInput" type="date" className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-6 w-3/4" />
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
                        />
                    </div>
                    <div className="border rounded flex justify-center flex-col items-center p-9">
                        <div>
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 40C10.9 40 9.958 39.608 9.174 38.824C8.39 38.04 7.99867 37.0987 8 36V30H12V36H36V30H40V36C40 37.1 39.608 38.042 38.824 38.826C38.04 39.61 37.0987 40.0013 36 40H12ZM22 32V15.7L16.8 20.9L14 18L24 8L34 18L31.2 20.9L26 15.7V32H22Z" fill="#7E223C"/>
                            </svg>
                        </div>
                        <p className="pt-4 text-xl font-thin">Drag and drop file </p>
                        <p className="pb-4 text-xl font-thin">or</p>
                        <button className="w-56 buyProcessBorder py-4  text-xl font-normal primaryColor text-white ml-8">Browse</button>
                    </div>
                    <div className=" mt-12  flex w-44 border justify-center items-center py-3 primaryColor cursor-pointer">
                        <p className="text-xl font-normal text-white">Add Event</p>
                        <div className="border rounded-full w-6 h-6  flex justify-center items-center ml-7 bg-white primaryTextColor">+</div>
                    </div>
                </div>
           )}
           <div className="text-center mt-20 mb-10">
                <button className={`w-56 buyProcessBorder py-4 text-xl font-normal primaryTextColor mr-8 ${page < 2 ? 'opacity-20' : ''}`}
                                onClick={() => setPage(page - 1)}
                                disabled={page < 2}>
                        Back
                </button>

                <button className={`w-56 buyProcessBorder py-4 text-xl font-normal primaryColor text-white ml-8 ${page > 3 ? 'opacity-20' : ''} `} onClick={() => setPage(page + 1)} disabled={page>3}>Next</button>
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