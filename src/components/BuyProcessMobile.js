import React from "react";
import { Progress } from "antd";

function BuyProcessMobile({ page }) {
  const pageContent = [
    "Details of People",
    "Details of Events",
    "Add Photos",
    "Payments",
  ];
  const completionPercentage = (page * 100) / 4;
  return (
    <div className="md:hidden bg-gray-200 h-50 relative  flex justify-between items-center px-4 py-5 ">
      <Progress
        type="circle"
        percent={completionPercentage}
        strokeColor={{
          "0%": "#52c41a",
          "100%": "#52c41a",
        }}
        format={() => `${page} of 4`}
        size={80}
      />
      <div>
        <p className="primaryTextColor text-xl">{pageContent[page - 1]}</p>
        {page < 4 && (
          <p className="text-base font-light secondaryTextColor">
            Next: {pageContent[page]}{" "}
          </p>
        )}
      </div>
    </div>
  );
}

export default BuyProcessMobile;
