/* eslint-disable @next/next/no-img-element */
import { counterStates } from "@/redux/counterReducer";
import { Modal, Switch } from "antd";
import React, {
  Dispatch,
  SetStateAction,
  use,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { TbEdit } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useForm } from "react-hook-form";
import Image from "next/image";
import ImageUploader from "./ImageUploader";

interface User {
  _id: string;
  name: string;
  mobilenumber: string;
}
interface Product {
  _id: string;
  title: string;
  videoLink: string;
}
interface BrideInfo {
  brideName: string;
  brideMotherName: string;
  brideFatherName: string;
  brideGrandMotherName: string;
  brideGrandFatherName: string;
}
interface GroomInfo {
  groomName: string;
  groomMotherName: string;
  groomFatherName: string;
  groomGrandMotherName: string;
  groomGrandFatherName: string;
}

interface Event {
  title: string;
  venue: string;
  time: string;
  date: string;
}

interface FormData {
  _id: string;
  brideData: BrideInfo;
  groomData: GroomInfo;
  eventsData: [Event];
  specialNotes: string;
  images: string[];
}

interface Order {
  _id: String;
  userId: User;
  productId: Product;
  formDataId: FormData;
  razorPayPaymentId: string;
  paidAmount: number;
  orderStatus: "Received" | "InProgress" | "Delivered";
  createdAt?: string;
}
interface EventState {
  title?: string | null;
  venue?: string | null;
  time?: string | null;
  date?: string | null;
}

interface Props {
  setOrderDetailsModal: Dispatch<SetStateAction<boolean>>;
  orderDetailsModal: boolean;
  orderId: string;
}

