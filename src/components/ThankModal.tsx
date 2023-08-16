import { counterStates, setThankModal } from "@/redux/counterReducer";
import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImCheckboxChecked } from "react-icons/im";

function ThankModal() {
  const dispatch = useDispatch();
  const { thankModal } = useSelector(counterStates);

  return (
    <Modal
      open={thankModal}
      footer={null}
      onCancel={() => dispatch(setThankModal(false))}
    >
      <div className="flex justify-center">
        <ImCheckboxChecked
          style={{ width: "120px", height: "120px" }}
          color="rgb(77 124 15)"
        />
      </div>

      <p className="text-3xl text-center mt-10">THANK YOU !</p>
      <p className="text-center mb-10 mt-2 text-xl font-bold text-lime-700">
        Payment done Successfully
      </p>
      <p className="text-center">
        You will be redirect to <b>order page</b> shortly
      </p>
      <p className="text-center mt-6"> Please wait ... </p>
    </Modal>
  );
}

export default ThankModal;
