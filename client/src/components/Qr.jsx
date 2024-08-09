import QRCode from "react-qr-code";
import React, { useState } from "react";
import { MdOutlineQrCodeScanner } from "react-icons/md";
export default function QR({ value, imageSrc }) {
  const qrCodeRef = React.useRef(null);
  const [showQr, setShowQr] = useState(false);
  const toggleShow = async () => {
    setShowQr(!showQr);
  };

  React.useEffect(() => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current.querySelector("canvas");
      if (canvas) {
        const context = canvas.getContext("2d");
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
          const size = canvas.width;
          const imgSize = size / 5; // Adjust size of the center image
          const x = (size - imgSize) / 2;
          const y = (size - imgSize) / 2;
          context.drawImage(image, x, y, imgSize, imgSize);
        };
      }
    }
  }, [imageSrc, value]);

  return (
    <div className="">
      <div onClick={toggleShow} className="cursor-pointer">
        {showQr ? (
          <div className="flex gap-2 font-semibold items-center justify-center">
            <p className="text-red-500">Hide Qr</p>
            <MdOutlineQrCodeScanner className="text-red-500 w-10 h-10 object-cover" />
          </div>
        ) : (
          <div className="flex gap-2 font-semibold items-center justify-center">
            <p className="text-teal-600">Show Qr</p>
            <MdOutlineQrCodeScanner className="text-teal-600 w-10 h-10 object-cover" />
          </div>
        )}
      </div>

      <div
        className={`relative flex items-center justify-center bg-white p-4 rounded-lg shadow-md mt-4 w-max mx-auto ${
          showQr ? "" : "hidden"
        }`}
      >
        <QRCode
          value={value}
          size={256}
          bgColor="#f7f7f7"
          fgColor="#1a202c"
          level="Q"
          ref={qrCodeRef}
        />
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Center Image"
            className="absolute w-20 h-20 object-cover rounded-full"
          />
        )}
      </div>
    </div>
  );
}
