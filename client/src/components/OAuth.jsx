import { FcGoogle } from "react-icons/fc";

export default function OAuth() {
  return (
    <div className="flex items-center justify-center gap-3 border p-3 mt-5 border-slate-300 rounded-md shadow-lg hover:bg-gray-100 transition duration-200 ease-in-out cursor-pointer">
      <FcGoogle size={24} />
    </div>
  );
}
