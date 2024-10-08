import QRCode from "react-qr-code";
import React, { useRef } from "react";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { PiShareFat } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function QR({ value, imageSrc, toggleShow, showQr }) {
  const qrCodeRef = useRef(null);

  const copyToClipboard = async () => {
    try {
      const svg = qrCodeRef.current.querySelector("svg");
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.src = url;
      
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

        URL.revokeObjectURL(url);

        const pngDataUrl = canvas.toDataURL("image/png");
        const pngBlob = await fetch(pngDataUrl).then((res) => res.blob());

        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": pngBlob }),
        ]);

        toast.success("QR code copied to clipboard!");
      };
    } catch (error) {
      console.error("Failed to copy QR code to clipboard:", error);
      toast.error("Failed to copy QR code to clipboard.");
    }
  };

  const downloadQR = () => {
    const svg = qrCodeRef.current.querySelector("svg");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "yourQR.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = url;
  };

  return (
    <div className="">
      <div onClick={toggleShow} className="cursor-pointer">
        {showQr ? (
          <div className="flex font-semibold items-center justify-center">
            <p className="text-red-500">Hide Qr</p>
            <MdOutlineQrCodeScanner className="text-red-500 w-10 h-10 object-cover" />
            <PiShareFat
              onClick={copyToClipboard}
              className="w-10 h-10 ml-2 text-green-600 cursor-pointer hover:bg-green-600 hover:text-white rounded-full p-2"
            />
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
        <div ref={qrCodeRef}>
          <QRCode
            id="qr"
            value={value}
            size={256}
            bgColor="#f7f7f7"
            fgColor="#1a202c"
            level="Q"
          />
        </div>

        {imageSrc && (
          <img
            src={imageSrc}
            alt="Center Image"
            className="absolute w-20 h-20 object-cover rounded-full"
          />
        )}
      </div>
      <a onClick={downloadQR} className="cursor-pointer text-teal-600">
        Download QR
      </a>

      <ToastContainer />
    </div>
  );
}
