import React, { useEffect, useState } from "react";

function Footer() {
  const [triangleCount, setTriangleCount] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setTriangleCount(Math.floor(window.innerWidth / 30));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderTriangles = () => {
    const triangles = [];

    for (let i = 0; i < triangleCount; i++) {
      triangles.push(<div key={i} className="footerTriangle"></div>);
    }

    return triangles;
  };
  return (
    <div>
      <div className="flex mt-12 mb-4">{renderTriangles()}</div>
      <div className="footerColor h-44 w-full pt-8">
        <div className="flex justify-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M29.3346 16C29.3346 8.63996 23.3613 2.66663 16.0013 2.66663C8.6413 2.66663 2.66797 8.63996 2.66797 16C2.66797 22.4533 7.25464 27.8266 13.3346 29.0666V20H10.668V16H13.3346V12.6666C13.3346 10.0933 15.428 7.99996 18.0013 7.99996H21.3346V12H18.668C17.9346 12 17.3346 12.6 17.3346 13.3333V16H21.3346V20H17.3346V29.2666C24.068 28.6 29.3346 22.92 29.3346 16Z"
              fill="#BAADAD"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="mx-8"
          >
            <path
              d="M17.3708 2.66802C18.3438 2.66429 19.3167 2.67407 20.2895 2.69736L20.5481 2.70669C20.8468 2.71736 21.1415 2.73069 21.4975 2.74669C22.9161 2.81336 23.8841 3.03736 24.7335 3.36669C25.6135 3.70536 26.3548 4.16402 27.0961 4.90536C27.774 5.5715 28.2986 6.37728 28.6335 7.26669C28.9628 8.11602 29.1868 9.08535 29.2535 10.504C29.2695 10.8587 29.2828 11.1547 29.2935 11.4534L29.3015 11.712C29.3251 12.6843 29.3354 13.6568 29.3321 14.6294L29.3335 15.624V17.3707C29.3367 18.3437 29.3265 19.3167 29.3028 20.2894L29.2948 20.548C29.2841 20.8467 29.2708 21.1414 29.2548 21.4974C29.1881 22.916 28.9615 23.884 28.6335 24.7334C28.2997 25.6237 27.7749 26.4302 27.0961 27.096C26.4294 27.7738 25.6232 28.2984 24.7335 28.6334C23.8841 28.9627 22.9161 29.1867 21.4975 29.2534C21.1415 29.2694 20.8468 29.2827 20.5481 29.2934L20.2895 29.3014C19.3168 29.3251 18.3438 29.3353 17.3708 29.332L16.3761 29.3334H14.6308C13.6578 29.3366 12.6848 29.3264 11.7121 29.3027L11.4535 29.2947C11.1369 29.2832 10.8205 29.2699 10.5041 29.2547C9.08545 29.188 8.11745 28.9614 7.26678 28.6334C6.37703 28.2991 5.5711 27.7745 4.90545 27.096C4.22685 26.4297 3.70175 25.6234 3.36679 24.7334C3.03745 23.884 2.81345 22.916 2.74678 21.4974C2.73194 21.181 2.7186 20.8645 2.70678 20.548L2.70012 20.2894C2.67554 19.3167 2.66442 18.3437 2.66678 17.3707V14.6294C2.66306 13.6568 2.67284 12.6843 2.69612 11.712L2.70545 11.4534C2.71612 11.1547 2.72945 10.8587 2.74545 10.504C2.81212 9.08402 3.03612 8.11736 3.36545 7.26669C3.70062 6.37685 4.22674 5.57128 4.90679 4.90669C5.57198 4.22769 6.3774 3.70212 7.26678 3.36669C8.11745 3.03736 9.08412 2.81336 10.5041 2.74669L11.4535 2.70669L11.7121 2.70002C12.6844 2.67545 13.6569 2.66434 14.6295 2.66669L17.3708 2.66802ZM16.0001 9.33469C15.1168 9.3222 14.2398 9.48539 13.4201 9.81478C12.6004 10.1442 11.8543 10.6332 11.2252 11.2534C10.5962 11.8737 10.0967 12.6127 9.7557 13.4277C9.41475 14.2427 9.23917 15.1173 9.23917 16.0007C9.23917 16.8841 9.41475 17.7587 9.7557 18.5737C10.0967 19.3886 10.5962 20.1277 11.2252 20.7479C11.8543 21.3682 12.6004 21.8572 13.4201 22.1866C14.2398 22.516 15.1168 22.6792 16.0001 22.6667C17.7682 22.6667 19.4639 21.9643 20.7142 20.7141C21.9644 19.4638 22.6668 17.7681 22.6668 16C22.6668 14.2319 21.9644 12.5362 20.7142 11.286C19.4639 10.0357 17.7682 9.33469 16.0001 9.33469ZM16.0001 12.0014C16.5315 11.9916 17.0594 12.0878 17.5532 12.2843C18.0469 12.4808 18.4966 12.7738 18.8758 13.1461C19.2551 13.5184 19.5564 13.9625 19.762 14.4525C19.9677 14.9425 20.0737 15.4686 20.0738 16C20.0739 16.5314 19.9681 17.0576 19.7626 17.5476C19.557 18.0377 19.2559 18.4819 18.8768 18.8543C18.4976 19.2267 18.0481 19.5198 17.5544 19.7166C17.0607 19.9133 16.5328 20.0096 16.0015 20C14.9406 20 13.9232 19.5786 13.173 18.8284C12.4229 18.0783 12.0015 17.0609 12.0015 16C12.0015 14.9392 12.4229 13.9217 13.173 13.1716C13.9232 12.4214 14.9406 12 16.0015 12L16.0001 12.0014ZM23.0001 7.33469C22.57 7.3519 22.1632 7.53489 21.8649 7.84532C21.5667 8.15575 21.4001 8.56953 21.4001 9.00002C21.4001 9.43051 21.5667 9.8443 21.8649 10.1547C22.1632 10.4652 22.57 10.6481 23.0001 10.6654C23.4421 10.6654 23.8661 10.4898 24.1786 10.1772C24.4912 9.86464 24.6668 9.44072 24.6668 8.99869C24.6668 8.55666 24.4912 8.13274 24.1786 7.82018C23.8661 7.50762 23.4421 7.33202 23.0001 7.33202V7.33469Z"
              fill="#BAADAD"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M29.948 8.00004C28.9214 8.46671 27.8147 8.77337 26.668 8.92004C27.8414 8.21337 28.748 7.09337 29.1747 5.74671C28.068 6.41337 26.8414 6.88004 25.548 7.14671C24.4947 6.00004 23.0147 5.33337 21.3347 5.33337C18.2014 5.33337 15.6414 7.89337 15.6414 11.0534C15.6414 11.5067 15.6947 11.9467 15.788 12.36C11.0414 12.12 6.81469 9.84004 4.00135 6.38671C3.50802 7.22671 3.22802 8.21337 3.22802 9.25337C3.22802 11.24 4.22802 13 5.77469 14C4.82802 14 3.94802 13.7334 3.17469 13.3334V13.3734C3.17469 16.1467 5.14802 18.4667 7.76135 18.9867C6.92232 19.2163 6.04148 19.2483 5.18802 19.08C5.55016 20.2167 6.2594 21.2113 7.21604 21.9239C8.17268 22.6366 9.32862 23.0316 10.5214 23.0534C8.49953 24.654 5.99335 25.5191 3.41469 25.5067C2.96135 25.5067 2.50802 25.48 2.05469 25.4267C4.58802 27.0534 7.60135 28 10.828 28C21.3347 28 27.108 19.28 27.108 11.72C27.108 11.4667 27.108 11.2267 27.0947 10.9734C28.2147 10.1734 29.1747 9.16004 29.948 8.00004Z"
              fill="#BAADAD"
            />
          </svg>
        </div>
        <p className="footerTextColor text-center my-2 text-sm">
          Privacy Policy | Terms and Conditions
        </p>
        <p className="footerTextColor text-center mt-8 text-xs font-extralight">
          @2023 Nyota
        </p>
      </div>
    </div>
  );
}

export default Footer;