const OrderDetailsModal: React.FC<Props> = ({
  orderDetailsModal,
  setOrderDetailsModal,
  orderId,
}) => {
  const initialEventState: EventState = {
    title: null,
    venue: null,
    time: null,
    date: null,
  };
  const backEndURI = process.env.NEXT_PUBLIC_SERVER_SIDE_URI;
  const { userData } = useSelector(counterStates);
  const token = userData?.jwtToken;
  const [orderDetailsData, setOrderDetailsData] = useState<Order | null>(null);
  const eventDetailsData = orderDetailsData?.formDataId?.eventsData;
  const [brideEditMode, setBrideEditMode] = useState<boolean>(false);
  const [groomEditMode, setGroomEditMode] = useState<boolean>(false);
  const [eventEditMode, setEventEditMode] = useState<number | null>(null);
  const [editClose, setEditClose] = useState<number | null>(null);
  const [addEventAction, setAddEventAction] = useState<number | null>(null);
  const [events, setEvents] = useState<EventState[]>(
    eventDetailsData || [initialEventState]
  );
  const [specialNotesEdit, setSpecialNotesEdit] = useState<boolean>(false);
  const [addImage, setAddImage] = useState<boolean>(false);
  const [images, setImages] = useState<string[] | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const res = await fetch(`${backEndURI}/order/showOrder?id=${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setOrderDetailsData(data);
        setEvents(data?.formDataId?.eventsData);
      } catch (error) {
        console.error(error);
      }
    };
    if (orderId && token && backEndURI) {
      fetchOrderData();
    }
  }, [orderId, token, backEndURI]);

  function formatDate(dateString: string) {
    let date = new Date(dateString);

    let day = date.getDate();
    let monthNumber = date.getMonth();
    let year = date.getFullYear();

    // Array of month names
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let monthName = monthNames[monthNumber];

    return `${day} ${monthName} ${year}`;
  }

  function addDays(dateString: string, days: number) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${monthName} ${year}`;
  }

  function getTime(dateString: string) {
    // Convert the ISO string to a Date object
    const date = new Date(dateString);

    // Adjust for the Indian Standard Time (IST) timezone, which is UTC+5:30
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset() + 330);

    // Extract the time
    const timeString = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
    }).format(date);

    return timeString;
  }

  useEffect(() => {
    if (brideEditMode && orderDetailsData?.formDataId?.brideData) {
      setValue("brideName", orderDetailsData.formDataId.brideData.brideName);
      setValue(
        "brideMotherName",
        orderDetailsData.formDataId.brideData.brideMotherName
      );
      setValue(
        "brideFatherName",
        orderDetailsData.formDataId.brideData.brideFatherName
      );
      setValue(
        "brideGrandMotherName",
        orderDetailsData.formDataId.brideData.brideGrandMotherName
      );
      setValue(
        "brideGrandFatherName",
        orderDetailsData.formDataId.brideData.brideGrandFatherName
      );
    }
    if (groomEditMode && orderDetailsData?.formDataId?.groomData) {
      setValue("groomName", orderDetailsData.formDataId.groomData.groomName);
      setValue(
        "groomMotherName",
        orderDetailsData.formDataId.groomData.groomMotherName
      );
      setValue(
        "groomFatherName",
        orderDetailsData.formDataId.groomData.groomFatherName
      );
      setValue(
        "groomGrandMotherName",
        orderDetailsData.formDataId.groomData.groomGrandMotherName
      );
      setValue(
        "groomGrandFatherName",
        orderDetailsData.formDataId.groomData.groomGrandFatherName
      );
    }
  }, [brideEditMode, setValue, orderDetailsData, groomEditMode]);
  useEffect(() => {
    if (eventEditMode) {
      setValue("title", events[eventEditMode]?.title || "");
      setValue("venue", events[eventEditMode]?.venue || "");
      setValue("time", events[eventEditMode]?.time || "");
      setValue("date", events[eventEditMode]?.date || "");
    }
  }, [eventEditMode, events, setValue]);
  useEffect(() => {
    if (specialNotesEdit) {
      setValue(
        "specialNotes",
        orderDetailsData?.formDataId?.specialNotes || ""
      );
    }
  }, [specialNotesEdit, setValue, orderDetailsData]);

  function handleValueSet(index: number) {
    setValue("title", events[index]?.title);
    setValue("venue", events[index]?.venue);
    setValue("time", events[index]?.time);
    setValue("date", events[index]?.date);
  }
  const saveChanges = (data: any, formType: string) => {
    // Distinguishing actions based on form type
    if (formType === "bride") {
      const brideSubmitData = {
        brideName: data.brideName,
        brideMotherName: data.brideMotherName,
        brideFatherName: data.brideFatherName,
        brideGrandMotherName: data.brideGrandMotherName,
        brideGrandFatherName: data.brideGrandFatherName,
      };
      const updatedOrderDetails = {
        ...orderDetailsData,
        formDataId: {
          ...orderDetailsData?.formDataId,
          brideData: brideSubmitData,
        },
      } as Order;
      setOrderDetailsData(updatedOrderDetails);
      updateFormData(updatedOrderDetails?.formDataId);
      setBrideEditMode(false);
      // Handle bride form submission
    } else if (formType === "groom") {
      const groomSubmitData = {
        groomName: data.groomName,
        groomMotherName: data.groomMotherName,
        groomFatherName: data.groomFatherName,
        groomGrandMotherName: data.groomGrandMotherName,
        groomGrandFatherName: data.groomGrandFatherName,
      };
      // Handle groom form submission
      const updatedOrderDetails = {
        ...orderDetailsData,
        formDataId: {
          ...orderDetailsData?.formDataId,
          groomData: groomSubmitData,
        },
      } as Order;
      setOrderDetailsData(updatedOrderDetails);
      updateFormData(updatedOrderDetails?.formDataId);
      setGroomEditMode(false);
    } else if (formType == "event") {
      if (eventEditMode !== null) {
        const eventSubmitData = {
          title: data.title,
          venue: data.venue,
          time: data.time,
          date: data.date,
        };
        const updatedEvents = [...events];
        updatedEvents[eventEditMode] = eventSubmitData;

        const updatedOrderDetails = {
          ...orderDetailsData,
          formDataId: {
            ...orderDetailsData?.formDataId,
            eventsData: updatedEvents,
          },
        } as Order;

        setOrderDetailsData(updatedOrderDetails);
        updateFormData(updatedOrderDetails?.formDataId);
        setEvents(updatedEvents);
        setAddEventAction(null);
        setEditClose(null);
        setEventEditMode(null);
      }
    } else if (formType == "specialNotes") {
      if (data.specialNotes.length > 0) {
        const updatedOrderDetails = {
          ...orderDetailsData,
          formDataId: {
            ...orderDetailsData?.formDataId,
            specialNotes: data.specialNotes,
          },
        } as Order;
        setOrderDetailsData(updatedOrderDetails);
        updateFormData(updatedOrderDetails?.formDataId);
      }

      setSpecialNotesEdit(false);
    }
    //... and so on for other form types
  };

  async function updateFormData(finalData: any) {
    const formDataId = orderDetailsData?.formDataId?._id;

    try {
      const response = await fetch(
        `${backEndURI}/formData/updateFormData?id=${formDataId}`,
        {
          method: "PUT",
          body: JSON.stringify(finalData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error("Product updation is failed");
      }

      const responseData = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  const handleBrideChange = handleSubmit((data) => saveChanges(data, "bride"));
  const handleGroomChange = handleSubmit((data) => saveChanges(data, "groom"));
  const handleEventChange = handleSubmit((data) => saveChanges(data, "event"));
  const handleSpecialNotesChange = handleSubmit((data) =>
    saveChanges(data, "specialNotes")
  );

  const addEvent = () => {
    if (!addEventAction) {
      setEventEditMode(events.length);
      setAddEventAction(events.length);
      setEvents([...events, initialEventState]);
    }
  };
  const handleEventDelete = (index: number) => {
    const values = getValues();
    setAddEventAction(null);
    setEventEditMode(null);
    setEditClose(null);
    const newEvents = [...events];
    newEvents.splice(index, 1);
    setEvents(newEvents);
    if (values.title || values.date || values.time || values.venue) {
      const updatedOrderDetails = {
        ...orderDetailsData,
        formDataId: {
          ...orderDetailsData?.formDataId,
          eventsData: newEvents,
        },
      } as Order;
      setOrderDetailsData(updatedOrderDetails);
      updateFormData(updatedOrderDetails?.formDataId);
    }
  };
  const handleImageDelete = (index: number) => {
    if (orderDetailsData?.formDataId?.images) {
      const updatedOrderDetails = {
        ...orderDetailsData,
        formDataId: {
          ...orderDetailsData?.formDataId,
          images: [
            ...orderDetailsData?.formDataId?.images?.slice(0, index),
            ...orderDetailsData?.formDataId?.images?.slice(index + 1),
          ],
        },
      };
      setOrderDetailsData(updatedOrderDetails);
      // updateFormData(updatedOrderDetails?.formDataId);
    }
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

  return (
    <Modal
      open={orderDetailsModal}
      onCancel={() => setOrderDetailsModal(false)}
      footer={null}
      width={1200}
    >
      <>
        {!orderDetailsData ? (
          <p>Please Wait ...</p>
        ) : (
          <div className="mt-10 p-4">
            <div className="flex justify-between">
              {orderDetailsData?.createdAt ? (
                <>
                  <p className="text-gray-500">
                    Order Date : {formatDate(orderDetailsData?.createdAt)}
                  </p>
                  <p className="text-gray-500">
                    Order Time : {getTime(orderDetailsData?.createdAt)}
                  </p>
                  <p className="text-red-500">
                    Delivery Date : {addDays(orderDetailsData?.createdAt, 4)}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-500">Order Date : N/A</p>
                  <p className="text-gray-500">Order Time : N/A</p>\
                  <p className="text-red-500">Delivery Date : N/A</p>
                </>
              )}
            </div>
            <div className="stateBorder mb-6 mt-4 pb-3">
              <p className="primaryTextColor text-2xl font-extrabold mb-2">
                Client{" "}
              </p>
              <div className="flex justify-between">
                <p>Client Name: {orderDetailsData?.userId?.name}</p>
                <p>Payment Amount: ₹{orderDetailsData?.paidAmount}</p>
                <p>
                  Client Mobile No. : +{orderDetailsData?.userId?.mobilenumber}
                </p>
              </div>
            </div>

            <div>
              <div className="flex justify-between border-b-2 pb-2">
                <div className="w-1/3">
                  <div className="flex justify-between">
                    <p className="primaryTextColor text-2xl font-extrabold">
                      Bride Info
                    </p>
                    <TbEdit
                      className="cursor-pointer ml-1 primaryTextColor"
                      onClick={() => setBrideEditMode(!brideEditMode)}
                    />
                  </div>

                  {brideEditMode ? (
                    <form onSubmit={handleBrideChange}>
                      <div className="flex mb-2">
                        <label>Name : </label>
                        <input {...register("brideName")} className=" border" />
                      </div>
                      <div className="flex mb-2">
                        <label>Mother Name : </label>
                        <input
                          {...register("brideMotherName")}
                          className=" border ml-2 "
                        />
                      </div>
                      <div className="flex mb-2">
                        <label>Father Name : </label>
                        <input
                          {...register("brideFatherName")}
                          className=" border ml-2 "
                        />
                      </div>
                      <div className="flex mb-2">
                        <label>Grand Mother Name : </label>
                        <input
                          {...register("brideGrandMotherName")}
                          className="border ml-2 "
                        />
                      </div>
                      <div className="flex mb-2">
                        <label>Grand Father Name : </label>
                        <input
                          {...register("brideGrandFatherName")}
                          className="border ml-2"
                        />
                      </div>

                      <div className="text-right">
                        <button
                          type="submit"
                          className="border px-2 py-1 rounded"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p>
                        Name :{" "}
                        {orderDetailsData?.formDataId?.brideData?.brideName}
                      </p>
                      <p>
                        Mother Name :{" "}
                        {
                          orderDetailsData?.formDataId?.brideData
                            ?.brideMotherName
                        }
                      </p>
                      <p>
                        Father Name :{" "}
                        {
                          orderDetailsData?.formDataId?.brideData
                            ?.brideFatherName
                        }
                      </p>
                      <p>
                        Grand Mother Name :{" "}
                        {
                          orderDetailsData?.formDataId?.brideData
                            ?.brideGrandMotherName
                        }
                      </p>
                      <p>
                        Grand Father Name :{" "}
                        {
                          orderDetailsData?.formDataId?.brideData
                            ?.brideGrandFatherName
                        }
                      </p>
                    </>
                  )}
                </div>
                <div className="w-1/3">
                  <div className="flex justify-between">
                    <p className="primaryTextColor text-2xl font-extrabold">
                      Groom Info
                    </p>
                    <TbEdit
                      className="cursor-pointer ml-1 primaryTextColor"
                      onClick={() => setGroomEditMode(!groomEditMode)}
                    />
                  </div>
                  {groomEditMode ? (
                    <form onSubmit={handleGroomChange}>
                      <div className="flex mb-2">
                        <label>Name : </label>
                        <input {...register("groomName")} className=" border" />
                      </div>
                      <div className="flex mb-2">
                        <label>Mother Name : </label>
                        <input
                          {...register("groomMotherName")}
                          className=" border ml-2 "
                        />
                      </div>
                      <div className="flex mb-2">
                        <label>Father Name : </label>
                        <input
                          {...register("groomFatherName")}
                          className=" border ml-2 "
                        />
                      </div>
                      <div className="flex mb-2">
                        <label>Grand Mother Name : </label>
                        <input
                          {...register("groomGrandMotherName")}
                          className="border ml-2 "
                        />
                      </div>
                      <div className="flex mb-2">
                        <label>Grand Father Name : </label>
                        <input
                          {...register("groomGrandFatherName")}
                          className="border ml-2"
                        />
                      </div>

                      <div className="text-right">
                        <button
                          type="submit"
                          className="border px-2 py-1 rounded"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p>
                        Name :{" "}
                        {orderDetailsData?.formDataId?.groomData?.groomName}
                      </p>
                      <p>
                        Mother Name :{" "}
                        {
                          orderDetailsData?.formDataId?.groomData
                            ?.groomMotherName
                        }
                      </p>
                      <p>
                        Father Name :{" "}
                        {
                          orderDetailsData?.formDataId?.groomData
                            ?.groomFatherName
                        }
                      </p>
                      <p>
                        Grand Mother Name :{" "}
                        {
                          orderDetailsData?.formDataId?.groomData
                            ?.groomGrandMotherName
                        }
                      </p>
                      <p>
                        Grand Father Name :{" "}
                        {
                          orderDetailsData?.formDataId?.groomData
                            ?.groomGrandFatherName
                        }
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="border-b-2 pb-2">
                <p className="primaryTextColor text-2xl font-extrabold">
                  Events
                </p>

                <div className="grid grid-cols-3 gap-4">
                  {events.map((event, index: number) => (
                    <div
                      className="my-4  border p-4 mr-4 rounded:md shadow"
                      key={index}
                    >
                      <div className="flex justify-end ">
                        {editClose === index ? (
                          <AiOutlineCloseCircle
                            className="cursor-pointer ml-1 primaryTextColor"
                            onClick={() => {
                              setEditClose(null);
                              setEventEditMode(null);
                            }}
                          />
                        ) : (
                          <>
                            {addEventAction !== index && (
                              <TbEdit
                                className="cursor-pointer ml-1 primaryTextColor"
                                onClick={() => {
                                  setEventEditMode(index);
                                  setEditClose(index);
                                  handleValueSet(index);
                                }}
                              />
                            )}
                          </>
                        )}
                      </div>

                      {eventEditMode === index ? (
                        <>
                          <form onSubmit={handleEventChange}>
                            <div className="mb-2">
                              <label>Title : </label>
                              <input
                                {...register("title", { required: true })}
                                className=" border"
                              />
                              {errors.title && (
                                <span className="text-red-500 block">
                                  *This field is required
                                </span>
                              )}
                            </div>
                            <div className="mb-2">
                              <label>Venue : </label>
                              <input
                                {...register("venue", { required: true })}
                                className=" border"
                              />
                              {errors.venue && (
                                <span className="text-red-500 block">
                                  *This field is required
                                </span>
                              )}
                            </div>
                            <div className="mb-2">
                              <label>Time : </label>
                              <input
                                {...register("time", { required: true })}
                                type="time"
                                className=" border"
                              />
                              {errors.time && (
                                <span className="text-red-500 block">
                                  *This field is required
                                </span>
                              )}
                            </div>
                            <div className="mb-2">
                              <label>Date : </label>
                              <input
                                {...register("date", { required: true })}
                                type="date"
                                className=" border"
                              />
                              {errors.date && (
                                <span className="text-red-500 block">
                                  *This field is required
                                </span>
                              )}
                            </div>
                            <div className="text-right">
                              <RiDeleteBin5Line
                                className="cursor-pointer inline mr-2"
                                onClick={() => handleEventDelete(index)}
                              />
                              <button
                                type="submit"
                                className="border px-4 py-1 rounded shadow"
                              >
                                Save Change
                              </button>
                            </div>
                          </form>
                        </>
                      ) : (
                        <>
                          <p className="text-normal">
                            Title: {event.title || ""}
                          </p>
                          <p>Venue : {event.venue || ""}</p>
                          <p>Time: {event.time || ""}</p>
                          <p>Date : {event.date || ""}</p>
                        </>
                      )}
                    </div>
                  ))}
                  <div
                    className="flex w-44 h-14  mt-4 rounded border justify-center items-center py-1 primaryColor cursor-pointer"
                    onClick={addEvent}
                  >
                    <p className="text-xl font-normal text-white">Add Event</p>
                    <div className="border rounded-full w-6 h-6  flex justify-center items-center ml-7 bg-white primaryTextColor">
                      +
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b-2 pb-2">
                <p className="primaryTextColor text-2xl font-extrabold">
                  Links for Photographs
                </p>
                <div className="mt-4 primaryTextColor flex">
                  <p className="text-xl font-extrabold mb-4 mr-10">
                    Upload Photos
                  </p>
                  <Switch
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    className="primaryColor"
                    onChange={() => setAddImage(!addImage)}
                  />
                </div>
                {addImage && (
                  <ImageUploader setImages={setImages} parentName="editOrder" />
                )}
                {/* provide the link for photos */}
                <div className="grid grid-cols-3 gap-4">
                  {orderDetailsData?.formDataId?.images.map(
                    (image: string, index: number) => (
                      <div className="relative" key={index}>
                        <RiDeleteBin5Line
                          className="absolute right-20 top-4 bg-gray-300 rounded p-0.5 cursor-pointer"
                          size={24}
                          onClick={() => handleImageDelete(index)}
                        />
                        <img
                          src={image}
                          alt="Description of Image"
                          width={300}
                          height={500}
                          className="rounded-md"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="border-b-2 pb-2 mt-4">
                <div className="flex items-center">
                  <p className="primaryTextColor text-2xl font-extrabold">
                    Special Notes
                  </p>
                  <TbEdit
                    className="cursor-pointer ml-4 primaryTextColor"
                    onClick={() => {
                      setSpecialNotesEdit(!specialNotesEdit);
                    }}
                  />
                </div>

                {specialNotesEdit ? (
                  <form onSubmit={handleSpecialNotesChange}>
                    <textarea
                      {...register("specialNotes")}
                      rows={4}
                      className="border-2 p-2 rounded-md text-xl  mb-2  mt-4 shadow  w-full "
                      placeholder="Please let us know if you have any specific requirements beyond the options provided above"
                    />
                    <button
                      type="submit"
                      className="border px-4 py-1 rounded shadow"
                    >
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <p>{orderDetailsData?.formDataId?.specialNotes}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </Modal>
  );
};

export default OrderDetailsModal;
